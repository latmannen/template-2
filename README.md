# Voice Notes App

A simple voice-based note-taking application built with Next.js, React, TypeScript, and Tailwind CSS. This app allows users to record voice notes, which are automatically transcribed using the Deepgram API and stored in Firebase.

## Features

- Record voice notes with a simple click
- Real-time transcription using Deepgram API
- Automatic saving to Firebase Firestore
- View and delete saved notes
- Clean, responsive UI with Tailwind CSS

## Technologies Used

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Firebase (Firestore)
- Deepgram API for real-time voice transcription

## Getting Started (Windows)

1. Clone the repository
   ```powershell
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   DEEPGRAM_API_KEY=your_deepgram_api_key
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   FIREBASE_APP_ID=your_firebase_app_id
   ```

   You can create this file using PowerShell:
   ```powershell
   New-Item -Path .env.local -ItemType File
   ```
   
   Then open it in your preferred text editor to add the environment variables.

4. Run the development server:
   ```powershell
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Troubleshooting (Windows)

- If you encounter permission issues, try running PowerShell as Administrator
- If npm commands aren't recognized, ensure Node.js is properly installed and added to your PATH
- For microphone access issues, ensure your browser has permission to access your microphone
- If you're using Windows Defender Firewall, you might need to allow the application through the firewall

## How to Use

1. Click the microphone button to start recording
2. Speak clearly into your microphone
3. Click the stop button when you're done
4. Your voice note will be automatically transcribed and saved
5. View your notes in the list below the recorder
6. Delete notes by clicking the trash icon

## License

MIT