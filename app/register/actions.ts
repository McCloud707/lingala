"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseClient } from "../lib/supabase/server";

export async function register(formData: FormData) {
  const supabase = await createSupabaseClient();

  console.log(formData.get("password"));
  console.log(formData.get("confirmed-password"));

  const { data: waitlistData, error: waitlistError } = await supabase
    .from("waitlist_signups")
    .select("*")
    .eq("email", formData.get("email"))
    .single();

  if (waitlistError) {
    console.error(waitlistError);
    redirect("/register?error=You're not on the waitlist or not approved yet");
  }

  if (formData.get("password") !== formData.get("confirmed-password")) {
    redirect("/register?error=Passwords+must+match");
  }

  const passwordRegex =
    /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z]{7})[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8}$/;

  if (!passwordRegex.test(formData.get("password") as string)) {
    redirect("/register?error=Password+does+not+meet+requirements");
  }

  console.log(waitlistData);

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);
  console.error(error);

  if (error) {
    console.error(error);
    redirect(`/register?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
