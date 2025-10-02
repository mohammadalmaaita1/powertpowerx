# TelePowerX - AI-Powered Telecom Tower Monitoring

TelePowerX is an advanced web application designed for monitoring and managing telecommunications towers. It leverages AI to provide intelligent analysis, real-time data visualization, and proactive fault detection, helping network operators optimize performance and ensure reliability.

## ✨ Key Features

- **Interactive Dashboard**: An overview of the entire network's health, including key performance indicators (KPIs) like active towers, average signal strength, connected users, and energy consumption.
- **Geographical Map View**: A real-time map showing the geographical distribution and status (Normal, Warning, Critical) of all towers.
- **Detailed Tower Pages**: In-depth analytics for each tower, including:
    - Real-time metrics (Signal, User Load, Data Speeds, etc.).
    - **Power Flow & Charging Status**: Visual representation of the power source (grid/solar) and battery state (charging/discharging).
    - **Individual Battery Cell Data**: Granular details for each cell, such as voltage, current, temperature, and internal resistance.
    - **Historical Performance Charts**: Visual trends for signal strength, user load, energy usage, and battery charge/discharge cycles.
- **AI-Powered Analysis**: Utilizes Genkit and Google's Gemini model to analyze tower data and provide actionable recommendations for performance optimization.
- **Alerts & Fault Detection**: A dedicated page for viewing critical alarms and notifications, covering issues like overvoltage, overtemperature, communication failures, and maintenance warnings.
- **Reporting & Analytics**: Generate and download performance reports, and analyze historical data trends through comprehensive charts.
- **User Settings**: A section for managing user profile and preferences.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI Integration**: [Genkit (by Firebase)](https://firebase.google.com/docs/genkit)
- **Charts**: [Recharts](https://recharts.org/)
- **Mapping**: [Google Maps API](https://developers.google.com/maps)
- **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## 📂 Project Structure

Here is a high-level overview of the key directories in this project:

```
/
├── src/
│   ├── app/                # Next.js App Router: Contains all pages and API routes.
│   │   ├── api/            # API endpoints for fetching and updating data.
│   │   └── dashboard/      # Layout and pages for the main user dashboard.
│   ├── components/         # Reusable React components (UI elements, charts, cards).
│   │   └── ui/             # Core UI components from ShadCN.
│   ├── ai/                 # AI-related logic using Genkit.
│   │   └── flows/          # Genkit flows that define AI interactions.
│   ├── lib/                # Utility functions, type definitions, and mock data.
│   └── hooks/              # Custom React hooks (e.g., use-toast).
├── public/                 # Static assets like images and fonts.
└── tailwind.config.ts      # Tailwind CSS configuration.


```

## 📷 Screenshots

### Dashboard
![Dashboard](https://j.top4top.io/p_3562iw2if1.png)

### MAP VIEWS
![MAP VIEWS](https://k.top4top.io/p_3562bp1kg2.png)

### REPORTS
![REPORTS](https://l.top4top.io/p_35621og2c3.png)

### BATTERY
![BATTERY](https://a.top4top.io/p_3562kq4u94.png)

### ALERTS
![ALERTS](https://b.top4top.io/p_3562t6yq25.png)

## ⚙️ Getting Started

Follow these steps to set up the development environment.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your Google Maps API key:
    ```
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## 🚀 Deployment

To share this application with others, you need to deploy it to a public URL. The recommended way is using **Firebase App Hosting**.

### Prerequisites for Deployment
- A Firebase project. You can create one for free at the [Firebase Console](https://console.firebase.google.com/).
- The Firebase CLI. If you don't have it, install it globally:
  ```bash
  npm install -g firebase-tools
  ```

### Deployment Steps

1.  **Login to Firebase**:
    ```bash
    firebase login
    ```

2.  **Initialize Firebase in your project**:
    If you haven't already, run the initialization command:
    ```bash
    firebase init
    ```
    - When prompted, choose **App Hosting**.
    - Follow the on-screen instructions to select your Firebase project and configure the app's entry point. The CLI will guide you.

3.  **Deploy the application**:
    Run the deployment command:
    ```bash
    firebase deploy
    ```

After the command finishes, the CLI will give you a public URL (e.g., `https://your-app-name.web.app`). **This is the link you can send to anyone, anywhere, to access your application.**

## 🔗 API Endpoints

The application uses local API routes to simulate a backend. These can be found in `src/app/api/`:

-   `GET /api/towers`: Fetches a list of all towers.
-   `GET /api/towers/[id]`: Fetches details for a single tower.
-   `POST /api/towers`: Updates the data for a specific tower.
-   `GET /api/towers/download`: Generates and downloads a CSV report of the towers.

> **Note**: Currently, these endpoints use mock data from `src/lib/mock-data.ts`. For a production application, you would replace this with a real database connection (e.g., Firebase Firestore).

## 🤖 AI Integration with Genkit

Genkit handles the AI-powered analysis. The core logic is defined in:

-   **`src/ai/flows/tower-advisor-flow.ts`**: This file defines a Genkit "flow" that takes tower metrics as input, sends them to the Gemini model with a specific prompt, and receives structured analysis and recommendations as output.
-   **`src/app/dashboard/towers/[id]/page.tsx`**: The `AiAdvice` component in this file calls the Genkit flow to display the recommendations on the tower detail page.
