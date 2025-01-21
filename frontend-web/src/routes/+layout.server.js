import { supabase } from "$lib/supabase.js"
import { sideQuestStore } from "$lib/stores/questStore";

export async function load() {
    const {data: sideQuests, error} = await supabase
        .from("side_quests")
        .select("*")

    if (error) {
        console.log(error)
    }
    sideQuestStore.set(sideQuests);
    console.log("hello", sideQuestStore)
}