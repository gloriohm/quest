<script>
    import * as style from '$lib/styles.js'
    import { questTypes, priorities } from '$lib/exportables/constants.js'
    let { selectedQuestType = $bindable() } = $props();
</script>

<dialog bind:this={createCardOpen} class="modal bg-slate-400 px-4 py-2">
    <h2>Create a new quest!</h2>
    <form class="flex flex-col">
        <select bind:value={selectedQuestType}>
            {#each questTypes as type}
                <option value={type.value}>{type.label}</option>
            {/each}
        </select>
        <input type="text" bind:value={newSideQuest.name} class="form-input rounded-sm px-2 py-1" />
        <select bind:value={newSideQuest.priority}>
            {#each priorities as priority}
                <option value={priority.value}>{priority.label}</option>
            {/each}
        </select>
        <span>
            <button class="{style.btnSecondary}" onclick={() => createCardOpen.close()}>Cancel</button>
            <button class="{style.btnPrimary}" onclick={() => handleCreateTask()}>Create!</button>
        </span>
    </form>
</dialog>