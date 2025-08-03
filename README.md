# Job Listing Application with Bookmark Functionality

A modern, full-featured job listing application built with Next.js, NextAuth, Redux Toolkit, and Tailwind CSS. Features comprehensive authentication, job browsing, and bookmark functionality with complete testing coverage.

## Features

- **Authentication System**: Secure login/signup with NextAuth.js and JWT
- **Job Listing & Management**: Browse, search, and view detailed job postings from a custom REST API
- **Bookmark Functionality**: Save and manage favorite jobs
- **Testing Coverage**:
  - Unit Tests: Jest-based component and functionality testing
  - E2E Tests: Cypress end-to-end testing for complete user workflows
  - Authentication Testing: Comprehensive auth flow testing
  - Bookmark Testing: Complete bookmark functionality testing

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js with JWT
- **State Management**: Redux Toolkit with RTK Query
- **Forms**: React Hook Form
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Testing**: Jest + Cypress
- **Icons**: Lucide React
- **Backend API**: Custom REST API ([https://akil-backend.onrender.com/](https://akil-backend.onrender.com/))

## 📦 Installation and Setup

### Clone the repository

```sh
git clone https://github.com/JosiSol/job_listing_app_bookmark
cd job-listing-app
```

### Install dependencies

```sh
npm install
```

### Environment Setup

Create a `.env.local` file with required environment variables:

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### Run the development server

```sh
npm run dev
```

### Open your browser

Navigate to ``` (http://localhost:3000) ```

## 🛠️ API Integration

### Endpoints Used

- **Base URL:** `https://akil-backend.onrender.com/`
- **Authentication:** JWT Bearer token in Authorization header

### Job Endpoints

- `GET /opportunities/search` – Get all job listings
- `GET /opportunities/:id` – Get specific job details

### Bookmark Endpoints

- `GET /bookmarks` – Get user's bookmarked jobs
- `POST /bookmarks/:eventID` – Bookmark a job (empty body)
- `DELETE /bookmarks/:eventID` – Remove bookmark 


## 📸 Preview

Home Page with Bookmark Functionality
<img width="1440" height="775" alt="Screenshot 2025-08-01 at 10 41 01 at night" src="https://github.com/user-attachments/assets/c0f39e92-d26e-48b4-b5a9-59875bf4fc10" />

Bookmarks Page
<img width="1440" height="772" alt="Screenshot 2025-08-01 at 10 41 22 at night" src="https://github.com/user-attachments/assets/e19581d2-d9c7-4488-91a1-997ab08aea3e" />

<img width="1440" height="772" alt="Screenshot 2025-08-01 at 10 41 58 at night" src="https://github.com/user-attachments/assets/a7ba5a6b-a8de-4b18-a78a-e775a6f92d81" />

Jest Test  
<img width="487" height="119" alt="Screenshot 2025-08-01 at 11 24 43 at night" src="https://github.com/user-attachments/assets/637e9771-c243-464f-8333-60118373d5ba" />


Cypress (End to End) Tests
<img width="1217" height="675" alt="Screenshot 2025-08-01 at 8 39 06 in the evening" src="https://github.com/user-attachments/assets/0eac7dea-1b9f-41ec-981a-72e2e283e4a0" />





