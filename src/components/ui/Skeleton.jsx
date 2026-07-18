import React from 'react';

// Primitive shimmer component
export const Shimmer = ({ className }) => (
  <div className={`animate-shimmer ${className}`} />
);

// Dashboard Page Skeleton
export const DashboardSkeleton = () => {
  return (
    <div className="max-w-[1400px] mx-auto w-full animate-pulse">
      {/* Header */}
      <div className="mb-8">
        <div className="h-9 w-48 bg-slate-200 rounded-xl mb-2" />
        <div className="h-5 w-72 bg-slate-100 rounded-md" />
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex flex-col justify-between h-[168px] relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <Shimmer className="w-12 h-12 rounded-2xl" />
              <Shimmer className="w-16 h-6 rounded-full" />
            </div>
            <div className="space-y-2">
              <Shimmer className="w-24 h-8 rounded-lg" />
              <Shimmer className="w-32 h-4 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders & Product Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table Skeleton */}
        <div className="lg:col-span-2 bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="h-6 w-36 bg-slate-200 rounded-md mb-2" />
            <div className="h-4 w-56 bg-slate-100 rounded-sm" />
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <Shimmer className="w-16 h-4 rounded" />
              <Shimmer className="w-24 h-4 rounded" />
              <Shimmer className="w-16 h-4 rounded" />
              <Shimmer className="w-16 h-4 rounded" />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <Shimmer className="w-20 h-5 rounded" />
                <div className="space-y-1">
                  <Shimmer className="w-24 h-4 rounded" />
                  <Shimmer className="w-32 h-3 rounded" />
                </div>
                <Shimmer className="w-16 h-5 rounded" />
                <Shimmer className="w-16 h-6 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Overview Skeleton */}
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-6">
          <div className="h-6 w-44 bg-slate-200 rounded-md mb-6" />
          <div className="space-y-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <Shimmer className="w-10 h-10 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Shimmer className="w-16 h-6 rounded-md" />
                  <Shimmer className="w-24 h-3 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Products Page Skeleton
export const ProductsSkeleton = () => {
  return (
    <div className="max-w-[1400px] mx-auto w-full animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-8">
        <div>
          <div className="h-9 w-36 bg-slate-200 rounded-xl mb-2" />
          <div className="h-5 w-72 bg-slate-100 rounded-md" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          <div className="w-full sm:w-36 h-12 bg-white rounded-xl border-2 border-slate-200" />
          <div className="w-full sm:w-44 h-12 bg-slate-200 rounded-xl" />
        </div>
      </div>

      {/* Categories Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5 mb-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-full h-20 sm:h-24 md:h-28 rounded-2xl border-2 border-slate-200 bg-white p-3 md:p-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <Shimmer className="w-16 h-4 rounded" />
              <Shimmer className="w-12 h-3 rounded" />
            </div>
            <div className="flex -space-x-1.5">
              {[1, 2, 3].map((j) => (
                <Shimmer key={j} className="w-5 h-5 rounded-full border border-white" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Product Grid Header */}
      <div className="flex items-center gap-3 mb-6">
        <Shimmer className="w-48 h-6 rounded" />
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden border-2 border-slate-100 shadow-sm p-3 space-y-4"
          >
            <Shimmer className="h-40 md:h-52 w-full rounded-2xl" />
            <div className="space-y-2 px-1">
              <Shimmer className="w-3/4 h-5 rounded" />
              <Shimmer className="w-1/3 h-4 rounded" />
              <div className="flex justify-between items-center pt-2">
                <Shimmer className="w-16 h-6 rounded" />
                <div className="flex gap-2">
                  <Shimmer className="w-8 h-8 rounded-lg" />
                  <Shimmer className="w-8 h-8 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Orders Page Skeleton
export const OrdersSkeleton = () => {
  return (
    <div className="max-w-[1400px] mx-auto w-full animate-pulse">
      {/* Header */}
      <div className="mb-8">
        <div className="h-9 w-52 bg-slate-200 rounded-xl mb-2" />
        <div className="h-5 w-96 bg-slate-100 rounded-md" />
      </div>

      {/* Status Filter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 h-[96px]"
          >
            <Shimmer className="w-10 h-8 rounded" />
            <Shimmer className="w-16 h-4 rounded" />
          </div>
        ))}
      </div>

      {/* Orders List Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <Shimmer className="w-12 h-12 rounded-2xl" />
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Shimmer className="w-20 h-5 rounded" />
                  <Shimmer className="w-16 h-5 rounded-full" />
                </div>
                <Shimmer className="w-48 h-4 rounded" />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right space-y-1">
                <Shimmer className="w-16 h-6 rounded ml-auto" />
                <Shimmer className="w-12 h-3 rounded ml-auto" />
              </div>
              <div className="w-5 h-5 bg-slate-100 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Customers Page Skeleton
export const CustomersSkeleton = () => {
  return (
    <div className="max-w-[1400px] mx-auto w-full animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <div className="h-9 w-36 bg-slate-200 rounded-xl mb-2" />
          <div className="h-5 w-52 bg-slate-100 rounded-md" />
        </div>
        <div className="w-full sm:w-80 h-12 bg-white border border-slate-200 rounded-xl" />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-sm space-y-2 h-[108px]"
          >
            <Shimmer className="w-12 h-8 rounded" />
            <Shimmer className="w-32 h-4 rounded" />
          </div>
        ))}
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-5 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Shimmer className="w-12 h-12 rounded-2xl" />
                <div className="space-y-1.5">
                  <Shimmer className="w-24 h-4 rounded" />
                  <Shimmer className="w-16 h-3 rounded-full" />
                </div>
              </div>
              <Shimmer className="w-8 h-8 rounded-lg" />
            </div>
            <div className="border-t border-slate-100 pt-4 space-y-2.5">
              <div className="flex items-center gap-2">
                <Shimmer className="w-4 h-4 rounded" />
                <Shimmer className="w-48 h-3.5 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <Shimmer className="w-4 h-4 rounded" />
                <Shimmer className="w-36 h-3.5 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Analytics Page Skeleton
export const AnalyticsSkeleton = () => {
  return (
    <div className="max-w-[1400px] mx-auto w-full animate-pulse">
      {/* Header */}
      <div className="mb-8">
        <div className="h-9 w-64 bg-slate-200 rounded-xl mb-2" />
        <div className="h-5 w-80 bg-slate-100 rounded-md" />
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 space-y-3"
          >
            <div className="w-12 h-12 bg-slate-200 rounded-2xl" />
            <div className="space-y-1">
              <Shimmer className="w-24 h-4 rounded" />
              <Shimmer className="w-32 h-6 rounded" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart Skeleton */}
        <div className="lg:col-span-2 bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
          <div className="flex justify-between items-center mb-10">
            <div className="space-y-2">
              <div className="h-6 w-36 bg-slate-200 rounded-md" />
              <div className="h-4 w-48 bg-slate-100 rounded-sm" />
            </div>
            <div className="w-32 h-10 bg-slate-100 rounded-xl border border-slate-100" />
          </div>

          <div className="h-64 flex items-end justify-between gap-6 px-4">
            {[80, 50, 95, 40, 75, 60].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4">
                <div className="w-[60%] bg-slate-100 rounded-t-xl overflow-hidden relative" style={{ height: `${h * 2}px` }}>
                  <Shimmer className="absolute inset-0 w-full h-full" />
                </div>
                <Shimmer className="w-8 h-3 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Top Products Skeleton */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
          <div className="h-6 w-28 bg-slate-200 rounded-md mb-6" />
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Shimmer className="w-10 h-10 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Shimmer className="w-32 h-4 rounded" />
                  <Shimmer className="w-full h-1.5 rounded-full" />
                </div>
                <div className="text-right space-y-1">
                  <Shimmer className="w-16 h-4 rounded" />
                  <Shimmer className="w-10 h-3 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
