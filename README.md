<<<<<<< HEAD
# Personalized Content Dashboard

A Next.js, TypeScript, Redux Toolkit dashboard for tracking personalized news, TV recommendations, and social posts in one interactive interface.

## Features

- Unified feed for Mediastack news, TVMaze shows, and DummyJSON social posts
- User preference settings for favorite content categories
- Debounced search across all content types
- Favorites section persisted in local storage
- Dark mode toggle persisted in local storage
- Trending section from the combined feed
- Drag-and-drop content reordering with React DnD
- Loading, empty, and partial-error states
- Responsive sidebar, mobile section tabs, and card-based UI

## APIs

```env
NEXT_PUBLIC_MEDIASTACK_API_KEY=5157e116241d8d48209d9f901fca0f14
NEXT_PUBLIC_MEDIASTACK_BASE_URL=https://api.mediastack.com/v1
NEXT_PUBLIC_TVMAZE_BASE_URL=https://api.tvmaze.com
NEXT_PUBLIC_DUMMYJSON_BASE_URL=https://dummyjson.com
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local` from `.env.example` and add the Mediastack key.

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Project Structure

```txt
src
├── app
├── components
│   ├── cards
│   ├── common
│   ├── dashboard
│   ├── layout
│   └── ui
├── constants
├── hooks
├── redux
│   ├── slices
│   ├── provider.tsx
│   └── store.ts
├── services
├── styles
├── types
└── utils
```

## Notes

The dashboard uses Redux Toolkit thunks for API calls and local storage persistence for preferences, favorites, and theme. If one API source fails, the UI keeps rendering content from the remaining sources and shows a partial sync warning.
=======
# SED_TASK
>>>>>>> 4161473dcb728645c0a2d342f81e38e3ce13f56c
