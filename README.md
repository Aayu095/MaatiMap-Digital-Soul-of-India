# 🌐 Maati: Discover India's Culture
<!-- Badges -->
<p align="left">
  <img src="https://img.shields.io/badge/Made%20with-Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Made with Next.js"/>
  <img src="https://img.shields.io/badge/Database-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Database Firebase"/>
  <img src="https://img.shields.io/badge/UI-Tailwind%20CSS-0D47A1?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="UI - Tailwind CSS"/>
    <img src="https://img.shields.io/badge/Authentication-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Authentication Firebase"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT"/>
  <img src="https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg?style=for-the-badge" alt="Contributions Welcome"/>
</p>

**MaatiMap** is a web application that allows users to explore the diverse culture of India. Discover art, food, heritage sites, rituals, music, and festivals from different regions. Save your favorite cultural items to your profile and plan your tour!

---

📑 **Table of Contents**
*   [✨ Core Features](#-core-features)
*   [🛠️ Tech Stack](#️-tech-stack)
*   [🔑 API Key Configuration](#-api-key-configuration)
*   [⚙️ Setup & Installation](#️-setup--installation)
*   [🚀 Running Locally](#-running-locally)
*   [🤝 Contributing](#-contributing)
*   [📄 License](#-license)
*   [📬 Contact](#-contact)

---

## ✨ Core Features
*   🔖 **Bookmarking:** Save cultural items to your personal collection.
*   ❤️ **Real-time Updates:** Bookmark status updates instantly across the application.
*   🗺️ **Interactive Map:** Discover cultural items plotted on an interactive map of India.
*   🔎 **Search:** Find cultural experiences based on keywords.
*   🎨 **Categorized Discovery:** Browse culture by categories like art, food, and heritage sites.
*   📍 **Regional Focus:** Explore cultural items specific to different regions of India.
*   👤 **User Authentication:** Securely create an account and manage your saved items.

---

## 🛠️ Tech Stack
*   **Frontend:** Next.js (App Router), React, TypeScript
*   **Styling:** Tailwind CSS, ShadCN UI
*   **Database:** Firebase Firestore
*   **Authentication:** Firebase Authentication
*   **Mapping:** (Potentially Placeholder for a mapping library)

---

## 🔑 API Key Configuration
Create two files in your project root:

1.  **`.env.local` (for client-side Firebase config):**
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY_HERE
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN_HERE
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID_HERE
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET_HERE
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID_HERE
    NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID_HERE
    ```
    *Obtain Firebase config values from your Firebase project settings.*

**Important:** This `.env.local` file is ignored by git (see `.gitignore`) and should not be committed. Your Vercel deployment will require these to be set as environment variables in its project settings.

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

---

## 🚀 Running Locally

1.  **Start the Next.js Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    (App usually runs on `http://localhost:3000`)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page]([YOUR_REPOSITORY_ISSUES_URL]).

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.
See the [LICENSE](./LICENSE) file for details.

---

## 📬 Contact

For any queries, ideas, or collaborations, reach out at: [YOUR_EMAIL_ADDRESS]

Project Link: [YOUR_REPOSITORY_URL]