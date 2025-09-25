import React from "react";
import { BsShieldFillCheck, BsLightningCharge, BsGraphUp } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { FaShieldAlt, FaExchangeAlt, FaRocket } from "react-icons/fa";

const ServiceCard = ({ color, title, icon, subtitle, gradient, delay = 0 }) => (
  <div 
    className={`
      group relative overflow-hidden rounded-2xl p-6 mb-4
      bg-gradient-to-br ${gradient}
      border border-white/10 backdrop-blur-md
      hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/20
      transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2
      cursor-pointer
    `}
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Animated background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Shimmer effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10 flex items-start space-x-4">
      {/* Icon container */}
      <div className="flex-shrink-0">
        <div className={`
          w-14 h-14 rounded-xl ${color} backdrop-blur-sm 
          flex items-center justify-center
          group-hover:scale-110 group-hover:rotate-3
          transition-all duration-300
          shadow-lg
        `}>
          {icon}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white text-lg mb-2 group-hover:text-blue-100 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
          {subtitle}
        </p>
      </div>
    </div>
    
    {/* Floating particles effect */}
    <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
    <div className="absolute bottom-6 left-4 w-1 h-1 bg-purple-400/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-700" style={{ animationDelay: '0.5s' }} />
  </div>
);

const Services = () => (
  <div className="flex w-full justify-center items-center gradient-bg-services">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-between md:p-20 py-16 px-4 w-full max-w-7xl">
      {/* Left Section - Content */}
      <div className="flex flex-col justify-start items-start">
        <div className="mb-6">
          <h1 className="text-white text-3xl sm:text-5xl font-bold mb-4 leading-tight">
            <span className="text-editorial">Services</span> that we
            <br />
            <span className="gradient-text">continue to <span className="text-editorial">improve</span></span>
          </h1>
        <p className="text-white/80 text-base leading-relaxed md:w-10/12 uppercase gap-2">
          The best choice for buying and selling your <span className="text-editorial capitalize">crypto </span>assets, with the
          various super <span className="text-editorial capitalize">friendly </span>services we offer
        </p>
        </div>
      </div>

      {/* Right Section - Service Cards */}
      <div className="flex flex-col justify-start items-start space-y-2">
        <ServiceCard
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          title="Bank-Grade Security"
          icon={<FaShieldAlt fontSize={24} className="text-white" />}
          subtitle="Advanced encryption and multi-layer security protocols protect your assets with military-grade protection"
          gradient="from-blue-600/20 to-purple-600/20"
          delay={0}
        />
        <ServiceCard
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          title="Best Exchange Rates"
          icon={<BsGraphUp fontSize={24} className="text-white" />}
          subtitle="Get the most competitive rates in the market with our advanced trading algorithms and real-time optimization"
          gradient="from-purple-600/20 to-pink-600/20"
          delay={100}
        />
        <ServiceCard
          color="bg-gradient-to-br from-pink-500 to-pink-600"
          title="Lightning Fast Transactions"
          icon={<FaRocket fontSize={24} className="text-white" />}
          subtitle="Ultra-fast transaction processing with our optimized blockchain infrastructure and smart routing technology"
          gradient="from-pink-600/20 to-red-600/20"
          delay={200}
        />
      </div>
    </div>
  </div>
);

export default Services;