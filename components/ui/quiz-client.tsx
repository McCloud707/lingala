"use client";

import { useState, useRef } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

type QuizClientProps = {
  quizData: any;
};

export default function QuizClient({ quizData }: QuizClientProps) {
  // Initialize state array with empty strings for each question
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(quizData.length).fill("")
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Function to handle option selection
  const handleOptionSelect = (
    questionIndex: number,
    selectedOption: string
  ) => {
    if (isSubmitted) return; // Prevent changes after submission
    
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = selectedOption;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Calculate the score
    let newScore = 0;
    quizData.forEach((question: any, index: number) => {
      if (selectedAnswers[index] === question.answer) {
        newScore++;
      }
    });

    setScore(newScore);
    setIsSubmitted(true);
    
    // Scroll the internal scrollable area to the top
    const scrollableArea = document.querySelector('.overflow-y-auto');
    if (scrollableArea) {
      scrollableArea.scrollTop = 0;
    }
  };

  const handleFinish = async () => {
    try {
      setIsLoading(true);
      
      const requestBody = quizData.map((elem: any, index: number) => (
        {
            topic_id: elem.topic_id,
            change: selectedAnswers[index] === quizData[index].answer ? 1 : -1,
            language: elem.language
        }
      ))

      console.log(requestBody)


      const response = await fetch('/api/quiz/grade/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save quiz results');
      }
      
      // After successful API call, navigate to the results page
      router.push('/dashboard/learn/');
    } catch (error) {
      console.error('Error saving quiz results:', error);
      // Handle error (show message to user, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedAnswers(Array(quizData.length).fill(""));
    setIsSubmitted(false);
    setScore(0);
  };

  // Function to determine the class for each option
  const getOptionClass = (questionIndex: number, option: string) => {
    if (!isSubmitted) {
      // Before submission
      return selectedAnswers[questionIndex] === option
        ? "border-1 border-black border-solid font-medium"
        : "hover:bg-gray-100";
    } else {
      // After submission
      const isSelected = selectedAnswers[questionIndex] === option;
      const isCorrect = option === quizData[questionIndex].answer;
      
      if (isCorrect) {
        return "border-2 border-green-500 font-medium"; // Correct answer with green outline
      } else if (isSelected) {
        return "border-2 border-red-500 font-medium"; // Wrong selected answer with red outline
      } else {
        return "opacity-70"; // Unselected options
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <div className="p-2 font-medium" ref={topRef}>
        <h1 className="text-2xl">Learn</h1>
        <h1 className="text-4xl">Quiz</h1>
        
        {isSubmitted && (
          <div className="mt-4 mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-lg font-medium">
              Your score: {score}/{quizData.length} 
              ({Math.round((score / quizData.length) * 100)}%)
            </p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {quizData.map((elem: any, index: number) => (
          <div key={index} className="mb-6">
            <p className="font-medium text-sm sm:text-base mb-2">{`${
              index + 1
            }. ${elem.question}`}</p>
            <ol className="list-decimal pl-5">
              {elem.options.map((option: string, idx: number) => (
                <li
                  key={idx}
                  className={`mb-1 p-2 rounded cursor-pointer ${
                    getOptionClass(index, option)
                  }`}
                  onClick={() => handleOptionSelect(index, option)}
                >
                  {option}
                </li>
              ))}
            </ol>
          </div>
        ))}
        <div className="w-full flex justify-center items-center pb-8">
          {!isSubmitted ? (
            <Button
              disabled={selectedAnswers.some((answer) => answer === "")}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button 
              onClick={handleFinish}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "FINISH"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}