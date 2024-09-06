import { Circle } from "./BlogCard";

export const BlogSkeleton = () => {
  return (
    <div>
      <div role="status" className="animate-pulse">
        <div className="border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
          <div className="flex">
            <div className="">
              <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
            </div>
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
              <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            </div>
            <div className="flex justify-center flex-col pl-2 ">
              <Circle />
            </div>
            <div className="pl-2 font-thin font-slate-500 tex-sm flex justify-center flex-col">
              <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            </div>
          </div>
          <div className="text-xl font-semibold pt-2">
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
          </div>
          <div className="text-md font-thin">
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
          </div>
          <div className="text-slate-500 font-thin pt-2">
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
          </div>
        </div>

        <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
