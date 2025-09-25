const Loader = () => (
  <div className="flex flex-col justify-center items-center py-3 space-y-3">
    {/* Main Spinner */}
    <div className="relative">
      {/* Outer ring */}
      <div className="w-10 h-10 border-3 border-white/10 rounded-full loader-outer">
        <div className="absolute top-0 left-0 w-full h-full border-3 border-transparent border-t-blue-400 rounded-full loader-outer" />
      </div>
      
      {/* Inner ring */}
      <div className="absolute top-1 left-1 w-8 h-8 border-2 border-white/5 rounded-full loader-inner">
        <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent border-r-purple-400 rounded-full loader-inner" />
      </div>
      
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full loader-center" />
      
      {/* Shimmer overlay */}
      <div className="absolute inset-0 rounded-full loader-shimmer opacity-30" />
    </div>
    
    {/* Loading text */}
    <div className="text-center">
      <p className="text-white/80 text-xs font-medium animate-pulse">Processing...</p>
      <div className="flex justify-center space-x-1 mt-1.5">
        <div className="w-1 h-1 bg-blue-400 rounded-full loader-dot" style={{ animationDelay: '0ms' }} />
        <div className="w-1 h-1 bg-purple-400 rounded-full loader-dot" style={{ animationDelay: '150ms' }} />
        <div className="w-1 h-1 bg-pink-400 rounded-full loader-dot" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

export default Loader;