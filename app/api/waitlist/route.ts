import { createSupabaseAdmin } from "@/lib/client";

// app/api/hello/route.js
export async function POST(request: Request) {
    try {

        const supabase = createSupabaseAdmin()

        const { user_email } = await request.json();

        if(!user_email) {
            return new Response(JSON.stringify({error: 'Missing email'}), {
                status: 400
            })
        }

        const {data, error} = await supabase.from('waitlist_signups').insert([{email: user_email}])

        if(error) {
            console.error(error)
            return new Response(JSON.stringify({success: false, data}), {
                status: 500
            })
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
        })

    } catch(e) {
        console.error(e)
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
            status: 400,
        })
    }

  
  }
  