"""
OpenWebUI Pipeline: Auto-Parse EPC Files

This pipeline automatically:
1. Detects when a PDF file is uploaded
2. Sends it to the Renobo EPC parsing service
3. Injects structured EPC data into the chat request
4. Enables the full BV²-lite calculation pipeline

Installation:
1. Copy this file to OpenWebUI's pipelines directory
2. OpenWebUI will automatically load it on startup
3. Upload EPC PDFs in chat and they'll be automatically parsed!
"""

from typing import List, Union, Generator, Iterator
from pydantic import BaseModel
import requests
import os


class Pipeline:
    class Valves(BaseModel):
        epc_service_url: str = "http://renobo-api-gateway:8000"
        enabled: bool = True

    def __init__(self):
        self.name = "Renobo EPC Auto-Parser"
        self.valves = self.Valves()
        pass

    async def on_startup(self):
        print(f"🏗️  Renobo EPC Auto-Parser Pipeline loaded!")
        print(f"   EPC Service: {self.valves.epc_service_url}")
        pass

    async def on_shutdown(self):
        pass

    def pipe(
        self, user_message: str, model_id: str, messages: List[dict], body: dict
    ) -> Union[str, Generator, Iterator]:
        """
        Main pipeline function that intercepts chat requests.

        This function:
        1. Checks if files are attached to the message
        2. If PDF files exist, sends them to EPC parser
        3. Injects structured EPC data into the request
        4. Forwards to the backend with enriched context
        """

        if not self.valves.enabled:
            return body

        print(f"🔍 EPC Pipeline: Inspecting message...")

        # Check for attached files in the message
        epc_data = None
        files = body.get("files", [])

        if files:
            print(f"   Found {len(files)} attached file(s)")

            # Look for PDF files that might be EPC certificates
            for file_item in files:
                file_id = file_item.get("id")
                file_name = file_item.get("name", "")

                # Check if it's a PDF and might be an EPC
                if file_name.lower().endswith('.pdf'):
                    print(f"   📄 PDF detected: {file_name}")

                    # Try to parse it as EPC
                    try:
                        epc_data = self._parse_epc_file(file_id, file_name)

                        if epc_data:
                            print(f"   ✅ EPC parsed successfully!")
                            print(f"      Building: {epc_data.get('building_info', {}).get('building_type', 'Unknown')}")
                            print(f"      Year: {epc_data.get('building_info', {}).get('construction_year', 'Unknown')}")
                            print(f"      Energy Class: {epc_data.get('energy_performance', {}).get('energy_class', 'Unknown')}")
                            break
                    except Exception as e:
                        print(f"   ⚠️  Could not parse as EPC: {e}")
                        continue

        # If we found EPC data, inject it into the request
        if epc_data:
            # Add EPC data to the body for the backend
            body["epc_data"] = epc_data

            # Enhance the user message with building context
            building_info = epc_data.get('building_info', {})
            energy_perf = epc_data.get('energy_performance', {})
            tech_systems = epc_data.get('technical_systems', {})

            context_message = f"""
**[EPC Data Detected - Structured Analysis Enabled]**

Building: {building_info.get('building_type', 'Unknown')} from {building_info.get('construction_year', 'N/A')}
Address: {building_info.get('address', 'N/A')}
Heated Area: {building_info.get('heated_area', 'N/A')} m²
Energy Class: {energy_perf.get('energy_class', 'N/A')}
Primary Energy: {energy_perf.get('primary_energy_number', 'N/A')} kWh/m²/year

Systems:
- Heating: {tech_systems.get('heating_type', 'N/A')}
- Ventilation: {tech_systems.get('ventilation_type', 'N/A')}
- Hot Water: {tech_systems.get('hot_water_type', 'N/A')}

---

{user_message}
"""

            # Update the last user message with enriched context
            for message in reversed(messages):
                if message.get("role") == "user":
                    message["content"] = context_message
                    break

            body["messages"] = messages

            print(f"   🚀 EPC data injected into request!")
            print(f"   ✨ BV²-lite + Archetype + Scenario pipeline will activate")
        else:
            print(f"   ℹ️  No EPC data found - using standard RAG mode")

        return body

    def _parse_epc_file(self, file_id: str, file_name: str) -> dict:
        """
        Parse an uploaded PDF file as an EPC certificate.

        This function:
        1. Retrieves the file content from OpenWebUI storage
        2. Sends it to the Renobo EPC parsing service
        3. Returns structured EPC data
        """

        try:
            # Get file content from OpenWebUI's file storage
            # Note: This assumes files are accessible via the OpenWebUI API
            # You may need to adjust based on your OpenWebUI setup

            file_url = f"/api/v1/files/{file_id}/content"

            # For local filesystem access (alternative approach)
            # file_path = f"/app/backend/data/uploads/{file_id}"

            # Send to EPC parser
            parse_url = f"{self.valves.epc_service_url}/api/v1/epc/parse"

            # Read file from OpenWebUI storage
            import httpx

            # Get the file content
            # This might need adjustment based on how files are stored
            with open(f"/app/backend/data/uploads/{file_id}", "rb") as f:
                files = {"file": (file_name, f, "application/pdf")}

                response = requests.post(
                    parse_url,
                    files=files,
                    timeout=30
                )

                if response.status_code == 200:
                    return response.json()
                else:
                    print(f"   ❌ EPC parsing failed: {response.status_code}")
                    print(f"      {response.text}")
                    return None

        except Exception as e:
            print(f"   ❌ Error parsing EPC: {e}")
            return None
