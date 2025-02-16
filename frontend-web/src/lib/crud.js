import { supabase } from "$lib/supabase.js"

export async function createTask(data, table) {
    const { data: newTask, error } = await supabase
        .from(table)
        .insert(data)
        .select()

    if (error) {
        console.error(error)
        return error
    } else {
        console.log("task successfully created")
        return newTask
    }
}

export async function updateTask(data, table) {
    if (!data.id) {
        return alert("No ID provided in update data")
    }

    const { error } = await supabase
        .from(table)
        .update(data)
        .eq('id', data.id)

    if (error) {
        console.error("Task not updated:", error)
        return error
    } else {
        console.log("task successfully updated")
    }
}

export async function deleteTask(data, table) {
    if (!data.id) {
        return alert("No ID provided in update data")
    }

    const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', data.id)

    if (error) {
        console.error('Task not deleted:', error)
        return error
    } else {
        console.log("task successfully deleted")
    }
}

export async function selectLinked(id, typeJunction) {
    const { data, error } = await supabase
        .from('goal_quest')
        .select(typeJunction.select_query)
        .eq(typeJunction.eq_query, id);
    
    if (error) {
        console.error('Supabase error:', error)
        return alert("Error fetching task links:", error)
    } else {
        return data
    }
}

export async function upsertLinked(id, typeJunction) {
    const { error } = await supabase
        .from('goal_quest')
        .insert([{ goal_id: id.goal_id, quest_id: id.quest_id }], { onConflict: ['goal_id', 'quest_id'] })

    if (error) {
        console.error("Failed to upsert linked data:", error)
        return error
    } else {
        console.log("task link successfully upserted")
    }
}