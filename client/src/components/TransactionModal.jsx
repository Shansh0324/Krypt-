import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsArrowUpRight, BsArrowDownLeft, BsClock, BsHash } from 'react-icons/bs';
import { HiExternalLink } from 'react-icons/hi';
import { shortenAddress } from '../utils/shortenAddress';

const TransactionModal = ({ transaction, isOpen, onClose }) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !transaction) return null;

  const formatAmount = (amount) => {
    return parseFloat(amount).toFixed(6);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const openEtherscan = (address) => {
    const etherscanUrl = `https://sepolia.etherscan.io/address/${address}`;
    window.open(etherscanUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="relative w-full max-w-2xl max-h-[90vh] 
            bg-gradient-to-br from-white/10 to-white/5 
            backdrop-blur-xl border border-white/20 rounded-3xl
            shadow-2xl shadow-black/50
            transform transition-all duration-300 ease-out
            animate-modal-in
            overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 
              w-8 h-8 sm:w-10 sm:h-10 rounded-full
              bg-white/10 hover:bg-white/20 backdrop-blur-sm
              border border-white/20 flex items-center justify-center
              transition-all duration-200 hover:scale-110
              group"
          >
            <AiOutlineClose className="text-white text-sm sm:text-lg group-hover:text-red-300 transition-colors" />
          </button>

          {/* Header */}
          <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-white/10 pr-12 sm:pr-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <SiEthereum className="text-white text-lg sm:text-xl" />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-white">Transaction Details</h2>
                <p className="text-white/70 text-xs sm:text-sm">Ethereum Transfer</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 custom-scrollbar">
            {/* Amount Section */}
            <div className="text-center py-4 sm:py-6">
              <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-green-500/30">
                <BsArrowUpRight className="text-green-400 text-lg sm:text-xl" />
                <span className="text-2xl sm:text-3xl font-bold text-white">{formatAmount(transaction.amount)}</span>
                <span className="text-green-400 font-semibold text-base sm:text-lg">ETH</span>
              </div>
            </div>

            {/* Transaction Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* From Address */}
              <div className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <BsArrowDownLeft className="text-blue-400 text-sm" />
                  <span className="text-white/70 text-sm font-medium">From</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEtherscan(transaction.addressFrom)}
                    className="text-white font-mono text-sm break-all hover:text-blue-300 transition-colors text-left flex-1 hover:underline"
                    title="Click to view on Etherscan"
                  >
                    {transaction.addressFrom}
                  </button>
                  <button
                    onClick={() => copyToClipboard(transaction.addressFrom)}
                    className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                    title="Copy address"
                  >
                    <HiExternalLink className="text-sm" />
                  </button>
                </div>
              </div>

              {/* To Address */}
              <div className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <BsArrowUpRight className="text-green-400 text-sm" />
                  <span className="text-white/70 text-sm font-medium">To</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEtherscan(transaction.addressTo)}
                    className="text-white font-mono text-sm break-all hover:text-green-300 transition-colors text-left flex-1 hover:underline"
                    title="Click to view on Etherscan"
                  >
                    {transaction.addressTo}
                  </button>
                  <button
                    onClick={() => copyToClipboard(transaction.addressTo)}
                    className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                    title="Copy address"
                  >
                    <HiExternalLink className="text-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Message Section */}
            {transaction.message && (
              <div className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                  <BsHash className="text-purple-400 text-sm" />
                  <span className="text-white/70 text-sm font-medium">Message</span>
                </div>
                <p className="text-white text-sm bg-white/5 rounded-xl p-2 sm:p-3 italic">
                  "{transaction.message}"
                </p>
              </div>
            )}

            {/* Keyword Section */}
            {transaction.keyword && (
              <div className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                  <BsHash className="text-yellow-400 text-sm" />
                  <span className="text-white/70 text-sm font-medium">Keyword</span>
                </div>
                <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 border border-yellow-500/30">
                  <span className="text-yellow-300 font-medium text-sm">{transaction.keyword}</span>
                </div>
              </div>
            )}

            {/* Timestamp Section */}
            <div className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/10">
              <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                <BsClock className="text-cyan-400 text-sm" />
                <span className="text-white/70 text-sm font-medium">Timestamp</span>
              </div>
              <p className="text-white text-sm font-mono">
                {formatTimestamp(transaction.timestamp)}
              </p>
            </div>

            {/* GIF Section */}
            {transaction.url && (
              <div className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                  <BsHash className="text-pink-400 text-sm" />
                  <span className="text-white/70 text-sm font-medium">Transaction GIF</span>
                </div>
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={transaction.url}
                    alt="Transaction GIF"
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 pt-3 sm:pt-4 border-t border-white/10">
            <div className="flex items-center justify-center space-x-2 text-white/50 text-xs">
              <SiEthereum className="text-sm" />
              <span>Powered by Ethereum Blockchain</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionModal;
