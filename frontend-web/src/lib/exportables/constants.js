export const questTypes = [
    {
        id: 0,
        value: 'goals',
        label: "Goal"
    },
    {
        id: 1,
        value: 'quests',
        label: "Quest"
    },
    {
        id: 2,
        value: 'dailies',
        label: "Daily"
    },
]

export const priorities = [
    {
        id: 0,
        value: 100,
        label: "Critical"
    },
    {
        id: 1,
        value: 80,
        label: "High"
    },
    {
        id: 2,
        value: 50,
        label: "Normal"
    },
    {
        id: 3,
        value: 30,
        label: "Low"
    }
]

export const typeJunctions = [
    {
        id: 0,
        type: 'goals',
        select_query: 'quests(id, name), dailies(id, name)',
        eq_query: 'goal_id',
    },
    {
        id: 1,
        type: 'quests',
        select_query: 'goals(id, name)',
        eq_query: 'quest_id',
    },
    {
        id: 2,
        type: 'dailies',
        select_query: 'goals(id, name)',
        eq_query: 'daily_id',
    },
]

export const taskTemplates = {
    quests: {
        name: null,
        priority: 50,
    },
    goals: {
        name: null,
    },
    dailies: {
        name: null,
        priority: 50,
    }
};
