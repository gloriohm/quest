import {supabase} from "$lib/supabase.js"

export async function createTask(data, table) {
    const { data: responseData, error } = await supabase
        .from(table)
        .insert(data)
        .select()

    if (error) {
        console.log(error)
    } else {
        console.log("success:", responseData)
        return responseData
    }
}

export async function updateTask(data, table) {
    if (!data.id) {
        return alert("No ID provided in update data")
    }
    console.log(data)

    const {data: responseData, error} = await supabase
        .from(table)
        .update(data)
        .eq('id', data.id)
        .select()

    if (error) {
        console.error('Supabase error:', error)
        return alert("Not accepted:", error)
    } else {
        console.log("success:", responseData)
        return responseData
    }
}

export async function deleteTask(data, table) {
    if (!data.id) {
        return alert("No ID provided in update data")
    }
    console.log(data)

    const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', data.id)

    if (error) {
        console.error('Supabase error:', error)
        return alert("Not accepted:", error)
    } else {
        return true
    }
}

export async function selectLinked(id, taskType) {
    const selectQuery = taskType + '(id, name)';
    const equalsQuery = taskType.slice(0, -1) + '_id';
    const { data, error } = await supabase
        .from('goal_quest')
        .select(selectQuery)
        .eq(equalsQuery, id);
    
    console.log(data)
    if (error) {
        console.error('Supabase error:', error)
        return alert(":(", error)
    } else {
        return data
    }
}