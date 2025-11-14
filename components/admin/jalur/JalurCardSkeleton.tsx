export default function JalurCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-pulse">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {/* Nama jalur skeleton */}
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            {/* Lokasi skeleton */}
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="flex items-center gap-1">
            {/* Action buttons skeleton */}
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

