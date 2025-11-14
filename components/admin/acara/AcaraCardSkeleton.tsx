export default function AcaraCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-pulse">
      {/* Image skeleton with badge */}
      <div className="relative">
        <div className="relative h-40 w-full bg-gray-200"></div>
        
        {/* Tribun badge skeleton - Top Right */}
        <div className="absolute top-3 right-3 h-8 w-24 bg-gray-300 rounded-full"></div>
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          {/* Nama acara skeleton */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          
          {/* Lokasi skeleton */}
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        
        {/* Date skeleton */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-3.5 h-3.5 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-48"></div>
        </div>
        
        {/* Deskripsi skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-3.5 bg-gray-200 rounded w-full"></div>
          <div className="h-3.5 bg-gray-200 rounded w-5/6"></div>
        </div>
        
        {/* Action buttons skeleton */}
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <div className="flex-1 h-9 bg-gray-200 rounded-lg"></div>
          <div className="h-9 w-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

