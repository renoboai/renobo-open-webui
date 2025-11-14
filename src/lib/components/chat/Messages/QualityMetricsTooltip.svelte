<script lang="ts">
	export let metrics: {
		source_relevance?: number;
		answer_completeness?: number;
		citation_accuracy?: number;
		query_understanding?: number;
		context_quality?: number;
		response_coherence?: number;
		factual_consistency?: number;
	} = {};

	export let overallConfidence: number = 0;

	// Define metric display information
	const metricInfo = [
		{
			key: 'source_relevance',
			label: 'Source Relevance',
			description: 'How well documents match your query'
		},
		{
			key: 'answer_completeness',
			label: 'Answer Completeness',
			description: 'Coverage of all query aspects'
		},
		{
			key: 'citation_accuracy',
			label: 'Citation Accuracy',
			description: 'Are claims properly cited?'
		},
		{
			key: 'query_understanding',
			label: 'Query Understanding',
			description: 'How well AI understood the question'
		},
		{
			key: 'context_quality',
			label: 'Context Quality',
			description: 'Quality of retrieved documents'
		},
		{
			key: 'response_coherence',
			label: 'Response Coherence',
			description: 'Structure and clarity of answer'
		},
		{
			key: 'factual_consistency',
			label: 'Factual Consistency',
			description: 'Consistency with source documents'
		}
	];

	// Get color class based on metric value
	function getMetricColor(value: number | undefined): string {
		if (value === undefined) return 'text-gray-400';
		if (value >= 0.8) return 'text-green-600 dark:text-green-400';
		if (value >= 0.6) return 'text-yellow-600 dark:text-yellow-400';
		if (value >= 0.4) return 'text-orange-600 dark:text-orange-400';
		return 'text-red-600 dark:text-red-400';
	}

	// Get progress bar color
	function getBarColor(value: number | undefined): string {
		if (value === undefined) return 'bg-gray-300';
		if (value >= 0.8) return 'bg-green-500';
		if (value >= 0.6) return 'bg-yellow-500';
		if (value >= 0.4) return 'bg-orange-500';
		return 'bg-red-500';
	}

	// Format value as percentage or N/A
	function formatValue(value: number | undefined): string {
		return value !== undefined ? `${(value * 100).toFixed(0)}%` : 'N/A';
	}

	// Get overall confidence tier
	function getConfidenceTier(score: number): string {
		if (score >= 85) return 'Excellent';
		if (score >= 70) return 'Good';
		if (score >= 50) return 'Moderate';
		return 'Low';
	}
</script>

<div class="quality-metrics-tooltip w-80 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
	<!-- Header with Overall Confidence -->
	<div class="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
		<div class="flex items-center justify-between mb-2">
			<h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
				Quality Metrics
			</h3>
			<span class="text-xs text-gray-500 dark:text-gray-400">
				{getConfidenceTier(overallConfidence)}
			</span>
		</div>

		<!-- Overall Confidence Score -->
		<div class="flex items-center gap-3">
			<div class="flex-1">
				<div class="flex justify-between items-center mb-1">
					<span class="text-xs text-gray-600 dark:text-gray-400">Overall Confidence</span>
					<span class="text-sm font-bold {getMetricColor(overallConfidence / 100)}">
						{overallConfidence}%
					</span>
				</div>
				<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
					<div
						class="h-2 rounded-full transition-all {getBarColor(overallConfidence / 100)}"
						style="width: {overallConfidence}%"
					></div>
				</div>
			</div>
		</div>
	</div>

	<!-- Individual Metrics -->
	<div class="space-y-3">
		{#each metricInfo as metric}
			{#if metrics[metric.key] !== undefined}
				<div class="metric-item">
					<div class="flex justify-between items-center mb-1">
						<div class="flex-1">
							<div class="text-xs font-medium text-gray-700 dark:text-gray-300">
								{metric.label}
							</div>
							<div class="text-[10px] text-gray-500 dark:text-gray-400">
								{metric.description}
							</div>
						</div>
						<span class="text-xs font-semibold {getMetricColor(metrics[metric.key])} ml-2">
							{formatValue(metrics[metric.key])}
						</span>
					</div>

					<!-- Progress bar -->
					<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
						<div
							class="h-1.5 rounded-full transition-all {getBarColor(metrics[metric.key])}"
							style="width: {(metrics[metric.key] * 100).toFixed(0)}%"
						></div>
					</div>
				</div>
			{/if}
		{/each}
	</div>

	<!-- Footer Info -->
	<div class="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
		<p class="text-[10px] text-gray-500 dark:text-gray-400 text-center">
			Metrics calculated in real-time based on retrieval quality and response structure
		</p>
	</div>
</div>

<style>
	.quality-metrics-tooltip {
		max-height: 500px;
		overflow-y: auto;
	}

	.metric-item {
		transition: all 0.2s ease;
	}

	.metric-item:hover {
		transform: translateX(2px);
	}

	/* Custom scrollbar */
	.quality-metrics-tooltip::-webkit-scrollbar {
		width: 6px;
	}

	.quality-metrics-tooltip::-webkit-scrollbar-track {
		background: transparent;
	}

	.quality-metrics-tooltip::-webkit-scrollbar-thumb {
		background: rgba(156, 163, 175, 0.5);
		border-radius: 3px;
	}

	.quality-metrics-tooltip::-webkit-scrollbar-thumb:hover {
		background: rgba(156, 163, 175, 0.7);
	}
</style>
