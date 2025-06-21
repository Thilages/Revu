"use client";

import React from 'react';
import { Zap, RotateCw, CheckCircle2, XCircle, Star, StarHalf, ThumbsUp, ThumbsDown } from 'lucide-react';

const Starsrating = ({ rating}) => {
  
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Star key={i} className="w-6 h-6 animate-bounce text-cyan-400" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<StarHalf key={i} className="w-6 h-6 text-cyan-400" />);
    } else {
      stars.push(<Star key={i} className="w-6 h-6 text-white/20" />);
    }
  }
  return <div className="flex items-center gap-1">{stars}</div>;
};


const Youtubecard = ({ review }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-6 transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/10 transform hover:-translate-y-1">
      
      <div className="flex-grow">
        <p className="text-lg sm:text-xl italic text-white/90">"{review.Oneliner}"</p>
        <p className="text-right text-white/60 mt-2">— {review.Name}</p>
      </div>
    </div>
  );
};


const ReviewPage = ({review }) => {
  console.log(review)
  const reviewData = review;
  

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white font-sans overflow-y-auto">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-[10%] left-[40%] w-[600px] h-[600px] bg-fuchsia-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] bg-teal-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen p-4 sm:p-6 md:p-8">
        

        <div className="flex-grow w-full max-w-5xl mx-auto mt-8 animate-fade-in-up">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              {reviewData.productName}
            </h1>
            <div className="mt-4 flex items-center justify-center gap-4">
              <Starsrating rating={reviewData.overallRating} />
              <span className="text-xl font-bold text-white/80">{reviewData.overallRating.toFixed(1)} / 5.0</span>
            </div>
            <p className="max-w-3xl mx-auto mt-6 text-lg text-white/70 leading-relaxed">
              {reviewData.overallVerdict}
            </p>
          </div>
          <div className="mb-16">
             <div className="space-y-6">
              {reviewData.Indiv.map((review, index) => (
                <Youtubecard key={index} review={review} />
              ))}
            </div>
          </div>

          <div className=" rounded-2xl py-8 px-4 mb-16">
             <h2 className="text-3xl font-bold text-center mb-8">Synthesized Strengths & Weaknesses</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-bold text-xl mb-4 flex items-center gap-3 text-cyan-300"><ThumbsUp/> Top 3 Pros</h3>
                    <ul className="space-y-3">
                        {reviewData.topPros.map((item, i) => <li key={i} className="flex gap-3 items-center text-white/90 text-lg"><CheckCircle2 className="text-cyan-400 shrink-0" size={22}/>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-xl mb-4 flex items-center gap-3 text-fuchsia-400"><ThumbsDown/> Top 3 Cons</h3>
                     <ul className="space-y-3">
                        {reviewData.topCons.map((item, i) => <li key={i} className="flex gap-3 items-center text-white/90 text-lg"><XCircle className="text-fuchsia-500 shrink-0" size={22}/>{item}</li>)}
                    </ul>
                </div>
             </div>
          </div>
          <div className=" rounded-2xl py-8 px-4">
             <h2 className="text-3xl font-bold text-center mb-8">The Bottom Line</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-cyan-400/30 bg-cyan-400/10 rounded-xl p-6">
                    <h3 className="font-bold text-xl mb-4">Who Should Buy This?</h3>
                    <ul className="space-y-2 text-white/80">
                        {reviewData.whoShouldBuy.map((item, i) => <li key={i} className="flex gap-2 items-start"><span className="text-cyan-400 mt-1">✔</span>{item}</li>)}
                    </ul>
                </div>
                <div className="border border-fuchsia-500/30 bg-fuchsia-500/10 rounded-xl p-6">
                    <h3 className="font-bold text-xl mb-4">Who Should Avoid This?</h3>
                     <ul className="space-y-2 text-white/80">
                        {reviewData.whoShouldAvoid.map((item, i) => <li key={i} className="flex gap-2 items-start"><span className="text-fuchsia-500 mt-1">✖</span>{item}</li>)}
                    </ul>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;