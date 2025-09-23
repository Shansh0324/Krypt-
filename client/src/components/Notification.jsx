import React from "react";

const Notification = ({ notification }) => {
  if (!notification.show) return null;

  const getNotificationStyles = () => {
    const baseStyles = "fixed top-8 right-8 z-50 p-6 rounded-2xl shadow-2xl max-w-sm transition-all duration-500 ease-in-out backdrop-blur-md border";
    
    if (notification.type === "success") {
      return `${baseStyles} bg-gradient-to-br from-green-500/90 to-emerald-600/90 text-white border-green-400/30`;
    } else if (notification.type === "error") {
      return `${baseStyles} bg-gradient-to-br from-red-500/90 to-rose-600/90 text-white border-red-400/30`;
    } else if (notification.type === "info") {
      return `${baseStyles} bg-gradient-to-br from-blue-500/90 to-indigo-600/90 text-white border-blue-400/30`;
    } else {
      return `${baseStyles} bg-gradient-to-br from-gray-500/90 to-slate-600/90 text-white border-gray-400/30`;
    }
  };

  const getIcon = () => {
    if (notification.type === "success") {
      return (
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      );
    } else if (notification.type === "error") {
      return (
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      );
    } else if (notification.type === "info") {
      return (
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-spin">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
      );
    }
  };

  return (
    <div className={getNotificationStyles()}>
      <div className="flex items-start space-x-3">
        {getIcon()}
        <div className="flex-1">
          <p className="text-sm font-semibold leading-relaxed">
            {notification.message}
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
