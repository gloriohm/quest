<script>
    import * as crud from '$lib/crud.js';
    import * as style from '$lib/styles.js';
    import { taskStore } from '$lib/stores/questStore.js';
    import { typeJunctions } from '$lib/exportables/constants.js';

    let { taskIteration } = $props();
    const { task, value, index } = taskIteration;

    let count = $state(1)
    let targetGoal = $state('');
    let linkedQuests = $state([]); // Var to hold linked quest(s) -- fetched upon opening update card for x quest
    let updateCardState;

    async function openQuest(task, type) {
        const typeJunction = typeJunctions.find(j => j.type === type);
        linkedQuests = await crud.selectLinked(task.id, typeJunction);
        updateCardState.showModal();
    }

    async function handleLinkTask(goalID, questID) {
        const table = "goal_quest"
        const updateData = { goal_id: goalID, quest_id: questID }
        const linkedTask = await crud.createTask(updateData, table)
        if (linkedTask) {
            const goalMatch = $taskStore.goals.find(g => g.id === linkedTask[0].goal_id);
            if (goalMatch) {
                linkedQuests = [...linkedQuests, { goals: goalMatch }];
            }
        }
    }

    $effect(() => {
        console.log($inspect(linkedQuests))
    })
</script>

<button onclick={() => openQuest(task, value)}>
    {index + 1} - {task.name}
</button>

<dialog bind:this={updateCardState} class="modal bg-emerald-400 px-4 py-2">
    <h2>{task.name}</h2>
    <p>Various info about the quest, like its ID, which is {task.id}</p>
    {#if value !== "goals"}
        <p>Link quest:</p>
        <select bind:value={targetGoal}>
            {#each $taskStore.goals as goal}
                <option value={goal.id}>{goal.name}</option>
            {/each}
        </select>
        <button class="{style.btnPrimary}" onclick={() => handleLinkTask(targetGoal, task.id)}>Link!</button>
    {/if}
    {#if linkedQuests.length}
        <ul>
            {#each linkedQuests as { goals }}
                <li>{goals.name}</li>
            {/each}
        </ul>
    {:else}
        <p>No linked quests</p>
    {/if}
    <form>
        <span>
            <button class="{style.btnSecondary}" onclick={() => updateCardState.close()}>Close</button>
            <button onclick={() => linkedQuests = [...linkedQuests, { goals: linkedTask[0] }]}>Test</button>
        </span>
    </form>
</dialog>