import createOpenAIClient from "@/app/lib/openai/openai";
import { createSupabaseClient } from "@/app/lib/supabase/server";
import QuizClient from "@/components/ui/quiz-client";

interface Question {
  question: string,
  options: string[],
  topic_id: number,
  language: string,
}

export default async function QUIZ() {
  const supabase = await createSupabaseClient();

  const { data: userData } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("user_progress")
    .select("topic:topics(id, language, description, title)")
    .eq("user_id", userData.user?.email)
    .eq("active", true);

  if (error) {
    console.error(error);
  }

  const openai = createOpenAIClient();
  console.log(data);

  const response = await openai.responses.create({
    model: "gpt-4-turbo",
    instructions:
      "You are being used to generate quizzes for a language learning application.",
    input: `Using the following topics, generate 10 questions, using each topic at least once: ${JSON.stringify(
      data
    )}.
    
  The questions should NOT be open-ended. Each question must have a definite answer. Only two types of questions are allowed: 
  1. Multiple choice (provide 3-4 options, clearly indicating the correct one).
  2. Fill-in-the-blanks.

  Some other tips
  1. If the gender used in the question is ambiguous simply add in parantheses the desired gender afterwards
  2. If the formal or informal form of tu is ambiguous then make sure to add clarification in parentheses
  3. All options should be real french constructions, even if they make no sense in that context
  4. Options should not be the same as others
  
  Respond ONLY with a valid JSON object in the following format (no extra text or code blocks):
  
  {
    "data": [
      {
        "question": "string",
        "options": ["option A", "option B", "option C"],
        "answer": "correct option"
        "topid_id": "topic id"
        "language": language
      }
    ]
  }
  `,
  });


  function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  const responseData = JSON.parse(response.output_text).data

  responseData.forEach((question: Question)=> {
    question.options = shuffleArray(question.options)
  })

  console.log(response.output);
  console.log(response);

  // We need to use client components for useState
  return <QuizClient quizData={responseData} />;
}