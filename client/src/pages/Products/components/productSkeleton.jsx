import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function SkeletonCard() {
  return (
    <div className=" bg-gradient-to-b from-green-100 to-white px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto">
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <Skeleton className="h-[300px] md:h-[600px]  w-full" />
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <CardHeader className="p-0 mb-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                  </div>
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Skeleton className="h-8 w-1/3 mb-4" />
                <Skeleton className="h-px w-full my-4" />
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-3/4 mb-6" />
                <div className="flex items-center mb-6">
                  <Skeleton className="h-6 w-6 mr-2" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <Skeleton className="h-7 w-1/3 mb-3" />
                <div className="space-y-2 mb-6">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
                <Skeleton className="h-7 w-1/3 mb-3" />
                <div className="space-y-2 mb-6">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
                <Skeleton className="h-7 w-1/3 mb-3" />
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-3/4 mb-6" />
              </CardContent>
              <CardFooter className="p-0 mt-4">
                <Skeleton className="h-12 w-full rounded-md" />
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// import React from 'react'
// import { Skeleton } from "@/components/ui/skeleton"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

// import React from 'react';
// import { Skeleton } from "@/components/ui/skeleton";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function SkeletonProductCard() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-4">
      <Card className="overflow-hidden p-2     text-center shadow">
        <CardHeader className="p-0">
          <Skeleton className="w-full h-48" />
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" /> {/* Product name */}
          <Skeleton className="h-4 w-1/2 mb-2" /> {/* Category */}
          <Skeleton className="h-4 w-1/2 mb-2" /> {/* Brand */}
          <Skeleton className="h-6 w-1/3" /> {/* Price */}
        </CardContent>
      </Card>
      <Card className="overflow-hidden p-2     text-center shadow">
        <CardHeader className="p-0">
          <Skeleton className="w-full h-48" />
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" /> {/* Product name */}
          <Skeleton className="h-4 w-1/2 mb-2" /> {/* Category */}
          <Skeleton className="h-4 w-1/2 mb-2" /> {/* Brand */}
          <Skeleton className="h-6 w-1/3" /> {/* Price */}
        </CardContent>
      </Card>
      <Card className="overflow-hidden p-2     text-center shadow">
        <CardHeader className="p-0">
          <Skeleton className="w-full h-48" />
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" /> {/* Product name */}
          <Skeleton className="h-4 w-1/2 mb-2" /> {/* Category */}
          <Skeleton className="h-4 w-1/2 mb-2" /> {/* Brand */}
          <Skeleton className="h-6 w-1/3" /> {/* Price */}
        </CardContent>
      </Card>
      <Card className="overflow-hidden p-2     text-center shadow">
        <CardHeader className="p-0">
          <Skeleton className="w-full h-48" />
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" /> {/* Product name */}
          <Skeleton className="h-4 w-1/2 mb-2" /> {/* Category */}
          <Skeleton className="h-4 w-1/2 mb-2" /> {/* Brand */}
          <Skeleton className="h-6 w-1/3" /> {/* Price */}
        </CardContent>
      </Card>
      
      
    </div>
  );
}
