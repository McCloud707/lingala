import { Skeleton } from "./skeleton";

export default function LessonCardSkeleton() {
    return (
        <div className="w-full h-full flex items-center justify-center p-2">
            <Skeleton className="border-solid min-w-full min-h-3/4" />
        </div>
    );
  }
  