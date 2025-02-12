<script>
    import * as crud from '$lib/crud.js';
    import * as style from '$lib/styles.js';
    import { questTypes, priorities, typeJunctions, taskTemplates } from '$lib/exportables/constants.js';
    import CreateCard from '$lib/components/CreateCard.svelte';
    const { data } = $props();
    let tasks = $state({quests: data.quests, dailies: data.dailies, goals: data.goals})

    let newTaskVariables = $state({
        name: null,
        priority: 50,
        deadline: null,
        days: 127
    });

    let newSideQuestRelation = $state({
        goal_id: null,
        quest_id: null
    });
    let selectedTask = $state('');
    let targetGoal = $state('');
    let linkedQuests = $state([]);
    let createCardOpen;
    let questSelected;
    let deleteCard;
    
    
    
    let selectedQuestType = $state(questTypes[1].value);

    $effect(() => {
        console.log($state.snapshot(linkedQuests))
    })

    function constructTask(selectedQuestType, newTaskVariables) {
        const template = taskTemplates[selectedQuestType] || {};
        return Object.keys(template).reduce((obj, key) => {
            obj[key] = newTaskVariables[key] ?? template[key]; // Use state value if available, otherwise default
            return obj;
        }, {});
    }


    async function openQuest(task, type) {
        const typeJunction = typeJunctions.find(j => j.type === type);
        selectedTask = {...task, type: type};
        linkedQuests = await crud.selectLinked(task.id, typeJunction);
        questSelected.showModal();
    }

    function openDelete(task, value) {
        selectedTask = task
        selectedQuestType = value
        deleteCard.showModal()
    }

    function closeQuest() {
        selectedQuest = ''
    }

    async function handleCreateTask() {
        const snapshot = $state.snapshot(newTaskVariables)
        const updatedType = $state.snapshot(selectedQuestType)
        const updateData = constructTask(updatedType, snapshot)
        const newTask = await crud.createTask(updateData, updatedType);
        if (newTask) {
            tasks[updatedType].push(newTask[0]);
        }
        newTaskVariables.name = null;
        createCardOpen.close();
    }

    async function markTaskAsComplete(task, table, index) {
        const updatedTask = await crud.updateTask({ id: task.id, complete: true }, table);
        if (updatedTask[0]?.complete === true) {
            console.log('Updated task:', updatedTask);
            tasks[table].splice(index, 1)
        }
    }

    async function handleDeleteTask(selectedTask) {
        const deleteData = $state.snapshot(selectedTask)
        const table = $state.snapshot(selectedQuestType)
        const deleteSuccess = await crud.deleteTask(deleteData, table);
        if (deleteSuccess) {
            const keyToRemove = deleteData.id
            const index = tasks[table].findIndex(task => task.id === keyToRemove);
            if (index !== -1) {
                const removedItem = tasks[table].splice(index, 1); // Removes the item
            }
            console.log(deleteSuccess)
        }
        deleteCard.close()
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
        {#if tasks[value]?.length}
            {#each tasks[value] as task, index}
            <div class="flex justify-between">
                <p>
                    <button onclick={() => openQuest(task, value)}>
                        {index + 1} - {task.name}
                    </button>
                </p>
                <span>
                    <button onclick={() => markTaskAsComplete(task, value, index)} class="{style.btnPrimary}">Complete</button>
                    <button onclick={() => openDelete(task, value)} class="{style.btnSecondary}">Delete</button>
                </span>
            </div>
            {/each}
        {:else}
            <p>No {label}</p>
        {/if}
    {/each}
    <button onclick={() => createCardOpen.showModal()} class="{style.btnPrimary}">Add Quest:</button>
</article>

<dialog bind:this={createCardOpen} class="modal bg-slate-400 px-4 py-2">
    <h2>Create a new quest!</h2>
    <form class="flex flex-col">
        <select bind:value={selectedQuestType}>
            {#each questTypes as type}
                <option value={type.value}>{type.label}</option>
            {/each}
        </select>
        <input type="text" bind:value={newTaskVariables.name} class="form-input rounded-sm px-2 py-1" />
        <select bind:value={newTaskVariables.priority}>
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

<dialog bind:this={deleteCard} class="modal bg-emerald-400 px-4 py-2">
    <h2>{selectedTask.name}</h2>
    <p>Are you sure you want to delete this task? The action is irreversable</p>
    <form>
        <span>
            <button class="{style.btnSecondary}" onclick={() => deleteCard.close()}>Cancel</button>
            <button class="{style.btnPrimary}" onclick={() => handleDeleteTask(selectedTask)}>DELETE</button>
        </span>
    </form>
</dialog>

