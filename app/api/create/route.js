import { createClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {
  try {
    const body = await request.json()
    const { itemId, itemName, recipientName, note } = body

    // Generate a short unique ID
    const id = nanoid(8)

    // Insert into database
    const { data, error } = await supabase
      .from('deliveries')
      .insert([
        {
          id,
          item_id: itemId,
          item_name: itemName,
          recipient_name: recipientName,
          note: note || null,
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return Response.json({ error: 'Failed to create delivery' }, { status: 500 })
    }

    return Response.json({ id, success: true })
  } catch (err) {
    console.error('API error:', err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
