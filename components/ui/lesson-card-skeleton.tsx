import { Skeleton } from "./skeleton";

interface LessonCardSkeletonProps {
    key: number
}
export default function LessonCardSkeleton({key} : LessonCardSkeletonProps) {
    return (
        <div key={key} className="w-full h-full flex items-center justify-center p-2">
            <Skeleton className="border-solid min-w-full min-h-3/4" />
        </div>
    );
  }
  