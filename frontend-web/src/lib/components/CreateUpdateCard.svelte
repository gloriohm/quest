<script>
    import * as crud from '$lib/crud.js';
    import * as style from '$lib/styles.js';
    import { taskStore } from '$lib/stores/questStore.js';
    import { questTypes, priorities, taskTemplates, daysTemplate } from '$lib/exportables/constants.js';
    let newTaskType = $state(questTypes[1].value);
    let linkTarget = $state('');
    const today = new Date().toISOString().split('T')[0];
    let deadlinePlaceholder = $state('');
    $effect(() => {
        console.log($inspect(newTaskVariables.days))
    })

    let newTaskVariables = $state({
        name: null,
        priority: 50,
        deadline: null,
        days: 127,
        before_time: null,
        after_time: null,
        freq_type: null
    });

    let newTaskRelation = $state({
        goal_id: null,
        quest_id: null,
        daily_id: null
    });

    function toggleDay(bit) {
        newTaskVariables.days ^= bit; // Toggle the corresponding bit
    }
</script>

<div>
    <h2>Create a new task!</h2>
    <form class="flex flex-col">
        <select bind:value={newTaskType}>
            {#each questTypes as type}
                <option value={type.value}>{type.label}</option>
            {/each}
        </select>
        <input type="text" bind:value={newTaskVariables.name} class="form-input rounded-sm px-2 py-1" />
        <p>Link task:</p>
        <select bind:value={linkTarget}>
            {#each $taskStore.goals as goal}
                <option value={goal.id}>{goal.name}</option>
            {/each}
        </select>
        {#if newTaskType !== "goals"}
            <select bind:value={newTaskVariables.priority}>
                {#each priorities as priority}
                    <option value={priority.value}>{priority.label}</option>
                {/each}
            </select>
        {/if}
        {#if newTaskType === "quests"}
            <label class="w-full max-w-xs">
                <div>
                    <span>Deadline</span>
                </div>
                <input
                    type="date"
                    class="w-full max-w-xs"
                    min={today}
                    bind:value={deadlinePlaceholder}
                />
            </label>
        {/if}
        {#if newTaskType === "dailies"}
            <div class="overflow-x-auto">
                <table class="gap-1">
                    <thead>
                        <tr>
                            {#each daysTemplate as { name }}
                                <th>{name}</th>
                            {/each}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {#each daysTemplate as { name, bit }}
                                <td class="pointer-events-none">
                                    <input
                                        type="checkbox"
                                        class="pointer-events-auto"
                                        checked={(newTaskVariables.days & bit) !== 0}
                                        onchange={() => toggleDay(bit)}
                                    />
                                </td>
                            {/each}
                        </tr>
                    </tbody>
                </table>
            </div>
            <label class="w-full max-w-xs">
                <div>
                    <span>Only before</span>
                </div>
                <input
                    type="time"
                    class="w-full max-w-xs"
                    bind:value={newTaskVariables.before_time}
                />
            </label>
            <label class="w-full max-w-xs">
                <div>
                    <span>Only after</span>
                </div>
                <input
                    type="time"
                    class="w-full max-w-xs"
                    bind:value={newTaskVariables.after_time}
                />
            </label>
            <label>
                <div>Frequency type:</div>
                <select bind:value={newTaskVariables.freq_type}>
                        <option value=0>None</option>
                        <option value=1>Every x day</option>
                        <option value=2>X days between</option>
                </select>
            </label>
        {/if}
        <span>
            <button class="{style.btnSecondary}" onclick={() => createCardState.close()}>Cancel</button>
            <button class="{style.btnPrimary}" onclick={() => handleCreateTask()}>Create!</button>
        </span>
    </form>
</div>