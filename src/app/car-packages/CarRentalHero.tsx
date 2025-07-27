import React from 'react';
import bgcar from '@/images/car-without-bg.png'
import Image from 'next/image';


const CarRentalHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-[600px] flex items-center w-full">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-200 dark:bg-indigo-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                Explore 
                <span className="text-blue-600 dark:text-blue-400"> Sri Lanka</span>
                <br />
                with Our 
                <span className="text-blue-600 dark:text-blue-400"> Premium</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Car Rentals
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                Discover the beauty of Sri Lanka with our reliable and comfortable vehicles.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Browse Cars
              </button>
            </div>
          </div>
          {/* Right Content - Car Image */}
          <div className="relative">
            <div className="relative z-10">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 rounded-3xl blur-3xl opacity-20 dark:opacity-30 scale-110"></div>
              {/* Car Image Container */}
                <Image 
                  src={bgcar} 
                  alt="Blue sports car for rental"
                  className="w-full h-auto object-contain rounded-2xl"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarRentalHero;