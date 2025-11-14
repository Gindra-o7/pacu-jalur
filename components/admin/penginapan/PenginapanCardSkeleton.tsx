export default function PenginapanCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="relative h-36 w-full bg-gray-200"></div>
      
      <div className="p-4">
        <div className="mb-2">
          {/* Nama penginapan skeleton */}
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          
          {/* Tipe + Harga skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-5 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        
        {/* Deskripsi skeleton */}
        <div className="space-y-2 mb-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-4/5"></div>
        </div>
        
        {/* Fasilitas skeleton */}
        <div className="mb-3">
          <div className="h-3 bg-gray-200 rounded w-16 mb-1.5"></div>
          <div className="flex flex-wrap gap-1">
            <div className="h-5 bg-gray-200 rounded w-14"></div>
            <div className="h-5 bg-gray-200 rounded w-16"></div>
            <div className="h-5 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
        
        {/* Maps link skeleton */}
        <div className="h-4 bg-gray-200 rounded w-28 mb-3"></div>
        
        {/* Action buttons skeleton */}
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <div className="flex-1 h-8 bg-gray-200 rounded-md"></div>
          <div className="h-8 w-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

