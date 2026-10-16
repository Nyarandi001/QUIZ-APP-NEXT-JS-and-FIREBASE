# Quiz App — Next.js & Firebase

A full-stack quiz application built with Next.js, React, Firebase Authentication, and Cloud Firestore. The application provides separate admin and user sections, allowing administrators to create and manage quizzes while users can take quizzes and track their results.

## Features

### Admin Section
- **Admin Authentication:** Register and log in using Firebase Authentication.
- **Create Quizzes:** Add new quizzes with multiple-choice questions, answer options, correct answers, and quiz duration.
- **View Results:** Access quiz results submitted by users.
- **Manage Quizzes:** View and delete existing quizzes.
- **Quiz Management:** Organize quizzes and their associated questions.

### User Section
- **User Authentication:** Register and log in securely.
- **Browse Quizzes:** Access available quizzes.
- **Take Quizzes:** Answer multiple-choice questions.
- **View Results:** See personal quiz results.
- **Personalized Results:** Access individual results rather than viewing other users' results.

### Backend and Database
- Firebase Authentication for user authentication.
- Cloud Firestore for storing quiz information, questions, and results.
- Next.js for application structure, routing, and frontend development.
- Tailwind CSS for responsive user interface styling.

## Technologies Used

- **Next.js** — React framework for building the application.
- **React** — Component-based user interface.
- **JavaScript / JSX** — Application logic and UI components.
- **Tailwind CSS** — Styling and responsive layouts.
- **Firebase Authentication** — User registration and login.
- **Cloud Firestore** — NoSQL database for quizzes, questions, and results.
- **Git and GitHub** — Version control and source code hosting.

## Project Structure

The project includes separate admin and user sections, along with Firebase configuration.

```text
quiz-app/
├── app/
│   ├── admin/
│   │   ├── api/
│   │   │   └── route.ts
│   │   ├── addquiz/
│   │   │   └── page.jsx
│   │   └── ...
│   ├── ...
│   └── ...
├── config/
│   └── firebase.js
├── public/
├── package.json
├── package-lock.json
├── README.md
└── ...
```

*Note: This is an illustrative structure based on the project description. Adjust the paths to match your actual project files.*

## Prerequisites

Before installing the application, make sure you have:

- [Node.js](https://nodejs.org/) installed (use a version compatible with your Next.js version).
- npm, which is included with Node.js.
- A [Git](https://git-scm.com/) installation.
- A Google account to configure Firebase.

## Installation and Setup

### 1. Clone the Repository

Open your terminal or command prompt and run:

```bash
git clone https://github.com/Nyarandi001/QUIZ-APP-NEXT-JS-and-FIREBASE.git
```


### 2. Navigate to the Project Directory

```bash
cd YOUR_REPOSITORY
```

### 3. Install Dependencies

Run the following command to install the project's dependencies:

```bash
npm install
```
 ```bash
npm install motion
```
### 4. Configure Firebase

The application uses Firebase Authentication and Cloud Firestore.

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Create a Firebase project or select an existing project.
3. Register a web application in your Firebase project.
4. Open the application's Firebase configuration settings.
5. Copy your Firebase web configuration values.
6. Enable **Authentication** and configure the sign-in methods used by your application.
7. Create a **Cloud Firestore** database.

Configure the Firebase settings in your project's `config/firebase.js` file, using the configuration values from your Firebase Console.

For example, if your project initializes Firebase directly in `config/firebase.js`, the configuration may look like this:

```javascript
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID",
};

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
```

**Important:** This is an example configuration. Adapt it to your existing Firebase file and imports rather than replacing working project code unnecessarily.

For a public repository, consider storing configuration values in environment variables instead of hardcoding them. Regardless of how Firebase is configured, enforce appropriate Firebase Authentication checks and Firestore Security Rules. Never expose Firebase Admin SDK credentials or service-account private keys in frontend code.

### 5. Configure Firestore Security Rules

Set up Firestore Security Rules to control access to quiz records, questions, and results.

The rules should ensure that:
- Only authorized administrators can create or delete quizzes.
- Authenticated users can access permitted quizzes.
- Users can read only their own results unless an authorized administrator needs broader access.
- Users cannot modify their scores or correct answers to manipulate results.

Do not deploy the application with unrestricted database rules.

### 6. Run the Development Server

Start the application with:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

The application should now be available locally.

## Available Scripts

The following are common Next.js scripts. Confirm the actual scripts in your `package.json`.

| Command | Description |
|---|---|
| `npm install` | Installs project dependencies. |
| `npm run dev` | Starts the development server. |
| `npm run build` | Builds the application for production. |
| `npm start` | Starts the production server after a successful build. |
| `npm run lint` | Runs the configured linting script, if available. |

## How the Application Works

1. **Registration and Login:** Administrators and users authenticate through Firebase Authentication.
2. **Quiz Creation:** Administrators create quizzes and add questions with multiple-choice answers.
3. **Quiz Access:** Users access available quizzes through the user section.
4. **Quiz Submission:** Users complete quizzes and submit their answers.
5. **Results Tracking:** Quiz results are stored and made available to the appropriate users and administrators.
6. **Quiz Management:** Administrators can review results and remove quizzes when necessary.

## Database

Cloud Firestore is used to store the application's data. Depending on the implementation, the database can contain:

- **Quiz records:** Quiz names, identifiers, creators, duration, and other quiz metadata.
- **Questions:** Question text, answer options, correct answers, and associated quiz identifiers.
- **Results:** User identifiers, quiz identifiers, scores, and submission details.

The exact collection names and field structures depend on the implementation in the source code.

## Security Considerations

- Use Firebase Authentication to verify user identity.
- Apply role-based authorization for administrative operations.
- Configure Firestore Security Rules to protect user data and quiz records.
- Validate submitted answers and scores on a trusted server when appropriate.
- Keep private server credentials out of the repository.
- Restrict access to administrative APIs and sensitive operations.

## Future Improvements

Potential enhancements include:

- Quiz categories and search functionality.
- Leaderboards and performance analytics.
- Randomized questions and answer options.
- Timed quizzes with automatic submission.
- Pagination for quizzes and results.
- Deployment to Vercel.
- More comprehensive automated testing.

## Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork this repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch to GitHub.
5. Open a pull request describing your improvements.

## License

This is an open source project.No licence .You are free to use.