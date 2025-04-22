// CarCardSkeleton.tsx

const CarCardSkeleton = () => {
  return (
    <div className="w-full bg-[#f3eef0] rounded-2xl shadow-xl overflow-hidden p-2 animate-pulse">
      <div className="h-56 bg-gray-300 rounded-2xl mb-4"></div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center mb-2">
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="h-6 w-12 bg-gray-300 rounded"></div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-lg mb-4">
          <div className="h-5 w-20 bg-gray-300 rounded"></div>
          <div className="h-5 w-20 bg-gray-300 rounded"></div>
          <div className="h-5 w-20 bg-gray-300 rounded"></div>
          <div className="h-5 w-20 bg-gray-300 rounded"></div>
        </div>

        <div className="border-t border-gray-300 mb-4"></div>

        <div className="flex justify-between items-center">
          <div>
            <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
          </div>
          <div className="h-8 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CarCardSkeleton;
