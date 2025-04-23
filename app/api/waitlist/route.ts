import { createSupabaseClient } from "@/app/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseClient();

    const url = new URL(request.url);

    const user_email = url.searchParams.get("user_email");

    if (!user_email) {
      return new Response(
        JSON.stringify({ error: "Please enter a valid email" }),
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("waitlist_signups")
      .select("*")
      .eq("email", user_email.toLowerCase());

    if (error || data.length < 1) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Email not on waitlist" }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }
}

// app/api/hello/route.js
export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseClient();

    const { user_email } = await request.json();

    if (!user_email) {
      return new Response(JSON.stringify({ error: "Missing email" }), {
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from("waitlist_signups")
      .insert([{ email: user_email.toLowerCase() }]);

    if (error) {
      console.error(error);
      return new Response(JSON.stringify({ success: false, data }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }
}
