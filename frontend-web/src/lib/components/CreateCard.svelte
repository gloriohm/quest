<script>
    import * as crud from '$lib/crud.js';
    import * as style from '$lib/styles.js';
    import { taskStore } from '$lib/stores/questStore.js';
    import { questTypes, priorities, taskTemplates } from '$lib/exportables/constants.js';
    let createCardState;
    let selectedQuestType = $state(questTypes[1].value);

    let newTaskVariables = $state({
        name: null,
        priority: 50,
        deadline: null,
        days: 127
    });

    function constructNewTask(selectedQuestType, newTaskVariables) {
        const template = taskTemplates[selectedQuestType] || {};
        return Object.keys(template).reduce((obj, key) => {
            obj[key] = newTaskVariables[key] ?? template[key]; // Use state value if available, otherwise default
            return obj;
        }, {});
    }

    async function handleCreateTask() {
        const snapshot = $state.snapshot(newTaskVariables)
        const updatedType = $state.snapshot(selectedQuestType)
        const updateData = constructNewTask(updatedType, snapshot)
        const newTask = await crud.createTask(updateData, updatedType);
        if (newTask) {
            taskStore.update(tasks => {
                tasks[updatedType].push(newTask[0]);  // Mutate the object
                return { ...tasks };  // Ensure reactivity
            });
        }
        newTaskVariables.name = null;
        createCardState.close();
    }
</script>

<button onclick={() => createCardState.showModal()} class="{style.btnPrimary}">Add Quest:</button>
<dialog bind:this={createCardState} class="modal bg-slate-400 px-4 py-2">
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
            <button class="{style.btnSecondary}" onclick={() => createCardState.close()}>Cancel</button>
            <button class="{style.btnPrimary}" onclick={() => handleCreateTask()}>Create!</button>
        </span>
    </form>
</dialog>