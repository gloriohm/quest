import {supabase} from "$lib/supabase.js"

export async function createSideQuest(data) {
    const { data: responseData, error } = await supabase
        .from('side_quests')
        .insert(data)
        .select()

    if (error) {
        console.log(error)
    } else {
        console.log("success:", responseData)
        return responseData
    }
}