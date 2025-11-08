<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const i18n = getContext('i18n');

	import { WEBUI_VERSION } from '$lib/constants';
	import XMark from '../icons/XMark.svelte';

	export let version = {
		current: WEBUI_VERSION,
		latest: WEBUI_VERSION
	};
</script>

<div
	class="flex items-start bg-renobo-green/10 dark:bg-renobo-green/20 border border-renobo-green/30 dark:border-renobo-green/30 text-renobo-green dark:text-renobo-green-light rounded-lg px-3.5 py-3 text-xs max-w-80 pr-2 w-full shadow-lg"
>
	<div class="flex-1 font-medium">
		{$i18n.t(`A new version (v{{LATEST_VERSION}}) is now available.`, {
			LATEST_VERSION: version.latest
		})}

		<a href="https://github.com/open-webui/open-webui/releases" target="_blank" class="underline">
			{$i18n.t('Update for the latest features and improvements.')}</a
		>
	</div>

	<div class=" shrink-0 pr-1">
		<button
			class=" hover:text-renobo-green dark:hover:text-renobo-green-light transition"
			on:click={() => {
				dispatch('close');
			}}
		>
			<XMark />
		</button>
	</div>
</div>
