"use client";

import LessonCard from "@/components/ui/lesson-card";
import LessonCardSkeleton from "@/components/ui/lesson-card-skeleton";
import LessonPage from "@/components/ui/lesson-page";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TopicData {
  id: number;
  title: string;
  language: string;
  description: string;
};

interface LessonData  {
  user_id: string;
  langugae: string
  proficiency: number;
  prev_proficiency: number;
  active: boolean;
  lesson_data: string;
  topic: TopicData;
  topic_id: number;
};

export default function LEARN() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<LessonData[]>([]);
  const [showLesson, setShowLesson] = useState<boolean>(false);
  const [currentLesson, setCurrentLesson] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/lessons/recommended", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJson = await response.json();
      setData(responseJson.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="h-1/10 text-2xl p-2 font-medium">
        <h1>Learn</h1>
      </div>

      {showLesson ? (
        <LessonPage
          onClick={() => {
            setShowLesson(false);
          }}
          lessonData={data[currentLesson]}
        />
      ) : (
        <>
          <h2 className="text-2xl text-center">Recommended Lessons</h2>
          <div className="grid grid-cols-2 h-8/10 grid-rows-3 items-center w-full">
            {!loading
              ? data.map((datum: LessonData, index: number) => (
                  <LessonCard
                    onClick={() => {
                      setCurrentLesson(index);
                      setShowLesson(true);
                      console.log(data);
                    }}
                    progress={datum.proficiency}
                    key={datum.topic.id}
                    id={datum.topic.id}
                    title={datum.topic.title}
                  ></LessonCard>
                ))
              : Array(6)
                  .fill(0)
                  .map((_, index) => 
                  <LessonCardSkeleton key={index} />)}
          </div>
          <div className="w-full flex justify-center">
            <Link
              className="w-1/8 p-2 rounded-xl text-black border-black border-1 border-solid text-center no-underline"
              href={`/dashboard/learn/quiz`}
            >
              Mini Quiz
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
