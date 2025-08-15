# VertoDesk

**Transform Your Business Management**

VertoDesk is a comprehensive business management dashboard that transforms how teams organize, track, and execute their work. Built with modern web technologies, it features advanced task management, calendar scheduling, contact management, and business analytics - all designed to streamline your workflow and boost productivity.

_From "Verto" (Latin for transform) - VertoDesk transforms traditional business management into an intuitive, powerful experience._

## Features

### 📊 Dashboard Overview

- Real-time business metrics and KPIs
- Revenue tracking with interactive charts
- Customer acquisition analytics
- Monthly recurring revenue monitoring
- Expense tracking and reporting

### ✅ Task Management

- Kanban-style board with drag-and-drop functionality
- Multiple view modes (Board and List views)
- Task prioritization (High, Medium, Low)
- Team member assignment with avatars
- Due date tracking and calendar integration
- Real-time task search and filtering

### 📅 Calendar & Scheduling

- Multiple calendar views (Month, Week, Day)
- Event creation and management
- Color-coded event categories
- Time slot management
- Meeting scheduling with guest management
- Event descriptions and meeting links

### 👥 Contact Management

- Comprehensive contact database
- Contact creation and editing
- Search and filter capabilities
- Integration with tasks and calendar events

### 🔔 Notifications & Inbox

- Real-time notification system
- Inbox management for important updates
- Badge counters for unread items
- Quick access from sidebar

### 🎨 Modern UI/UX

- Dark/Light theme toggle
- Responsive design for all devices
- Collapsible sidebar navigation
- Modern glassmorphism design elements
- Smooth animations and transitions

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Drag & Drop**: @dnd-kit
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme Management**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+ and npm (recommended: install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build for development environment
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── dashboard/      # Dashboard-specific components
│   └── *.tsx           # Feature components (sheets, popups, etc.)
├── pages/              # Route components
│   ├── Index.tsx       # Dashboard home page
│   ├── Tasks.tsx       # Task management
│   ├── Calendar.tsx    # Calendar and events
│   ├── Contacts.tsx    # Contact management
│   └── *.tsx           # Other pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## Key Features Breakdown

### Dashboard Analytics

- Customer metrics with growth indicators
- Revenue visualization with interactive charts
- Monthly recurring revenue tracking
- Expense monitoring with trend analysis

### Task Management System

- Drag-and-drop Kanban board
- Task status tracking (To Do, In Progress, Under Review, Completed)
- Priority levels with color coding
- Team member assignments
- Due date management
- Search and filter functionality

### Calendar Integration

- Multi-view calendar (Month/Week/Day)
- Event creation with detailed information
- Color-coded event categories
- Time slot management
- Guest management for meetings

### Contact Management

- Comprehensive contact profiles
- Search and filter capabilities
- Integration with tasks and calendar
- Contact creation and editing workflows

## Development

### Adding New Features

1. Create components in the appropriate directory under `src/components/`
2. Add new pages to `src/pages/` and update routing in `App.tsx`
3. Use the existing design system and shadcn/ui components for consistency
4. Follow TypeScript best practices and include proper type definitions

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the established design system
- Maintain responsive design principles
- Use the theme system for dark/light mode compatibility

### Other Platforms

The application can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is under the MIT License.
