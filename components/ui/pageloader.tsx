import { Loader } from "lucide-react";

type PageLoaderProps = {
  message: string;
};

const PageLoader = ({ message }: PageLoaderProps) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Loader />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

export default PageLoader;
