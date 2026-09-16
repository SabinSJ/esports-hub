# EsportsHub

## Overview

EsportsHub is a full-stack esports platform focused on providing a centralized experience for following competitive gaming matches, teams, tournaments and live events.

The project is designed as a modern full-stack application, with a **Next.js / React frontend** and an **ASP.NET Core backend**, with a focus on scalable frontend architecture, real-time data, authentication and domain-oriented application design.

The application is also used as a practical project for exploring modern frontend concepts such as **Micro Frontends, Server-Side Rendering, performance optimization, WebSockets and advanced TypeScript**.

## Goals

The main goals of EsportsHub are:

- Browse and search esports matches, teams and tournaments.
- View detailed information about teams, players, matches and tournaments.
- Follow teams and tournaments through a personalized account.
- Receive real-time updates for live matches.
- Provide authentication and user-specific functionality.
- Allow administrators to manage esports data through CRUD operations.
- Explore a domain-oriented Micro Frontend architecture.
- Demonstrate modern full-stack development practices.

## Architecture

EsportsHub is planned as a domain-oriented full-stack application.

### Frontend

The frontend is built with **Next.js, React and TypeScript**.

The application will use a Shell-based architecture, with shared functionality such as authentication, navigation and user session management kept in the main application.

Selected business domains will be extracted into independent Micro Frontends:

```text
EsportsHub Shell
│
├── Authentication
├── Navigation
├── Teams
├── Standings
│
├── Matches Micro Frontend
│
└── Tournaments Micro Frontend
```

The Matches Micro Frontend is particularly suited for handling real-time match information, while the Tournaments Micro Frontend can encapsulate tournament-specific functionality such as schedules, brackets and tournament standings.

### Backend

The backend is planned to use **C# and ASP.NET Core**.

The backend will expose APIs for the main application domains:

```text
ASP.NET Core
│
├── Authentication
├── Users
├── Teams
├── Players
├── Matches
├── Tournaments
├── Standings
├── Favorites
├── Predictions
└── Notifications
```

**PostgreSQL** will be used as the primary relational database because the application's domain contains many relationships between users, teams, players, tournaments and matches.

## Authentication & User Features

Authentication will allow users to create an account and access personalized functionality.

Authenticated users will be able to:

- Follow/favorite teams.
- Follow/favorite tournaments.
- Receive notifications related to followed teams and matches.
- Participate in virtual match predictions.
- View their own activity and preferences.

An administrator role will provide additional functionality for managing application data, including creating, updating and deleting teams, matches and tournaments.

## Real-Time Updates

Live matches will use real-time communication between the backend and frontend.

The backend will publish events such as:

```text
MatchStarted
ScoreUpdated
MatchFinished
```

These events will be delivered to connected clients using **SignalR / WebSockets**, allowing live match information to update without requiring the user to refresh the page.

The intended flow is:

```text
Match Service
      │
      ▼
   Match Event
      │
      ▼
 SignalR / WebSocket
      │
      ▼
Matches Micro Frontend
      │
      ▼
   Live UI
```

## Main Features

### Matches

- Live matches
- Upcoming matches
- Completed matches
- Match details
- Live score updates

### Teams

- Team listing
- Team details
- Team roster
- Ranking
- Win rate
- Recent results
- Upcoming matches
- Favorite teams

### Tournaments

- Active tournaments
- Upcoming tournaments
- Completed tournaments
- Tournament details
- Tournament schedule
- Tournament bracket
- Tournament standings

### Standings

- Team rankings
- Tournament filtering
- Region filtering

### User Account

- Registration
- Login
- Logout
- Favorites
- Notifications
- Predictions

### Administration

- Team management
- Player management
- Match management
- Tournament management

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- CSS Modules
- Redux Toolkit / Zustand
- SignalR / WebSockets
- Jest / Vitest
- Cypress

### Backend

- C#
- ASP.NET Core
- Entity Framework Core
- PostgreSQL
- SignalR

### Architecture & Infrastructure

- Micro Frontends
- REST APIs
- Real-time communication
- Authentication & Authorization
- Role-Based Access Control (RBAC)

## Roadmap

- [x] Initial Next.js frontend
- [x] Matches page
- [x] Teams page
- [x] Tournaments page
- [x] Standings page
- [x] Match details
- [x] Team details
- [ ] Tournament details and bracket
- [ ] ASP.NET Core backend
- [ ] PostgreSQL database
- [ ] Authentication
- [ ] User favorites
- [ ] Notifications
- [ ] Real-time match updates
- [ ] Micro Frontend extraction
- [ ] Admin dashboard
- [ ] Virtual predictions
- [ ] Performance optimization and Core Web Vitals
