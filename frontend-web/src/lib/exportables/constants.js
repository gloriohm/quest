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
        deadline: null,
    },
    goals: {
        name: null,
    },
    dailies: {
        name: null,
        priority: 50,
        days: 127
    }
};

export const daysTemplate = [
    { name: 'Mon', bit: 1, value: true },
    { name: 'Tue', bit: 2, value: true },
    { name: 'Wed', bit: 4, value: true },
    { name: 'Thu', bit: 8, value: true },
    { name: 'Fri', bit: 16, value: true },
    { name: 'Sat', bit: 32, value: true },
    { name: 'Sun', bit: 64, value: true },
]