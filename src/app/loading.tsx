import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="w-full py-8 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <Skeleton className="h-8 w-32 rounded-full border-2 border-black/10" />
              <Skeleton className="h-12 w-3/4 sm:h-16 md:h-20" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-12 w-full sm:w-48 rounded-lg" />
            </div>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-black/10 bg-muted order-1 lg:order-2">
               <Skeleton className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Section Skeleton */}
          <section>
            <div className="flex items-center justify-between mb-8 border-b pb-4">
               <Skeleton className="h-10 w-64" />
               <Skeleton className="h-6 w-24" />
            </div>
            
            <div className="grid gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="group flex flex-col md:flex-row overflow-hidden border-none shadow-none bg-card/50">
                  <div className="w-full md:w-64 aspect-video md:aspect-auto bg-muted/50 rounded-xl shrink-0 overflow-hidden">
                    <Skeleton className="w-full h-full" />
                  </div>
                  <div className="flex flex-col flex-1 p-4 md:py-2 md:px-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-24 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-20 mt-auto" />
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Skeleton */}
        <aside className="lg:col-span-4 space-y-10">
          <Card className="border-none shadow-md">
            <div className="p-6 space-y-6">
              <Skeleton className="h-8 w-40 mb-4" />
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4 items-start">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
