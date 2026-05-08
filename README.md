# 🚀 AI-Powered ATS Resume Builder

A professional, high-conversion SaaS application designed to help job seekers build **ATS-friendly** resumes using the power of **Google Gemini AI**. This platform streamlines the resume creation process with real-time AI suggestions, professional formatting, and instant PDF exports.

![Build Status](https://img.shields.io/badge/Status-Production--Ready-success)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Tailwind%20%7C%20Strapi%20%7C%20Clerk-blue)

## ✨ Key Features

- **🤖 AI-Driven Content**: Instantly generate professional summaries and work experience bullet points using Gemini AI.
- **📊 Real-time ATS Scoring**: Get an immediate score for your resume based on industry best practices and section completeness.
- **🎯 Smart Suggestions**: Receive actionable AI feedback to improve your resume's impact.
- **📄 Instant PDF Export**: Perfectly formatted, recruiter-ready PDFs in a single click.
- **🔐 Secure Authentication**: Robust user management powered by Clerk.
- **📱 Responsive & Minimal UI**: A premium, distraction-free experience optimized for focus.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Lucide React
- **Backend**: Strapi CMS (Node.js)
- **Database**: Neon PostgreSQL
- **Authentication**: Clerk
- **AI Engine**: Google Gemini AI (Google Generative AI SDK)
- **State Management**: React Context API
- **Styling**: Tailwind CSS & Framer Motion

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A Google Gemini API Key
- A Clerk Account (for auth)
- A Strapi Instance (backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AshwiniMY/AI-Resume-Builder.git
   cd AI-Resume-Builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:
   ```env
   VITE_STRAPI_API_KEY=your_strapi_api_key
   VITE_API_BASE_URL=http://localhost:1337
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   VITE_GOOGLE_AI_API_KEY=your_gemini_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📖 How to Use

1. **Sign Up**: Create an account via Clerk.
2. **Create New**: Click "Create Resume" and give it a title.
3. **Fill Details**: Use the 7-step stepper flow to fill in your profile.
4. **AI Assist**: Click "AI Generate" in the Summary or Projects sections for professional content.
5. **Score & Feedback**: Check your live ATS score on the Finalize page.
6. **Export**: Download your high-quality PDF.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ for job seekers everywhere.
