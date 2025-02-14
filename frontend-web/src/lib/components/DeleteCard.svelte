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
        const deleteData = selectedTask.task
        const table = selectedTask.value
        const deleteSuccess = await crud.deleteTask(deleteData, table);
        if (deleteSuccess) {
            taskStore.update(tasks => {
                // Remove the task immutably by creating a new array
                return {
                    ...tasks,
                    [table]: tasks[table].filter((_, i) => i !== selectedTask.index)
                };
            });
            console.log("delete success:", deleteSuccess)
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
