# TaskFlow - Modern Task Management App

A feature-rich task management application built with React and TypeScript that helps you organize, track, and manage your tasks efficiently with an intuitive drag-and-drop interface.

## Features

### 📋 Task Management

- Create, edit, and delete tasks
- Drag-and-drop tasks between status columns (To Do, In Progress, Done)
- Add task details: title, description, status, priority, and due date
- Star/favorite important tasks
- Color-coded priority indicators (Low, Medium, High)

### 📊 Task Organization

- **Kanban Board**: Visual board with three status columns
- **Smart Views**:
  - All Tasks - View everything
  - Important - Starred tasks
  - This Week - Tasks due within the current week
- Real-time task statistics (total tasks, completed, due today)

### ⚡ Due Date Management

- Visual urgency indicators with color coding:
  - Red: Overdue or due today
  - Orange: Due within 3 days
  - Gray: Due later
- Smart date formatting (e.g., "Due tomorrow", "2 days overdue")
- Due dates hidden for completed tasks

### 🎨 User Experience

- Dark mode support
- Drag-and-drop with visual feedback
- Responsive design (desktop and mobile)
- Empty state messages
- Smooth animations and transitions

### 💾 Data Management

- Local storage persistence
- Export tasks to CSV

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit/core
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Type Safety**: TypeScript

## Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd taskflow
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Usage

### Creating a Task

1. Click the "+ Add Task" button
2. Fill in task details:
   - Title (required)
   - Description (optional)
   - Status (To Do, In Progress, Done)
   - Priority (Low, Medium, High)
   - Due date (required)
3. Click "Add Task" to save

### Managing Tasks

- **Move tasks**: Drag and drop between columns to change status
- **Edit task**: Click on any task card to edit details
- **Star task**: Click the star icon to mark as important
- **Delete task**: Open task editor and click "Delete Task"

### Filtering Views

- **All Tasks**: Shows all tasks across all statuses
- **Important**: Shows only starred tasks
- **This Week**: Shows tasks due within the current week

### Exporting Data

1. Click "Download CSV" in the sidebar
2. Tasks will be exported as a CSV file
3. Open in Excel, Google Sheets, or any spreadsheet app

## Project Structure

```
src/
├── components/
│   ├── DraggableTaskCard.tsx
│   ├── TaskBoard.tsx
│   ├── TaskCard.tsx
│   ├── TaskColumn.tsx
│   ├── TaskModal.tsx
│   ├── TaskNavbar.tsx
│   └── TaskSidebar.tsx
├── hooks/
│   └── useTaskActions.ts
├── utils/
│   └── calculateDaysUntilDue.ts
├── App.tsx
└── main.tsx
```

## Type Definitions

```typescript
type Task = {
  id: number;
  title: string;
  description: string;
  status: "to-do" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
  isStarred: boolean;
};
```

## Accessibility Features

- ARIA labels for icon buttons
- Focus management in modals
- Proper semantic HTML
- Color contrast compliant

## Future Enhancements

- Multi-user support with authentication
- Team collaboration features
- Task comments and attachments
- Recurring tasks
- Task tags and categories
- Calendar view
- Mobile app (React Native)
- Real-time synchronization
- Advanced filtering and search
- Task templates
- Time tracking
- Notifications and reminders
- Subtasks and checklists
- Activity history/audit log

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

**Build for production:**

```bash
npm run build
```

**Lint code:**

```bash
npm run lint
```

**Preview production build:**

```bash
npm run preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for learning or personal use.

## Acknowledgments

- Drag and drop powered by [@dnd-kit](https://dndkit.com/)
- Icons by [Lucide](https://lucide.dev/)
- Inspired by Trello, Linear, and Todoist

---

Built with ❤️ using React and TypeScript as a portfolio project to demonstrate modern web development practices, TypeScript proficiency, and UI/UX design skills.
