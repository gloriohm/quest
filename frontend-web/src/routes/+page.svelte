<script>
    import {sideQuestStore} from '$lib/stores/questStore.js';
    import * as crud from '$lib/crud.js';
    
    let newSideQuest = $state(
        {
            name: null
        }
    );
    sideQuestStore.subscribe((value) => {
        console.log("value", value)
    })
    $effect(() => {
        console.log($sideQuestStore)
    })
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#if $sideQuestStore}
    {#each $sideQuestStore as quest, index}
        <p>{index +1} - {quest.name}</p>
    {/each}
{:else}
    <p>No quests</p>
{/if}

<h2 class="text-xl">Create Side Quest:</h2>
<form>
    <input type="text" bind:value={newSideQuest.name} class="form-input rounded-sm px-2 py-1" />
    <button onclick={() => crud.createSideQuest(newSideQuest)}>Create!</button>
</form>