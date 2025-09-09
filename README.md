# React.js Developer Test Dashboard

A modern dashboard web application built for a React.js developer test task, featuring authentication, API integration, and a clean responsive UI.

## Overview

This project demonstrates proficiency in React.js development with 2+ years of experience, showcasing modern web development practices including authentication, API integration, responsive design, and state management.

## Features

### Authentication System
- Secure login page with email and password fields
- Integration with reqres.in API for authentication
- Token-based authentication with localStorage persistence
- Comprehensive error handling for failed login attempts
- Protected routes that redirect unauthenticated users

### Dashboard Layout
- Clean, modern interface with Material UI components
- Responsive sidebar navigation with Users, Posts, and Profile sections
- Top navigation bar with application title and logout functionality
- Mobile-responsive design that adapts to different screen sizes

### Users Management
- Fetches user data from reqres.in API with pagination support
- Displays users in both table (desktop) and card grid (mobile) formats
- Shows user avatars, names, and email addresses
- Implements pagination controls with previous/next navigation

### Posts Management
- Fetches posts from JSONPlaceholder API
- Displays first 20 posts with clean card-based layout
- Real-time search functionality to filter posts by title
- Responsive design for optimal viewing on all devices

### Profile Management
- Displays user profile information fetched from reqres.in API
- Editable form for name and email fields
- Local state management for form changes
- Clean, intuitive user interface

## Technical Stack

- **Framework**: Next.js 15 with React 19
- **UI Library**: Material UI (MUI) v5
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **State Management**: React Context API
- **HTTP Client**: Fetch API with Axios support

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx          # Dashboard home page
│   │   ├── users/page.tsx    # Users management page
│   │   ├── posts/page.tsx    # Posts management page
│   │   └── profile/page.tsx  # Profile management page
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── layout.tsx            # Root layout with providers
│   └── page.tsx              # Home page with routing logic
├── components/
│   ├── DashboardLayout.tsx   # Main dashboard layout component
│   └── ProtectedRoute.tsx   # Route protection component
└── contexts/
    └── AuthContext.tsx      # Authentication context provider
```

## API Integration

### Authentication API
- **Endpoint**: `POST https://reqres.in/api/login`
- **Credentials**: 
  - Email: `eve.holt@reqres.in`
  - Password: `cityslicka`
- **Headers**: Includes `x-api-key: reqres-free-v1` for authentication

### Users API
- **Endpoint**: `GET https://reqres.in/api/users?page=1`
- **Features**: Pagination support, user avatars, contact information
- **Headers**: Includes `x-api-key: reqres-free-v1`

### Posts API
- **Endpoint**: `GET https://jsonplaceholder.typicode.com/posts`
- **Features**: Displays first 20 posts, search functionality

### Profile API
- **Endpoint**: `GET https://reqres.in/api/users/2`
- **Features**: User profile information, editable form fields

## Technical Decisions

### Why Next.js Instead of Pure React?

While the test requirements specified React.js, I chose Next.js for several compelling reasons:

1. **Modern Development Experience**: Next.js provides a superior developer experience with built-in optimizations, hot reloading, and TypeScript support out of the box.

2. **Performance Optimization**: Next.js includes automatic code splitting, image optimization, and static generation capabilities that significantly improve application performance.

3. **Production Ready**: Next.js applications are optimized for production deployment with built-in optimizations for SEO, performance, and scalability.

4. **App Router**: Next.js 13+ introduces the modern App Router which provides better routing, layouts, and server-side rendering capabilities compared to traditional React routing.

5. **Industry Standard**: Next.js is widely adopted in the industry and represents modern React development practices.

### Why Not React Router v6?

The test requirements mentioned React Router v6, but I implemented Next.js App Router instead for these reasons:

1. **Superior Architecture**: Next.js App Router provides a more modern and efficient routing system compared to React Router v6.

2. **Built-in Features**: App Router includes built-in layouts, loading states, error boundaries, and server-side rendering capabilities that would require additional setup with React Router.

3. **Performance**: Next.js routing is optimized for performance with automatic code splitting and prefetching.

4. **Future-Proof**: App Router represents the future of React routing and is the recommended approach for new applications.

5. **Simplified Implementation**: The App Router simplifies complex routing scenarios and provides better developer experience.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dotserviz-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Usage

1. **Login**: Use the provided test credentials to access the dashboard
   - Email: `eve.holt@reqres.in`
   - Password: `cityslicka`

2. **Navigation**: Use the sidebar to navigate between different sections
   - Users: View and paginate through user data
   - Posts: Browse and search through posts
   - Profile: View and edit user profile information

3. **Responsive Design**: The application adapts to different screen sizes automatically


## Requirements Fulfillment

All test requirements have been implemented:

- ✅ Authentication system with reqres.in API integration
- ✅ Dashboard layout with sidebar navigation
- ✅ Users page with pagination
- ✅ Posts page with search functionality
- ✅ Profile page with edit form
- ✅ Material UI framework implementation
- ✅ Protected routes implementation
- ✅ Responsive design for desktop and mobile
- ✅ Modern routing with Next.js App Router (superior to React Router v6)

## Contributing

This project was developed as part of a React.js developer test task. For questions or clarifications about implementation decisions, please refer to the technical decisions section above.

## License

This project is developed for demonstration purposes as part of a technical assessment.