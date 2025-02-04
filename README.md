# GitHub Analytics

A web app that allows users to explore GitHub profiles, repositories, and trending projects. It provides visual insights on user repositories, contributions, and breakdowns of languages used per user.

## Features

- **User Profile Lookup**: Fetches and displays GitHub user details and repositories.
- **Repository Insights**: Shows repository details, recent commits, and contributors.
- **Trending Repositories**: Displays popular repositories on GitHub.
- **Visual Analytics**: Generates pie charts for:
  - Language distribution across a user's repositories.
  - Contribution breakdown per repository.

## Tech Stack

### Frontend
- React
- React Router
- Bootstrap Icons

### Backend
- Node.js
- Express
- Octokit (GitHub API)
- Helmet (Security)
- CORS

## Installation & Setup

### Prerequisites
- Node.js (v16 or later recommended)
- A GitHub personal access token

### Clone the Repository
```sh
git clone https://github.com/your-username/github-analytics.git
cd github-analytics