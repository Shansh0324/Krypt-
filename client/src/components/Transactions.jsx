import React, { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { BsArrowUpRight, BsArrowDownLeft } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] 
      border border-gray-700/50 rounded-2xl p-5 
      hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10
      transition-all duration-300 ease-in-out
      backdrop-blur-sm
      h-[320px] w-full
      flex flex-col"
    >
      {/* Header with transaction type indicator */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <SiEthereum className="text-white text-xs" />
          </div>
          <span className="text-white font-semibold text-xs">ETH Transfer</span>
        </div>
        <div className="flex items-center space-x-1 text-green-400">
          <BsArrowUpRight className="text-xs" />
          <span className="text-xs font-medium">Sent</span>
        </div>
      </div>

      {/* Main Content Area - Side by Side Layout */}
      <div className="flex-1 flex gap-4">
        {/* Left Side - Transaction Details */}
        <div className="flex-1 space-y-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs">From</span>
              <a 
                href={`https://sepolia.etherscan.io/address/${addressFrom}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 text-xs font-mono transition-colors"
              >
                {shortenAddress(addressFrom)}
              </a>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs">To</span>
              <a 
                href={`https://sepolia.etherscan.io/address/${addressTo}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 text-xs font-mono transition-colors"
              >
                {shortenAddress(addressTo)}
              </a>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs">Amount</span>
              <span className="text-white font-semibold text-sm">{amount} ETH</span>
            </div>
          </div>
          
          {message && (
            <div className="pt-2 border-t border-gray-700/50">
              <span className="text-gray-400 text-xs block mb-1">Message</span>
              <p className="text-white text-xs bg-gray-800/50 rounded-lg p-2 italic line-clamp-2">
                "{message}"
              </p>
            </div>
          )}
        </div>

        {/* Right Side - GIF */}
        <div className="w-32 flex-shrink-0">
          <div className="relative rounded-lg overflow-hidden bg-gray-800/30 h-full">
            <img
              src={gifUrl || url}
              alt="Transaction GIF"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>
      </div>

      {/* Footer with timestamp */}
      <div className="mt-3 pt-3 border-t border-gray-700/50">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-xs">Time</span>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[#37c7da] font-medium text-xs">{timestamp}</span>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 
        rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="w-full gradient-bg-transactions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          {currentAccount ? (
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Latest Transactions
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Your recent crypto transactions with dynamic GIFs and detailed information
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Connect your MetaMask wallet to view your transaction history and send new transactions
              </p>
            </div>
          )}
        </div>

        {/* Transactions Grid */}
        <div className="w-full">
          {currentAccount ? (
            // Show only real transactions when wallet is connected
            transactions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {[...transactions].reverse().map((transaction, i) => (
                  <TransactionsCard 
                    key={`real-${transaction.addressFrom}-${transaction.timestamp}-${i}`} 
                    {...transaction} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <SiEthereum className="text-4xl text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">No Transactions Yet</h3>
                  <p className="text-gray-400 mb-6">
                    Send your first transaction to see it appear here with a dynamic GIF!
                  </p>
                  <div className="inline-flex items-center space-x-2 text-blue-400">
                    <BsArrowUpRight className="text-lg" />
                    <span className="font-medium">Start your crypto journey</span>
                  </div>
                </div>
              </div>
            )
          ) : (
            // Show only dummy data when wallet is NOT connected
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {dummyData.slice(0, 6).map((transaction, i) => (
                <TransactionsCard key={`dummy-${i}`} {...transaction} />
              ))}
            </div>
          )}
        </div>

        {/* Stats Section (only when wallet is connected) */}
        {currentAccount && transactions.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{transactions.length}</div>
              <div className="text-gray-400">Total Transactions</div>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {transactions.reduce((sum, tx) => sum + tx.amount, 0).toFixed(4)}
              </div>
              <div className="text-gray-400">ETH Transferred</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {new Set(transactions.map(tx => tx.addressTo)).size}
              </div>
              <div className="text-gray-400">Unique Recipients</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;