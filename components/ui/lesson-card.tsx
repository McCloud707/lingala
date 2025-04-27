"use client";

import Link from "next/link";
import { Card, CardHeader } from "./card";
import { Progress } from "./progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import Modal from "./modal";

type LessonCardProps = {
  title: string;
  id: string;
  progress: number;
  onClick: any
};

export default function LessonCard({ title, id, progress, onClick }: LessonCardProps) {
  return (
    <div onClick={onClick} className="w-full h-full flex items-center justify-center p-2s">
      <Card className="border-solid w-full max-w-xl border-1 border-black flex flex-col">
        <CardHeader className="w-full text-xs md:text-sm xl:text-base text-left">
          {title}
        </CardHeader>
        <div className="w-full flex justify-left pl-6">
          <Progress
            className="[&>div]:bg-red-500 h-[20px] w-[90%]"
            value={progress}
          />
        </div>
      </Card>
    </div>
  );
}
