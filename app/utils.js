'use client'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { YoutubeTranscript } from '@danielxceron/youtube-transcript';

const GOOGLE_API_KEY = "AIzaSyBJz4kmyon2Aib5NgthJwZ19MqtCcX8AiQ"

const searchYouTube = async (query) => {
  const YOUTUBE_API_KEY = "AIzaSyAiy208cJ5vzR-lygB5CvvtWNMc1rp4JaI";
  const baseURL = "https://www.googleapis.com/youtube/v3";

  try {
    const searchResponse = await fetch(`${baseURL}/search?${new URLSearchParams({
      part: "id,snippet",
      q: query,
      type: "video",
      maxResults: "3",
      videoDuration: "medium",
      relevanceLanguage: "en",
      key: YOUTUBE_API_KEY,
    })}`);

    const searchData = await searchResponse.json();
    console.log(searchData)


    const videoIds = searchData.items.map((item) => item.id.videoId);
    const videoDetailsResponse = await fetch(`${baseURL}/videos?${new URLSearchParams({
      part: "contentDetails,snippet",
      id: videoIds.join(","),
      key: YOUTUBE_API_KEY,
    })}`);




    const videoDetailsData = await videoDetailsResponse.json();


    console.log("details", videoDetailsData)
    return videoDetailsData.items.map((video) => ({
      video_id: video.id,
      title: video.snippet.title,
      channel: video.snippet.channelTitle,
      duration: video.contentDetails.duration,
    }));
  } catch (error) {
    console.error("Error in searchYouTube:", error.message);
    return [];
  }
};

const getVideoDetails = async (productName, catagry) => {
  const query = `${productName} tech review `;
  return await searchYouTube(query);
};

const fetchTranscriptFromAPI = async (videoId) => {
  try {
    const response = await fetch('https://web-production-f382.up.railway.app/get-transcript', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ video_id: videoId }),
    });


    const data = await response.json();

    if (!response.ok) {
      console.error(data.error);
      return null;
    }

    console.log("transcript", data.transcript)
    return data.transcript;
  } catch (error) {
    console.error('API error', error);
    return null;
  }
};











const summeriesTranscript = async (transcript, productName) => {

  try {
    const ai = new GoogleGenerativeAI(GOOGLE_API_KEY);
    const reviewSchema = {
      type: "object",
      properties: {
        detailedSummary: {
          type: "string",
          description: "A comprehensive summary of the review. It must objectively detail the key positive aspects (pros) and negative aspects (cons) mentioned in the transcript."
        },
        oneLinerSummary: {
          type: "string",
          description: "A very concise, one-sentence summary that captures the overall sentiment and main takeaway of the review.if you can't find anything usefull, Make sure to generate a output like a reviewer gave their opinion"
        }
      },
      required: ["detailedSummary", "oneLinerSummary"],
    };
    console.log("Generating summary for transcript...");
    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash-latest",

      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: reviewSchema,
      },
      systemInstruction: `You are a product review analyst for ${productName}. Analyze the provided transcript from multiple YouTube reviews. Synthesize the key information to populate all fields of the JSON schema accurately. Be objective and extract the most frequently mentioned points.`,
    });

    const prompt = `Please analyze the following review transcript and generate the structured summary based on the provided schema:\n\n---\n\n${transcript}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();


    const summaryData = JSON.parse(responseText);

    console.log('summary', summaryData);
    return summaryData;

  } catch (error) {
    console.log(error);

    return null;
  }
};

const GEN_API_KEY = "AIzaSyBiz4ZP2iOlhzj2zxkfq0k4sgTc9Ops_nQ";

export const generateReview = async (combinedTranscript) => {

  try {
    const ai = new GoogleGenerativeAI(GEN_API_KEY);

    const reviewSchema = {
      type: "object",
      properties: {
        overallVerdict: {
          type: "string",
          description: "A  overall review summary, 40 words.",
        },
        overallRating: {
          type: "number",
          description: "A numerical rating for the product out of 5. Synthesize this from the sentiment in the text.",
        },
        topPros: {
          type: "array",
          description: "An array of exactly 3 key positive points or strengths mentioned in the reviews.",
          items: { type: "string" },
        },
        topCons: {
          type: "array",
          description: "An array of exactly 3 key negative points or weaknesses mentioned in the reviews.",
          items: { type: "string" },
        },
        whoShouldBuy: {
          type: "array",
          description: "An array of 3-4 strings describing the ideal customer types for this product.",
          items: { type: "string" },
        },
        whoShouldAvoid: {
          type: "array",
          description: "An array of 3-4 strings describing the types of people who should not buy this product.",
          items: { type: "string" },
        },
      },
      required: ["overallVerdict", "overallRating", "topPros", "topCons", "whoShouldBuy", "whoShouldAvoid"],
    };


    const generationConfig = {
      responseMimeType: "application/json",
      responseSchema: reviewSchema,
    };

    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      generationConfig,
      systemInstruction: "You are a product review analyst. Analyze the provided transcript from multiple YouTube reviews. Synthesize the key information to populate all fields of the JSON schema accurately. Be objective and extract the most frequently mentioned points.",
    });


    const prompt = `Please analyze the following combined review transcript and generate the structured review data:\n\n---\n\n${combinedTranscript}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const reviewData = JSON.parse(responseText);

    console.log('review data :', reviewData);
    return reviewData;

  } catch (error) {
    console.error('error on last part', error);
    return null;
  }
};


export { getVideoDetails, fetchTranscriptFromAPI, summeriesTranscript };
// try {
//   const ai = new GoogleGenAI({
//     apiKey: GOOGLE_API_KEY, // Ensure this environment variable is set
//   });

//   const model = 'gemini-2.0-flash';

//   // Configuration for the AI model for detailed summary
//   const detailedConfig = {
//     responseMimeType: 'text/plain',
//     systemInstruction: {
//       text: 'You are an assistant that provides clear and concise summaries of given text. Preserve pros and cons, min:100 words, max:200 words, and ensure no extra helping words.',
//     },
//   };

//   const detailedContents = [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: `Summarize this text clearly and concisely: ${transcript}`,
//         },
//       ],
//     },
//   ];

//   // Generate detailed summary
//   const detailedResponse = await ai.models.generateContent({
//     model,
//     config: detailedConfig,
//     contents: detailedContents,
//   });

//   const detailedSummary = detailedResponse.text.trim();

//   // Configuration for the AI model for one-liner summary
//   const oneLinerConfig = {
//     responseMimeType: 'text/plain',
//     systemInstruction: {
//       text: 'You are an assistant that provides a summary of given review tell what they think about it . Avoid extra details or helping words.',
//     },
//   };

//   const oneLinerContents = [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: `Summarize this text in a single concise sentence: ${transcript}`,
//         },
//       ],
//     },
//   ];

//   // Generate one-liner summary
//   const oneLinerResponse = await ai.models.generateContent({
//     model,
//     config: oneLinerConfig,
//     contents: oneLinerContents,
//   });

//   const oneLinerSummary = oneLinerResponse.text.trim();

//   console.log('Detailed Summary:', detailedSummary);
//   console.log('One-Liner Summary:', oneLinerSummary);

//   // Return both summaries
//   return { detailedSummary, oneLinerSummary };
// } catch (error) {
//   console.error('Error generating content:', error.message);
//   if (error.response) {
//     console.error('Error details:', error.response.data); // Log additional error details if available
//   }
//   return { detailedSummary: null, oneLinerSummary: null };
// }
