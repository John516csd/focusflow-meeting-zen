
export interface AgendaItem {
  id: string;
  title: string;
  startTime: string; // format: "HH:MM"
  endTime: string; // format: "HH:MM"
  duration: number; // in minutes
  owner: {
    name: string;
    initials: string;
    avatarColor: string;
  };
  isCompleted: boolean;
}

export const initialAgendaItems: AgendaItem[] = [
  {
    id: "1",
    title: "Welcome & Introduction",
    startTime: "10:00",
    endTime: "10:10",
    duration: 10,
    owner: {
      name: "Alex Johnson",
      initials: "AJ",
      avatarColor: "#6366f1", // indigo
    },
    isCompleted: false,
  },
  {
    id: "2",
    title: "Project Status Update",
    startTime: "10:10",
    endTime: "10:25",
    duration: 15,
    owner: {
      name: "Maria Garcia",
      initials: "MG",
      avatarColor: "#ec4899", // pink
    },
    isCompleted: false,
  },
  {
    id: "3",
    title: "Quarterly Roadmap Review",
    startTime: "10:25",
    endTime: "10:40",
    duration: 15,
    owner: {
      name: "David Wilson",
      initials: "DW",
      avatarColor: "#14b8a6", // teal
    },
    isCompleted: false,
  },
  {
    id: "4",
    title: "Budget Discussion",
    startTime: "10:40",
    endTime: "11:00",
    duration: 20,
    owner: {
      name: "Samantha King",
      initials: "SK",
      avatarColor: "#f59e0b", // amber
    },
    isCompleted: false,
  },
  {
    id: "5",
    title: "Q&A Session",
    startTime: "11:00",
    endTime: "11:10",
    duration: 10,
    owner: {
      name: "James Brown",
      initials: "JB",
      avatarColor: "#8b5cf6", // violet
    },
    isCompleted: false,
  },
  {
    id: "6",
    title: "Action Items & Next Steps",
    startTime: "11:10",
    endTime: "11:20",
    duration: 10,
    owner: {
      name: "Lisa Chen",
      initials: "LC",
      avatarColor: "#ef4444", // red
    },
    isCompleted: false,
  },
];
