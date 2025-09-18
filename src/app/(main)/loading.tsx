import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Top row */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <Skeleton className="lg:col-span-3 h-[300px]" />
        <Skeleton className="lg:col-span-2 h-[300px]" />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="lg:col-span-3 h-[350px]" />
      </div>

       {/* Third row */}
       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
      </div>

      {/* Fourth row */}
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-2">
        <div className="grid grid-cols-1 gap-8">
            <Skeleton className="h-[280px]" />
            <Skeleton className="h-[200px]" />
        </div>
        <div className="grid grid-cols-1 gap-8">
            <Skeleton className="h-[280px]" />
            <Skeleton className="h-[250px]" />
        </div>
      </div>
    </div>
  );
}
