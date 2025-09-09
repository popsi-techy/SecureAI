# Plugin Security Scanner

## 1. Vision
A clean, aesthetic, and easy-to-use web application that empowers developers to quickly assess the security posture of their plugins. The app will accept a plugin via a Git repository URL or a ZIP file upload, perform automated security scans, and present the findings with clear severity levels and actionable, AI-powered suggestions for fixes.

## 2. User Stories
- **As a developer, I want to** sign up and log in to the application to keep my scan history private.
- **As a developer, I want to** submit a plugin for scanning by providing a public Git repository URL.
- **As a developer, I want to** upload a plugin as a `.zip` file for scanning.
- **As a developer, I want to** see a clear list of security vulnerabilities found in my plugin.
- **As a developer, I want to** understand the severity of each vulnerability (e.g., Critical, High, Medium, Low).
- **As a developer, I want to** receive a clear explanation and a suggested code fix for each vulnerability.
- **As a developer, I want to** view a history of my previous scans on my dashboard.

## 3. Features
- User Authentication (Firebase)
- Plugin submission via URL or ZIP upload
- Backend processing and SAST (Static Application Security Testing) scanning
- AI-powered analysis for severity, explanation, and fixes (Google Gemini API)
- Clean results dashboard
- User-specific scan history

## 4. Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS (via Shadcn/UI)
- **Backend:** Go (using the Gin framework)
- **Database & Storage:** Firestore & Firebase Cloud Storage
- **Authentication:** Firebase Authentication
- **AI:** Google Gemini API
- **Testing:** Playwright for E2E tests