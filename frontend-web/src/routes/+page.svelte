<script>
    import * as crud from '$lib/crud.js';
    import * as style from '$lib/styles.js';
    import { taskStore } from '$lib/stores/questStore.js';
    import { questTypes, priorities, typeJunctions, taskTemplates } from '$lib/exportables/constants.js';
    import CreateCard from '$lib/components/CreateCard.svelte';
    import DeleteCard from '$lib/components/DeleteCard.svelte';
    import UpdateCard from '$lib/components/UpdateCard.svelte';
    import CompleteButton from '$lib/components/CompleteButton.svelte';

    let selectedTask = $state('');

    $effect(() => {
        console.log($taskStore)
    })

</script>

<article class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-400 p-4 border border-black max-w-sm min-h-80">
    {#each questTypes as { value, label } }
        <h2>{label}:</h2>
        {#if $taskStore[value]?.length}
            {#each $taskStore[value] as task, index}
            <div class="flex justify-between">
                <UpdateCard taskIteration={{task, value, index}}/>
                <span>
                    <CompleteButton selectedTask={{task, value}} />
                    <DeleteCard selectedTask={{task, value}} />
                </span>
            </div>
            {/each}
        {:else}
            <p>No {label}</p>
        {/if}
    {/each}
    <CreateCard />
</article>


