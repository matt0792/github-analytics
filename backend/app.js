import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Octokit } from "@octokit/rest";
import helmet from "helmet";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// initialize octokit
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// route to fetch user data and repos
app.get("/api/github/user/:username", async (req, res) => {
  const { username } = req.params;
  console.log(`GET user profile: ${username}`);

  try {
    // fetch user details
    const { data: userProfile } = await octokit.users.getByUsername({
      username,
    });

    // fetch repos (sorting and pagination)
    const { data: userRepos } = await octokit.repos.listForUser({
      username,
      sort: "owner",
      per_page: 100,
    });

    // forked vs. original repositories
    const forkedRepos = userRepos.filter((repo) => repo.fork).length;
    const originalRepos = userRepos.length - forkedRepos;

    const formattedRepos = userRepos.map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updated_at: repo.updated_at,
      isFork: repo.fork,
    }));

    res.json({
      profile: userProfile,
      repos: formattedRepos,
      repoStats: { forked: forkedRepos, original: originalRepos },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching GitHub user data" });
  }
});

app.get("/api/github/repo/:owner/:repo", async (req, res) => {
  const { owner, repo } = req.params;
  console.log(`GET repo: ${owner} - ${repo}`);

  try {
    // fetch repo details
    const { data: repoData } = await octokit.repos.get({
      owner,
      repo,
    });

    // fetch latest 5 commits
    const { data: commitsData } = await octokit.repos.listCommits({
      owner,
      repo,
      per_page: 10,
    });

    // fetch contributors
    const { data: contributorsData } = await octokit.repos.listContributors({
      owner,
      repo,
    });

    // extract commit data
    const commits = commitsData.map((commit) => ({
      message: commit.commit.message,
      date: commit.commit.author.date,
      name: commit.commit.author.name,
    }));

    const responseData = {
      repo: repoData,
      recentCommits: commits,
      contributors: contributorsData,
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching repo data", error);
    res.status(500).json({ error: "Error fetching repo data" });
  }
});

// fetch 'trending' repos
app.get("/api/github/trending-repos", async (req, res) => {
  console.log("GET trending repositories");

  try {
    const { data } = await octokit.search.repos({
      q: "stars:>1",
      sort: "stars",
      order: "desc",
      per_page: 10,
    });

    const trendingRepos = data.items.map((repo) => ({
      name: repo.name,
      description: repo.description,
      owner: repo.owner.login,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updated_at: repo.updated_at,
    }));

    res.json(trendingRepos);
  } catch (error) {
    console.error("Error fetching trending repositories", error);
    res.status(500).json({ error: "Error fetching trending repositories" });
  }
});

app.get("/test", (req, res) => {
  res.json("Hello world");
});

export default app;
