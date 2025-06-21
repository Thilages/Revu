"use client";
import React, { useEffect, useRef, useState } from "react";
import { fetchTranscriptFromAPI, generateReview, getVideoDetails, summeriesTranscript } from "../utils";
import ReviewPage from "./Review";

const Loading = ({ productName, category }) => {
  const circleRef = useRef(null);
  const [status, setStatus] = useState("Initializing analysis...");
  const [Review, setReview] = useState(false)
  const [content, setcontent] = useState({})
  var indivialReview = []

  useEffect(() => {
    setcontent({})
    setReview(false)
    let ignore = false;

    // gpt decorations
    const animateCircle = () => {
      const circle = circleRef.current;
      if (circle) {
        circle.style.transform = "rotate(360deg)";
        circle.style.transition = "transform 1.5s linear";
      }
    };
    animateCircle();

    const summarize = async (transcript) => {
      try {

        const summary = await summeriesTranscript(transcript);
        console.log("summary:", summary);
        return summary;
      } catch (error) {
        console.log(error);

      }
    };

    const getVideoandTranscript = async () => {
      try {
        setStatus(`Searching for "${productName}" review videos...`);
        const videos = await getVideoDetails(productName, category);
        if (ignore) {
          return;
        };
        var full_review = ""
        console.log(videos)
        if (videos != []) {
          for (const video of videos) {
            if (ignore) return;

            try {
              setStatus(`Analyzing video: ${video.title}`);
              const transcript = await fetchTranscriptFromAPI(video.video_id);
              if (ignore) return;

              const summery = await summarize(transcript, productName);
              full_review += summery.detailedSummary;
              indivialReview.push({ Name: video.channel, Oneliner: summery.oneLinerSummary });


            } catch (error) {
              console.log(error);

            }
          }
          var review = await generateReview(full_review)
          review.Indiv = indivialReview;
          review.productName = productName;
          setReview(true)
          setcontent(review)
        } else {
          console.log("Youtube api quota exceeded")
          setStatus("Tell the mf how made this that youtube quota has execeded")
        }




        if (!ignore) {
          setStatus("Analysis complete!");
        }

      } catch (error) {
        console.log(error);
      }
    };

    getVideoandTranscript();

    return () => {
      ignore = true;
      if (circleRef.current) {
        circleRef.current.style.transform = "";
        circleRef.current.style.transition = "";
      }
    };
  }, []);

  return (

    <>
      {Review ? <ReviewPage review={content} /> : <div className="bg-gray-900 flex items-center justify-center min-h-screen">
        <div className="text-center flex flex-col items-center">
          <div className="mb-8">
            <div className="relative w-32 h-32">
              <div
                className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin"
                ref={circleRef}
              />
              <div className="absolute inset-0 rounded-full border-4 border-fuchsia-400 border-t-transparent animate-spin-slow" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            {productName && `Analyzing reviews for ${productName}`}
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto mb-4">
            {status}
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <div className="w-12 h-12 rounded-full bg-cyan-400/10 animate-pulse" />
            <div className="w-12 h-12 rounded-full bg-fuchsia-400/10 animate-pulse delay-200" />
            <div className="w-12 h-12 rounded-full bg-cyan-400/10 animate-pulse delay-400" />
          </div>
        </div>

      </div>}</>
  );
};

export default Loading;