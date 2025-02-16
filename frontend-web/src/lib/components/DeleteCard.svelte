<script>
    import * as crud from '$lib/crud.js';
    import * as style from '$lib/styles.js';
    import { taskStore } from '$lib/stores/questStore.js';
    let { selectedTask } = $props()
    let deleteCardState;

    function openDelete() {
        deleteCardState.showModal()
    }

    async function handleDeleteTask(selectedTask) {
        const backupState = $taskStore;
        const deleteData = selectedTask.task
        const table = selectedTask.value
        taskStore.update(tasks => {
            // Remove the task immutably by creating a new array
            return {
                ...tasks,
                [table]: tasks[table].filter(t => t.id !== selectedTask.task.id)
            };
        });
        const deleteError = await crud.deleteTask(deleteData, table);
        if (deleteError) {
            console.log("function returned error:", deleteError)
            taskStore.set(backupState);
        }
        deleteCardState.close()
    }

</script>

<button onclick={() => openDelete()} class="{style.btnSecondary}">Delete</button>
<dialog bind:this={deleteCardState} class="modal bg-emerald-400 px-4 py-2">
    <h2>{selectedTask.name}</h2>
    <p>Are you sure you want to delete this task? The action is irreversable</p>
    <form>
        <span>
            <button class="{style.btnSecondary}" onclick={() => deleteCardState.close()}>Cancel</button>
            <button class="{style.btnPrimary}" onclick={() => handleDeleteTask(selectedTask)}>DELETE</button>
        </span>
    </form>
</dialog>
