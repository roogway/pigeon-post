import { createClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {
  try {
    const { itemId, itemName, recipientName, senderName, note } = await request.json()

    if (!itemId || !itemName || !recipientName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const id = nanoid(8)

    const { error } = await supabase
      .from('deliveries')
      .insert({
        id,
        item_id: itemId,
        item_name: itemName,
        recipient_name: recipientName,
        sender_name: senderName || null,
        note: note || null,
      })

    if (error) {
      console.error('Supabase error:', error)
      return Response.json({ error: 'Failed to create delivery' }, { status: 500 })
    }

    return Response.json({ id })
  } catch (err) {
    console.error('API error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
