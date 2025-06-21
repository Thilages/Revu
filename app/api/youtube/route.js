// app/api/transcript/route.js

import { NextResponse } from 'next/server';

// This library helps parse the XML format of the transcript
import { XMLParser } from 'fast-xml-parser';

const YOUTUBE_API_KEY = "AIzaSyAiy208cJ5vzR-lygB5CvvtWNMc1rp4JaI";
const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function POST(req) {
  if (!YOUTUBE_API_KEY) {
    console.error("YouTube API key is not set.");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { videoId } = body;

    if (!videoId) {
      return NextResponse.json({ error: "videoId is required." }, { status: 400 });
    }

    // --- Step 1: Find the available caption tracks for the video ---
    const captionListUrl = `${YOUTUBE_API_BASE_URL}/captions?part=snippet&videoId=${videoId}&key=${YOUTUBE_API_KEY}`;
    const captionListResponse = await fetch(captionListUrl);

    if (!captionListResponse.ok) {
        const errorData = await captionListResponse.json();
        console.error("YouTube API Error (captions.list):", errorData.error.message);
        return NextResponse.json(
            { error: "Failed to list captions.", details: errorData.error.message },
            { status: captionListResponse.status }
        );
    }
    
    const captionListData = await captionListResponse.json();
    
    // Find the English caption track. Note: 'a.en' is often the code for auto-generated English.
    const englishTrack = captionListData.items.find(
      (item) => item.snippet.language === "en" || item.snippet.language === "en-US"
    );

    if (!englishTrack) {
      console.log("No English caption track found for this video via API.");
      return NextResponse.json(
        { error: "No English transcript found for this video." },
        { status: 404 }
      );
    }

    // --- Step 2: Download the actual transcript content ---
    const captionId = englishTrack.id;
    const transcriptUrl = `${YOUTUBE_API_BASE_URL}/captions/${captionId}?key=${YOUTUBE_API_KEY}&tfmt=ttml`;
    const transcriptResponse = await fetch(transcriptUrl);

    if (!transcriptResponse.ok) {
        const errorText = await transcriptResponse.text();
        console.error("YouTube API Error (captions.download):", errorText);
        return NextResponse.json(
            { error: "Failed to download caption track." },
            { status: transcriptResponse.status }
        );
    }
    
    const transcriptXml = await transcriptResponse.text();

    // --- Step 3: Parse the TTML (XML) transcript to plain text ---
    const parser = new XMLParser({ ignoreAttributes: false, textNodeName: "text" });
    const parsed = parser.parse(transcriptXml);
    const paragraphs = parsed?.tt?.body?.div?.p || [];

    // Ensure paragraphs is an array before mapping
    const lines = Array.isArray(paragraphs) ? paragraphs.map(p => p.text) : [paragraphs.text];
    
    const fullTranscript = lines.join(' ').replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)); // Decode HTML entities


    return NextResponse.json({ transcript: fullTranscript }, { status: 200 });

  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch transcript.", details: error.message },
      { status: 500 }
    );
  }
}