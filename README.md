# Kimaya Deshpande Portfolio

Built with React + Vite + Framer Motion.

## Visit website to view portfolio
https://kimaya-k.github.io/portfolio/


## Deploy to GitHub Pages
My process of deployment:
The repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that builds and deploys the site automatically on every push to `main`.
Steps:
1. Push this project to a GitHub repo.
2. In the repo, go to **Settings -> Pages**.
3. Under **Build and deployment -> Source**, choose **GitHub Actions**.
4. Push to `main` (or re-run the workflow from the Actions tab).

No manual build step or `gh-pages` package needed - the workflow handles it.

## Content

All portfolio content (experience, projects, skills, links) lives in `src/data.js` -
edits are made to this file to update copy without touching any component.

## Structure

- `src/components/` - one file per section (Main, Experience, Projects, Courses, Volunteering, Tech Stack, Contact)
- `src/data.js` - all content
- `src/index.css` - design tokens (colors, type, spacing)
- `src/components.css` - section styles
