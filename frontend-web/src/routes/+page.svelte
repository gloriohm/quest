<script>
    import * as crud from '$lib/crud.js';
    import * as style from '$lib/styles.js';
    import { taskStore } from '$lib/stores/questStore.js';
    import { questTypes, priorities, typeJunctions, taskTemplates } from '$lib/exportables/constants.js';
    import CreateCard from '$lib/components/CreateCard.svelte';
    import DeleteCard from '$lib/components/DeleteCard.svelte';
    const { data } = $props();
    let tasks = $state({quests: data.quests, dailies: data.dailies, goals: data.goals})

    let newSideQuestRelation = $state({
        goal_id: null,
        quest_id: null
    });
    let selectedTask = $state('');
    let targetGoal = $state('');
    let linkedQuests = $state([]);
    let questSelected;
    
    $effect(() => {
        console.log($taskStore)
    })


    async function openQuest(task, type) {
        const typeJunction = typeJunctions.find(j => j.type === type);
        selectedTask = {...task, type: type};
        linkedQuests = await crud.selectLinked(task.id, typeJunction);
        questSelected.showModal();
    }

    function closeQuest() {
        selectedQuest = ''
    }

    async function markTaskAsComplete(task, table, index) {
        const updatedTask = await crud.updateTask({ id: task.id, complete: true }, table);
        if (updatedTask[0]?.complete === true) {
            console.log('Updated task:', updatedTask);
            console.log(index)
            taskStore.update(tasks => {
                // Remove the task immutably by creating a new array
                return {
                    ...tasks,
                    [table]: tasks[table].filter((_, i) => i !== index)
                };
            });
        }
    }



    async function handleLinkTask(goalID, questID) {
        const table = "goal_quest"
        const updateData = { goal_id: goalID, quest_id: questID }
        const linkedTask = await crud.createTask(updateData, table)
        console.log("linked task:", linkedTask[0])
        if (linkedTask) {
            linkedQuests.push({goals: linkedTask[0]})
        }
    }
</script>

<article class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-400 p-4 border border-black max-w-sm min-h-80">
    {#each questTypes as { value, label } }
        <h2>{label}:</h2>
        {#if $taskStore[value]?.length}
            {#each $taskStore[value] as task, index}
            <div class="flex justify-between">
                <p>
                    <button onclick={() => openQuest(task, value)}>
                        {index + 1} - {task.name}
                    </button>
                </p>
                <span>
                    <button onclick={() => markTaskAsComplete(task, value, index)} class="{style.btnPrimary}">Complete</button>
                    <DeleteCard selectedTask={{task, value, index}} />
                </span>
            </div>
            {/each}
        {:else}
            <p>No {label}</p>
        {/if}
    {/each}
    <CreateCard />
</article>

<dialog bind:this={questSelected} class="modal bg-emerald-400 px-4 py-2">
    <h2>{selectedTask.name}</h2>
    <p>Various info about the quest, like its ID, which is {selectedTask.id}</p>
    {#if selectedTask.type !== "goals"}
        <p>Link quest:</p>
        <select bind:value={targetGoal}>
            {#each tasks.goals as goal}
                <option value={goal.id}>{goal.name}</option>
            {/each}
        </select>
        <button onclick={() => handleLinkTask(targetGoal, selectedTask.id)}>Link!</button>
    {/if}
    {#if linkedQuests.length > 0}
        <ul>
            {#each linkedQuests as { goals }}
                <li>{goals.name}</li>
            {/each}
        </ul>
    {/if}
    <form>
        <span>
            <button class="{style.btnSecondary}" onclick={() => questSelected.close()}>Close</button>
        </span>
    </form>
</dialog>
