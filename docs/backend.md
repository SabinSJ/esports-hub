# EsportsHub Backend

## Overview

The EsportsHub backend is built with **C# and ASP.NET Core** and provides the server-side functionality for the EsportsHub application.

The backend is responsible for:

- Exposing REST APIs
- Managing application data
- Communicating with the PostgreSQL database
- Handling authentication and authorization
- Managing users, teams, players, matches and tournaments
- Providing real-time updates for live matches
- Supporting administrative operations

The backend is designed to provide a clear separation between the frontend application and the business logic and data layer.

---

## Technology Stack

The backend uses the following technologies:

- **C#**
- **ASP.NET Core**
- **Entity Framework Core**
- **PostgreSQL**
- **Npgsql**
- **SignalR**
- **REST APIs**

Additional technologies may be introduced as the application evolves.

---

## Project Structure

The backend follows a domain-oriented structure.

```text
backend/
├── Controllers/
├── Data/
├── Entities/
├── Services/
├── Program.cs
├── appsettings.json
└── backend.csproj
```

### Controllers

Controllers expose HTTP endpoints that can be consumed by the frontend application.

For example:

```text
GET    /api/teams
GET    /api/teams/{id}
POST   /api/teams
PUT    /api/teams/{id}
DELETE /api/teams/{id}
```

Controllers should primarily be responsible for handling HTTP requests and responses. Business logic should be kept in the appropriate service layer rather than directly inside controllers.

### Entities

Entities represent the main objects in the application domain.

Examples include:

- User
- Team
- Player
- Tournament
- Match

These entities are mapped to database tables using Entity Framework Core.

### Data

The `Data` directory contains the database-related configuration.

The main component is the `AppDbContext`, which provides the connection between the application and PostgreSQL through Entity Framework Core.

### Services

Services contain application and business logic that should not be directly implemented inside controllers.

This helps keep the API layer thin and makes the business logic easier to test and maintain.

---

# Database

## PostgreSQL

PostgreSQL is used as the primary database for EsportsHub.

The application contains many relationships between different entities:

```text
User
 ├── Favorites
 └── Predictions

Team
 ├── Players
 ├── Matches
 └── Tournaments

Tournament
 ├── Teams
 ├── Matches
 └── Standings

Match
 ├── Teams
 └── Tournament
```

Because the application contains a highly relational domain, PostgreSQL is used instead of a document-oriented database.

---

## Entity Framework Core

Entity Framework Core is used as the ORM (Object-Relational Mapper).

It allows the application to work with the PostgreSQL database using C# entities instead of manually writing SQL for every operation.

The general flow is:

```text
C# Entity
    ↓
Entity Framework Core
    ↓
Npgsql Provider
    ↓
PostgreSQL
```

---

# Configuration

ASP.NET Core configuration is used to manage application settings.

The `appsettings.json` file contains non-sensitive configuration:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": ""
  }
}
```

Sensitive values such as database passwords should not be committed to source control.

For local development, **.NET User Secrets** can be used to store the database connection string.

Example:

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=EsportsHub;Username=postgres;Password=..."
```

The application retrieves the configured connection string through ASP.NET Core's configuration system:

```csharp
var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection");
```

This allows the same application code to work with different configuration values across development, testing and production environments.

---

# API Architecture

The backend exposes REST APIs that are consumed by the Next.js frontend.

The general request flow is:

```text
Next.js Frontend
       ↓
    HTTP Request
       ↓
    Controller
       ↓
     Service
       ↓
   Entity Framework Core
       ↓
    PostgreSQL
       ↓
   Entity Framework Core
       ↓
     Service
       ↓
    Controller
       ↓
    HTTP Response
       ↓
Next.js Frontend
```

This separation helps keep responsibilities clear between the API layer, business logic and data access.

---

# Authentication and Authorization

Authentication will allow users to create accounts and securely access personalized functionality.

Authenticated users will be able to:

- Manage their profile
- Follow teams
- Follow tournaments
- Receive notifications
- Participate in virtual predictions

Authorization will determine what actions a user is allowed to perform.

The application will use **Role-Based Access Control (RBAC)** for administrative functionality.

For example:

```text
User
 ├── View data
 ├── Manage favorites
 └── Make predictions

Admin
 ├── View data
 ├── Manage teams
 ├── Manage players
 ├── Manage matches
 └── Manage tournaments
```

---

# Real-Time Communication

Live matches require information to be updated without repeatedly refreshing the page.

The backend will use **SignalR** to provide real-time communication between the server and connected clients.

Examples of events include:

```text
MatchStarted
ScoreUpdated
MatchFinished
```

The intended flow is:

```text
Match Service
      ↓
  Match Event
      ↓
    SignalR
      ↓
Connected Clients
      ↓
Matches Micro Frontend
      ↓
    Live UI
```

This allows users to see live score and match-state changes as they occur.

---

# Development Approach

The backend is being developed incrementally rather than implementing the entire architecture at once.

The planned development order is:

1. ASP.NET Core project foundation
2. PostgreSQL configuration
3. Entity Framework Core setup
4. Database context
5. Domain entities
6. REST APIs
7. Authentication and authorization
8. User-specific functionality
9. SignalR integration
10. Real-time match updates
11. Notifications
12. Administrative CRUD operations

Each stage is intended to establish a working foundation for the next stage.

---

# Architecture Goals

The backend architecture focuses on:

- Clear separation of responsibilities
- Maintainable code structure
- Strong typing through C#
- Relational data consistency
- Testability
- Secure configuration management
- Scalable API design
- Real-time communication
- Integration with the frontend Micro Frontend architecture

The goal is not to introduce unnecessary infrastructure, but to use additional components when they provide a clear benefit to the application.
