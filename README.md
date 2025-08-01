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

Navigate to [http://localhost:3000](http://localhost:3000)

```

```
