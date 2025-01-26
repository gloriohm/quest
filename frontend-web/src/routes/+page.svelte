<script>
    import * as crud from '$lib/crud.js';
    import * as style from '$lib/styles.js'
    import { questTypes } from '$lib/exportables/constants.js'
    const { data } = $props();
    let tasks = $state({quests: data.quests, dailies: data.dailies, goals: data.goals})

    let newSideQuest = $state({
        name: null
    });
    let selectedTask = $state('');
    let createCardOpen;
    let questSelected;
    let deleteCard;

    
    let selectedQuestType = $state(questTypes[1].key)

    $effect(() => {
        console.log($state.snapshot(selectedQuestType))
    })

    function openQuest(task) {
        selectedTask = task
        questSelected.showModal()
    }

    function openDelete(task, key) {
        selectedTask = task
        selectedQuestType = key
        deleteCard.showModal()
    }

    function closeQuest() {
        selectedQuest = ''
    }

    async function handleCreateTask() {
        const updateData = $state.snapshot(newSideQuest)
        const updatedType = $state.snapshot(selectedQuestType)
        const newTask = await crud.createTask(updateData, updatedType);
        if (newTask) {
            tasks[updatedType].push(newTask[0]);
        }
        newSideQuest.name = null;
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
</script>

<article class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-400 p-4 border border-black max-w-sm min-h-80">
    {#each questTypes as { key, label } }
        <h2>{label}:</h2>
        {#if tasks[key]?.length}
            {#each tasks[key] as task, index}
            <div class="flex justify-between">
                <p>
                    <button onclick={() => openQuest(task)}>
                        {index + 1} - {task.name}
                    </button>
                </p>
                <span>
                    <button onclick={() => markTaskAsComplete(task, key, index)} class="{style.btnPrimary}">Complete</button>
                    <button onclick={() => openDelete(task, key)} class="{style.btnSecondary}">Delete</button>
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
                <option value={type.key}>{type.label}</option>
            {/each}
        </select>
        <input type="text" bind:value={newSideQuest.name} class="form-input rounded-sm px-2 py-1" />
        <span>
            <button class="{style.btnSecondary}" onclick={() => createCardOpen.close()}>Cancel</button>
            <button class="{style.btnPrimary}" onclick={() => handleCreateTask()}>Create!</button>
        </span>
    </form>
</dialog>

<dialog bind:this={questSelected} class="modal bg-emerald-400 px-4 py-2">
    <h2>{selectedTask.name}</h2>
    <p>Various info about the quest, like its ID, which is {selectedTask.id}</p>
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

