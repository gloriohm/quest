<script>
    import * as crud from '$lib/crud.js';
    import * as style from '$lib/styles.js';
    import { taskStore } from '$lib/stores/questStore.js';
    let { selectedTask } = $props();
    const { task, value } = selectedTask;

    async function markTaskAsComplete(task, table) {
        const backupState = $taskStore;
        taskStore.update(tasks => {
            // Remove the task immutably by creating a new array
            return {
                ...tasks,
                [table]: tasks[table].filter(t => t.id !== task.id)
            };
        });
        console.log($taskStore)
        const updateError = await crud.updateTask({ id: task.id, complete: true }, table);
        if (updateError) {
            console.log("function returned error:", updateError)
            taskStore.set(backupState);
        }
    }
</script>

<button onclick={() => markTaskAsComplete(task, value)} class="{style.btnPrimary}">Complete</button>
