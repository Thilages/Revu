'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, MoveRight, Zap } from 'lucide-react';
import Dropdown from './components/CustomDropdown';

import Loading from '@/app/components/Loading';

export default function Home() {
  const [product, setProduct] = useState("");
  const [selected, setSelected] = useState("Mobile");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product) {
      setLoading(true);

    }




  };

  return (
    <div className="min-h-screen  w-full bg-gray-900 text-white font-sans overflow-hidden">


      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-[10%] left-[40%] w-[600px] h-[600px] bg-fuchsia-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] bg-teal-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">

        <header className="py-6 px-4 md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-7 w-7 text-cyan-400" />
              <span className="text-2xl font-bold tracking-tight">Revü</span>
            </div>
          </div>
        </header>


        <main className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 leading-tight animate-fade-in-down">
              Unbiased reviews, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                instantly synthesized.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto mb-10 text-lg md:text-xl text-white/60 animate-fade-in-down animation-delay-300">
              Stop wading through endless videos. We analyze reviews from YouTube and top tech sites to give you the verdict in seconds.
            </p>

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 animate-fade-in-up animation-delay-600"
            >
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="text"
                  value={product}
                  onChange={(e) => {
                    setProduct(e.target.value)
                    setLoading(false)
                  }}
                  placeholder="e.g., 'iPhone 15 Pro' "
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300"
                />
              </div>

              <Dropdown selected={selected} setSelected={setSelected} />

              <button
                type="submit"
                className="w-full md:w-auto group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-400"
              >
                Synthesize
                <MoveRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </main>



      </div>
      {loading && <Loading productName={product} catagry={selected} />}
    </div>
  );
}