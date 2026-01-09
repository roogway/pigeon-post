import { createClient } from '@supabase/supabase-js'
import ReceiverClient from './ReceiverClient'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function generateMetadata({ params }) {
  const { id } = params
  
  const { data } = await supabase
    .from('deliveries')
    .select('*')
    .eq('id', id)
    .single()

  if (data) {
    return {
      title: `${data.recipient_name} - You have a Pigeon Post!`,
      description: 'Someone sent you a pixel gift via carrier pigeon!',
    }
  }
  
  return {
    title: 'Pigeon Post',
    description: 'Send tiny pixel gifts to your friends',
  }
}

export default async function DeliveryPage({ params }) {
  const { id } = params

  const { data, error } = await supabase
    .from('deliveries')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-400">
        <div className="bg-white p-6 rounded-2xl text-center">
          <h1 className="text-xl font-bold mb-2">Delivery not found</h1>
          <p className="text-gray-500 mb-4">This pigeon may have gotten lost...</p>
          <a href="/" className="text-orange-500 hover:underline">Send your own pigeon</a>
        </div>
      </div>
    )
  }

  const delivery = {
    id: data.id,
    item: {
      id: data.item_id,
      name: data.item_name,
    },
    recipientName: data.recipient_name,
    note: data.note,
  }

  return <ReceiverClient delivery={delivery} />
}
