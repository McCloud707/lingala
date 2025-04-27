import { createSupabaseClient } from "@/app/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseClient();

    const url = new URL(request.url);

    const { data: userData } = await supabase.auth.getUser()


    const { data, error } = await supabase
      .from("user_progress")
      .select("*, topic:topics(id, language, description, title)")
      .eq("user_id", userData.user?.email)
      .eq("active", true)

    if (error) {
      console.error(error);
    }

    return new Response(JSON.stringify({ success: true, data}));


  } catch {}
}
