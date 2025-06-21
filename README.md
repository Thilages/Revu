# Revu - YouTube Video Analysis Application

## 🌐 Live Demo

Check out the live demo at: [https://revu-eight.vercel.app](https://revu-eight.vercel.app)


A modern web application built with Next.js that analyzes YouTube videos and provides detailed insights and reviews using AI-powered technologies.

![Revu Interface](https://github.com/Thilages/Revu/blob/main/image.png)

## 🎯 Key Features

- 🎬 **YouTube Video Analysis**: Instantly analyze YouTube videos and extract key insights
- 🤖 **AI-Powered Reviews**: Generate comprehensive reviews using Google's Generative AI
- 📊 **Visual Analytics**: Beautiful, modern interface with gradient backgrounds and animations
- 📱 **Responsive Design**: Works perfectly on all devices

![Review Analysis](https://github.com/Thilages/Revu/blob/main/Screenshot%202025-06-21%20114919.png)
![](https://github.com/Thilages/Revu/blob/main/Screenshot%20(50).png)

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Google Cloud API credentials for Generative AI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Thilages/Revu.git
   cd Revu
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file with your Google Cloud credentials:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

### Running the Application

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📚 Project Structure

```
revu/
├── app/              # Next.js application routes and pages
├── public/           # Static assets
├── components/       # Reusable React components
├── styles/          # Global styles and Tailwind configuration
└── utils/           # Utility functions and helpers
```

## 🚀 Features

- YouTube video analysis and review generation
- AI-powered content analysis using Google's Generative AI
- Video transcript extraction and processing
- Modern, responsive UI with Tailwind CSS
- Real-time video processing capabilities

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: React 19
- **AI Integration**: Google Generative AI
- **Styling**: Tailwind CSS
- **Dependencies**:
  - `@danielxceron/youtube-transcript` for transcript extraction
  - `axios` for HTTP requests
  - `lucide-react` for icons



