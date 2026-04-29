import { supabase } from '@/lib/supabase'

export async function GET() {
    //intentar conectar a la base de datos y obtener los juegos
    const { data, error } = await supabase
    .from('game')
    .select('*')

    if (error) {
        return Response.json({
            connected: false,
            error: error.message
        }, { status: 500 })
    }

    return Response.json({
        connected: true,
        message: 'conectado a la base de datos soulspedia',
        game: data
    })
}