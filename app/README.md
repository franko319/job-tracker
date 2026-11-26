# Job Application Tracker

A simple, clean React app to track job applications: add, edit, delete, and filter
applications by status. Data is saved in the browser's localStorage, so nothing is
lost on refresh. Built with Vite + React, no backend needed.

## Features

- Add applications with company, role, job link, status, and follow-up date
- Edit and delete existing entries
- Filter the list by status (Applied / Interviewing / Offer / Rejected)
- Data persists in localStorage
- Responsive layout, works on mobile
- RTL-friendly: Arabic text in company/role fields displays correctly (`dir="auto"`
  and CSS logical properties)

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

The static site is generated in `dist/`.

## Project structure

| File | What it does |
| --- | --- |
| `src/main.jsx` | Entry point, renders `<App />` into the page |
| `src/App.jsx` | Owns the state: the applications list, the filter, edit mode, localStorage sync |
| `src/components/ApplicationForm.jsx` | The add/edit form (controlled inputs) |
| `src/components/ApplicationList.jsx` | Maps the filtered list to cards, shows the empty state |
| `src/components/ApplicationCard.jsx` | One application card with status badge and Edit/Delete buttons |
| `src/App.css` | All styling, including the responsive layout |

## Ideas for next steps

- Connect a backend and a real database instead of localStorage
- Add sorting (by follow-up date, by date added)
- Add search by company name
- Add login so data syncs across devices
