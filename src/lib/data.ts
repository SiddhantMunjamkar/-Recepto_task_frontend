export type Lead = {
  id: string;
  type: "ReceptoNet" | "OrgNetwork";
  name?: string;
  location: string;
  message: string;
  timestamp: string;
  score: number;
  credits: number;
  isUnlocked: boolean;
  isLiked: boolean | null;
  isDisliked: boolean | null;
  assignedTo: string | null;
  groupName?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  email?:string,
  password: string;
  role: "Admin" | "Member" | "Removed";
  lastActive: string;
  generated: number;
  unlocked: number;
  assigned: number;
};

export function generateInitialLeads(): Lead[] {
  const receptoNetLeads: Lead[] = Array.from({ length: 10 }, (_, i) => ({
    id: `rn-${i + 1}`,
    type: "ReceptoNet",
    name:"Anand kumar",
    location: "Mumbai, India",
    message:
      "Looking for recommendations on product analytics tools for our B2B SaaS platform. Currently evaluating options for a team of 50 people.",
    timestamp: "Found 2 hour ago",
    score: Math.random() > 0.2 ? 99 : Math.floor(Math.random() * 30) + 70,
    credits: Math.floor(Math.random() * 4),
    isUnlocked: false,
    isLiked: null,
    isDisliked: null,
    assignedTo: null,
  }));

  const orgNetworkLeads: Lead[] = Array.from({ length: 15 }, (_, i) => ({
    id: `on-${i + 1}`,
    type: "OrgNetwork",
    name: "Jennifer Markus",
    location: "Mumbai, India",
    message:
      "A team from *company name mentioned* is seeking a highly motivated Business Development Executive to outreach and secure business partnerships.",
    timestamp: i % 2 === 0 ? "Today" : "3 hours ago",
    score: Math.floor(Math.random() * 15) + 70,
    credits: Math.floor(Math.random() * 4),
    isUnlocked: false,
    isLiked: null,
    isDisliked: null,
    assignedTo: null,
    groupName: "Group name",
  }));

  return [...receptoNetLeads, ...orgNetworkLeads];
}

export function generateInitialTeamMembers(): TeamMember[] {
  return [
    {
      id: "1",
      name: "Olivia Rhye",
      role: "Admin",
      password: "Olivia",
      lastActive: "2min ago",
      generated: 123,
      unlocked: 12,
      assigned: 40,
    },
    {
      id: "2",
      name: "Olivia Rhye", 
      password: "Olivia",
      role: "Removed",
      lastActive: "2min ago",
      generated: 23,
      unlocked: 23,
      assigned: 25,
    },
    {
      id: "3",
      name: "Olivia Rhye",
      role: "Member",
      password: "Olivia",
      lastActive: "2min ago",
      generated: 56,
      unlocked: 56,
      assigned: 15,
    },
    {
      id: "4",
      name: "Olivia Rhye",
      password: "Olivia",
      role: "Admin",
      lastActive: "2min ago",
      generated: 12,
      unlocked: 12,
      assigned: 10,
    },
    {
      id: "5",
      name: "Olivia Rhye",
      password: "Olivia",
      role: "Member",
      lastActive: "2min ago",
      generated: 123,
      unlocked: 123,
      assigned: 5,
    },
  ];
}

export function generateChartData() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];

  // Generate random data for ReceptoNet leads
  const receptoNetData = months.map((month) => {
    const value = 200 + Math.floor(Math.random() * 200);
    return { month, value };
  });

  // Generate random data for Org Network leads
  const orgNetworkData = months.map((month) => {
    const value = 200 + Math.floor(Math.random() * 200);
    return { month, value };
  });

  return {
    receptoNetData,
    orgNetworkData,
  };
}
