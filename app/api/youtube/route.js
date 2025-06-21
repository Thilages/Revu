import { NextResponse } from 'next/server';
import { YoutubeTranscript } from '@danielxceron/youtube-transcript';

export async function POST(req) {
  

  try {
    const body = await req.json();
    const { videoId } = body;

    const transcriptList = await YoutubeTranscript.fetchTranscript(videoId, {
      languages: ["en", "en-US", "en-GB"], 
    });


    if (!transcriptList || transcriptList.length === 0) {
      console.log("Error: No transcript found for this video via library.");
      return NextResponse.json(
        { error: "No English transcript found for this video." },
        { status: 404 }
      );
    }
    const transcript = transcriptList.map((line) => line.text).join(' ');
    return NextResponse.json({ transcript }, { status: 200 });
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return NextResponse.json(
      { error: "Failed to fetch transcript.", details: error.message },
      { status: 500 }
    );
  }
}
