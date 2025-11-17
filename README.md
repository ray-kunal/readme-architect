# Calendar View — Interactive UI Component

A fully interactive, accessible, and high-performance Calendar component built using React, TypeScript, Tailwind CSS, and Storybook, following the required assignment architecture.

## Live Storybook

[Add your deployed Storybook URL here]

## Installation & Setup

```bash
npm install
npm run dev
npm run storybook
```

## Project Architecture

calendar-component/
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── .storybook/
│ ├── main.ts
│ └── preview.ts
└── src/
├── components/
│ ├── Calendar/
│ │ ├── CalendarView.tsx
│ │ ├── CalendarView.types.ts
│ │ ├── CalendarView.stories.tsx
│ │ ├── MonthView.tsx
│ │ ├── WeekView.tsx
│ │ ├── CalendarCell.tsx
│ │ └── EventModal.tsx
│ └── primitives/
│ ├── Button.tsx
│ ├── Modal.tsx
│ └── Select.tsx
├── hooks/
│ ├── useCalendar.ts
│ └── useEventManager.ts
├── utils/
│ ├── date.utils.ts
│ └── event.utils.ts
└── styles/
└── globals.css

## Features

- Month & Week Views
- Add / Edit / Delete Events
- Event Modal with validation
- Responsive design
- Keyboard accessibility (WCAG 2.1 AA)
