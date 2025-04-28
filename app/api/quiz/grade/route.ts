import { createSupabaseClient } from "@/app/lib/supabase/server";

type GradeRequest = {
  topic_id: number
  user_id: string
  language: string
  change: number
}

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseClient();

    const { data } = await supabase.auth.getUser();

    const user_email = data.user?.email;

    if (!user_email) {
      return new Response(
        JSON.stringify({ error: "Please enter a valid email" }),
        {
          status: 400,
        }
      );
    }

    const requestBody : GradeRequest[] = await request.json();
    console.log(requestBody);

    requestBody.forEach((element: GradeRequest) => {
      element.user_id = user_email;
    });

    console.log(requestBody);

    const { data: updateData, error } = await supabase.rpc(
      "bulk_update_user_progress",
      {
        updates: requestBody,
      }
    );

    if (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Error updating progress" }),
        {
          status: 400,
        }
      );
    }
    console.log(updateData);

    return new Response(JSON.stringify({ error: "Updated progress" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "internal server erorr" }), {
      status: 500,
    });
  }
}
