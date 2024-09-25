import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SkeletonOrderHistory() {
  const [isPulsing, setIsPulsing] = useState(true);
  const [isCustomAnimation, setIsCustomAnimation] = useState(true);

  const customAnimationClass = isCustomAnimation
    ? "animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent bg-[length:1000px_100%]"
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto ">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton
            className={`h-8 w-48 ${customAnimationClass}`}
            pulse={isPulsing}
          />
        </div>

        {[...Array(3)].map((_, index) => (
          <Card key={index} className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Skeleton
                  className={`h-4 w-24 ${customAnimationClass}`}
                  pulse={isPulsing}
                />
              </CardTitle>
              <Skeleton
                className={`h-6 w-24 rounded-full ${customAnimationClass}`}
                pulse={isPulsing}
              />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Skeleton
                  className={`h-6 w-32 ${customAnimationClass}`}
                  pulse={isPulsing}
                />
                <Skeleton
                  className={`h-6 w-24 ${customAnimationClass}`}
                  pulse={isPulsing}
                />
              </div>
              <div className="space-y-2">
                {[...Array(3)].map((_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-4">
                      <Skeleton
                        className={`h-12 w-12 rounded-md ${customAnimationClass}`}
                        pulse={isPulsing}
                      />
                      <div>
                        <Skeleton
                          className={`h-4 w-40 mb-2 ${customAnimationClass}`}
                          pulse={isPulsing}
                        />
                        <Skeleton
                          className={`h-3 w-24 ${customAnimationClass}`}
                          pulse={isPulsing}
                        />
                      </div>
                    </div>
                    <Skeleton
                      className={`h-4 w-16 ${customAnimationClass}`}
                      pulse={isPulsing}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="mt-8 flex justify-center">
          <Skeleton
            className={`h-10 w-32 rounded-md ${customAnimationClass}`}
            pulse={isPulsing}
          />
        </div>
      </div>
    </div>
  );
}
