import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    import.meta.env.VITE_SUPA_URL,
    import.meta.env.VITE_SUPA_KEY
);

export const getFromSupabase = async (table) => {

    const { data, error } = await supabase.from(table).select()

    if (error) {
        console.error("Erreur Supabase :", error)
        throw error
    }

    return data

}

export const sendToSupabase = async (table, amendement) => {
    const { data, error } = await supabase
        .from(table)
        .insert(amendement)
        .select()

    if (error) {
        console.error("Erreur Supabase :", error)
        throw error
    }

    return data
}