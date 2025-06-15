# 🌐 Maati: Discover India's Culture
<!-- Badges -->
<p align="left">
  <img src="https://img.shields.io/badge/Made%20with-Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Made with Next.js"/>
  <img src="https://img.shields.io/badge/Database-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Database Firebase"/>
  <img src="https://img.shields.io/badge/AI-Genkit(Gemini)-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="AI by Genkit (Gemini)"/>
  <img src="https://img.shields.io/badge/Vector%20Search-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt = "Vector Search - MongoDB Atlas"/>
  <img src="https://img.shields.io/badge/UI-Tailwind%20CSS-0D47A1?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="UI - Tailwind CSS"/>
    <img src="https://img.shields.io/badge/Authentication-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Authentication Firebase"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT"/>
</p>

**Maati** is a web application that allows users to explore the diverse culture of India. Discover art, food, heritage sites, rituals, music, and festivals from different regions. Save your favorite cultural items, get AI-powered recommendations, plan your tour, and share your own local culture with the community!

---

📑 **Table of Contents**
*   [✨ Core Features](#-core-features)
*   [🛠️ Tech Stack](#️-tech-stack)
*   [🔑 API Key Configuration](#-api-key-configuration)
*   [⚙️ Setup & Installation](#️-setup--installation)
*   [🚀 Running Locally](#-running-locally)
*   [📄 License](#-license)
*   [📬 Contact](#-contact)

---

## ✨ Core Features

*   **Explore India:**
    *   🗺️ **Interactive Map:** Discover cultural items plotted on an interactive map of India.
    *   🔎 **Search:** Find cultural experiences based on keywords.
    *   🎨 **Categorized Discovery:** Browse culture by categories like art, food, and heritage sites.
    *   📍 **Near You:** Discover cultural experiences near your current location
    *   🏘️ **Community Feed:** Share your local culture with the community by uploading your own content and viewing content from others.
*   **Personalize Your Experience:**
    *   ❤️ **Bookmarking:** Save cultural items to your personal collection.
    *   🎲 **Maati Spin Wheel:** Win exciting prizes by spinning the Maati loot wheel!
*   **AI-Powered Exploration:**
    *   🤖 **AI Assistant**: Chat with an AI guide for recommendations and information.
    *   ✨ **AI Summaries**: Use AI to summarize cultural details
    *   ✈️ **Plan My Tour**:  Use AI to plan your personalized cultural tour of India!
*   **User Experience:**
    *   👤 **User Authentication:** Securely create an account and manage your saved items.

---

## 🛠️ Tech Stack

*   **Frontend:** Next.js (App Router), React, TypeScript
*   **Styling:** Tailwind CSS, ShadCN UI
*   **Database:** Firebase Firestore
*   **Authentication:** Firebase Authentication
*   **AI Orchestration:** Genkit (with Google Gemini models)
*   **Vector Search:** MongoDB Atlas
---

## 🔑 API Key Configuration

Create an \`.env.local\` file in your project root and add the following API keys:

```env
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY_FOR_GOOGLE_AI_SERVICES_HERE
    MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING_HERE
    NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY_HERE
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN_HERE
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID_HERE
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET_HERE
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID_HERE
    NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID_HERE
```

*   *Obtain Firebase config values from your Firebase project settings.*
*   *Get your Gemini API Key from Google AI Studio.*
*   *Set up a MongoDB Atlas cluster and obtain the connection string.*

**Important:** This \`.env.local\` file is ignored by git (see \`.gitignore\`) and should not be committed. Your Vercel deployment will require these to be set as environment variables in its project settings.

---

## ⚙️ Setup & Installation

1.  **Clone the Repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd [YOUR_REPOSITORY_DIRECTORY]
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set Up Environment Variables:** See [API Key Configuration](#-api-key-configuration) above.

4.  **Firebase Setup:**
    *   Create a Firebase project and enable Firestore Database and Authentication.
    *   Set up Firestore Security Rules:  *(Remember to configure appropriate security rules for your data. The public rules used earlier are not recommended for production.)*

5.  **MongoDB Atlas Setup**:
    *   Create a MongoDB Atlas account
    *   Create a cluster
    *   Add your IP address to the access list
    *   Get the connection string and add it to the .env file
---

## 🚀 Running Locally

You need to run two development servers concurrently:

1.  **Next.js Development Server (Frontend & Web APIs):**
    ```bash
    npm run dev
    ```
    (App usually runs on `http://localhost:9002`)

2.  **Genkit Development Server (AI Flows):**
    (Open a new terminal)
    ```bash
    npm run genkit:dev
    # or for auto-reloading:
    # npm run genkit:watch
    ```
    (Genkit server usually runs on `http://localhost:3400`. Check its logs for API key loading status.)

---

## 📄 License

This project is licensed under the MIT License.
See the [LICENSE](./LICENSE) file for details.

---

## 📬 Contact

For any queries, ideas, or collaborations, reach out at: [aayushigoel73@gmail.com]

Project Link: [https://github.com/Aayu095/MaatiMap-Digital-Soul-of-India](https://github.com/Aayu095/MaatiMap-Digital-Soul-of-India)