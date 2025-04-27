import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "./button";
import Link from "next/link";

type LessonPageProps = {
  lessonData: any;
  onClick: any;
};

export default function LessonPage({ lessonData, onClick }: LessonPageProps) {
  return (
    <div className="p-2 h-8/10 w-full">
      <div className="flex items-center mb-4">
        <div className="mr-3">
          <ArrowLeft onClick={onClick} />
        </div>
        <div>
          <h1 className="text-lg font-medium">{lessonData.topic.title}</h1>
          <h2 className="">{lessonData.topic.description}</h2>
        </div>
      </div>
      <div className="px-8 py-2 h-full">
        <div className="markdown">
          <ReactMarkdown>{lessonData.lesson_data}</ReactMarkdown>
          <div className="w-full flex justify-center">
            <Link
              className="w-1/8 p-2 rounded-xl text-black border-black border-1 border-solid text-center no-underline"
              href={`/dashboard/learn/quiz/${
                lessonData.topic_id
              }?language=${encodeURIComponent(
                lessonData.language
              )}&topics=${encodeURIComponent(JSON.stringify([lessonData.topic_id]))}`}
            >
             Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
