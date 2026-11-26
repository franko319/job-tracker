# Job Application Tracker

A small React app to track job applications: company, role, link, status and follow-up date.

Live demo: https://franko319.github.io/job-tracker/

## Repo layout

- `index.html` at the root is the built app that GitHub Pages serves (one file).
- `app/` is the React source (Vite + React).

## Run it locally

```bash
cd app
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

## Build and update the live page

```bash
cd app
npm run build -- --base=./
```

Then inline or copy the output in `app/dist` and replace the root `index.html`. Pages redeploys from `main` automatically.

## Notes

- Data is saved in the browser (localStorage), so each browser has its own list. A backend is the next step.
- See `app/WALKTHROUGH-AR.md` for an Arabic walkthrough of the code.
