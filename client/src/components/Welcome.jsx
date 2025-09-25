import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle, BsShieldCheck, BsLightningCharge, BsGlobe, BsWallet2, BsCurrencyBitcoin, BsSearch, BsChatDots } from "react-icons/bs";
import { FaCoins, FaNetworkWired } from "react-icons/fa";
import { HiShieldCheck } from "react-icons/hi2";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

// Glassmorphism Grid Item Component
const GridItem = ({ icon: Icon, title, className = "" }) => (
  <div className={`group relative overflow-hidden rounded-2xl p-4 min-h-[100px] flex flex-col justify-center items-center text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer ${className}`}>
    {/* Glassmorphism background */}
    <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300" />
    
    {/* Icon */}
    <div className="relative z-10 mb-2">
      <Icon className="text-2xl text-white group-hover:text-blue-300 transition-colors duration-300" />
    </div>
    
    {/* Title */}
    <div className="relative z-10">
      <span className="text-white text-sm font-medium group-hover:text-blue-100 transition-colors duration-300">
        {title}
      </span>
    </div>
    
    {/* Hover glow effect */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
  </div>
);

// Modern Input Component with Glassmorphism
const Input = ({ placeholder, name, type, value, handleChange, icon: Icon }) => (
  <div className="relative w-full my-3 group">
    {/* Input container with glassmorphism */}
    <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-white/10 group-hover:border-white/20 group-focus-within:border-blue-400/50 transition-all duration-300">
      {/* Icon */}
      {Icon && (
        <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 z-10">
          <Icon className="text-white/60 group-hover:text-blue-300 group-focus-within:text-blue-400 transition-colors duration-300 text-base sm:text-lg" />
        </div>
      )}
      
      {/* Input field */}
      <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className={`
          w-full py-3 sm:py-4 px-3 sm:px-4 text-white placeholder-white/50 
          bg-transparent border-none outline-none text-sm font-medium
          transition-all duration-300
          ${Icon ? 'pl-10 sm:pl-12' : 'pl-3 sm:pl-4'}
          focus:placeholder-white/30
          mobile-input
        `}
        style={{
          fontSize: '16px', // Prevent zoom on iOS
          WebkitAppearance: 'none',
          borderRadius: '0'
        }}
      />
      
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Shimmer effect on focus */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
    
    {/* Floating label effect */}
    {value && (
      <div className="absolute -top-2 left-3 sm:left-4 px-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-md">
        <span className="text-xs text-blue-300 font-medium">{placeholder}</span>
      </div>
    )}
  </div>
);

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading, error, setError } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-between md:p-20 py-12 px-4 w-full max-w-7xl">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-3xl sm:text-5xl text-white  py-1 tracking-tight">
            Send <span className="text-editorial">Crypto</span> <br /> across the <span className="text-editorial capitalize">world</span>
          </h1>
          <p className="text-left mt-5 font-light md:w-9/12 w-11/12 text-base uppercase gap-2 text-[#F2F2F2] ">
            Explore the <span className="text-editorial capitalize">crypto</span> world. Buy and sell cryptocurrencies easily on <span className="text-editorial capitalize">Krypto</span>.
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full mt-10">
            <GridItem 
              icon={HiShieldCheck} 
              title="Reliability" 
              className="rounded-tl-2xl sm:rounded-tl-2xl" 
            />
            <GridItem 
              icon={BsShieldCheck} 
              title="Security" 
            />
            <GridItem 
              icon={SiEthereum} 
              title="Ethereum" 
              className="sm:rounded-tr-2xl" 
            />
            <GridItem 
              icon={BsGlobe} 
              title="Web 3.0" 
              className="sm:rounded-bl-2xl" 
            />
            <GridItem 
              icon={FaCoins} 
              title="Low Fees" 
            />
            <GridItem 
              icon={FaNetworkWired} 
              title="Blockchain" 
              className="rounded-br-2xl sm:rounded-br-2xl" 
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-start w-full">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism rounded-2xl">
            {/* Form Header */}
            <div className="w-full mb-4">
              <h3 className="text-white text-lg font-semibold mb-2">Send Transaction</h3>
              <p className="text-white/70 text-sm">Fill in the details below to send ETH</p>
            </div>
            
            {/* Input Fields */}
            <Input 
              placeholder="Address To" 
              name="addressTo" 
              type="text" 
              value={formData.addressTo}
              handleChange={handleChange}
              icon={BsWallet2}
            />
            <Input 
              placeholder="Amount (ETH)" 
              name="amount" 
              type="number" 
              value={formData.amount}
              handleChange={handleChange}
              icon={SiEthereum}
            />
            <Input 
              placeholder="Keyword (Gif)" 
              name="keyword" 
              type="text" 
              value={formData.keyword}
              handleChange={handleChange}
              icon={BsSearch}
            />
            <Input 
              placeholder="Enter Message" 
              name="message" 
              type="text" 
              value={formData.message}
              handleChange={handleChange}
              icon={BsChatDots}
            />

            {/* Divider */}
            <div className="w-full my-4">
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="group relative w-full mt-2 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer overflow-hidden"
                >
                  {/* Button background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Button text */}
                  <span className="relative z-10 flex items-center justify-center">
                    <BsLightningCharge className="mr-2 text-lg" />
                    Send Transaction
                  </span>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;