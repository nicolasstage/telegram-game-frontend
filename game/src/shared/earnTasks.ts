import { Img } from "@/utilitiy/images";

type RewardType = "CNTP" | "KEY" | "TICKET";

export interface Quiz {
  title: string;
  caption: string;
  questions: QuizQuestion[];
  reward: number;
}

export interface QuizQuestion {
  quest: string;
  options: string[];
  answerIndex: number;
  timer: number;
}

export interface TaskCategory {
  title: string;
  icon?: string;
  tasks: Task[];
  reward?: number;
  completed?: boolean;
}

export interface Day {
  day: number;
  reward: number;
  type: RewardType;
}

export interface Task {
  title: string;
  completed?: boolean;
  logo?: {
    uri?: string;
    color?: string;
  };
  resource?: string;
  caption?: string;
  referral?: boolean;
  extraInstruction?: string;
  cta?: string;
  quiz?: boolean;
  claim?: boolean;
  active: boolean;
  comingSoon?: boolean;
  reward?: number;
}

export const dailyQuiz: Quiz = {
  reward: 1,
  title: "What is a Wallet?",
  caption:
    "A digital wallet is a software application that allows you to store, send, and receive cryptocurrencies. It interacts with blockchain networks and manages your private and public keys, which are crucial for conducting transactions.",
  questions: [
    {
      quest: "What is the primary function of a cryptocurrency wallet?",
      options: [
        "To store physical coins",
        "To securely store and manage your cryptocurrencies and keys",
        "To make online purchases only",
      ],
      answerIndex: 1,
      timer: 15,
    },
  ],
};

export const dailyClaims: Day[] = [
  {
    day: 1,
    reward: 1,
    type: "TICKET",
  },
  {
    day: 2,
    reward: 1,
    type: "TICKET",
  },
  {
    day: 3,
    reward: 1,
    type: "TICKET",
  },
  {
    day: 4,
    reward: 1,
    type: "TICKET",
  },
  {
    day: 5,
    reward: 1,
    type: "TICKET",
  },
  {
    day: 6,
    reward: 1,
    type: "TICKET",
  },
  {
    day: 7,
    reward: 1,
    type: "KEY",
  },
];

export const taskCategories: TaskCategory[] = [
  {
    title: "Send Invitation",
    icon: Img.TaskInvitation,
    completed: false,
    tasks: [
      {
        title: "Invite Friends",
        completed: false,
        caption:
          "Share your referral link and earn CNTP when your friends are mining!",
        referral: true,
        active: true,
      },
    ],
  },
  {
    title: "Daily Rewards",
    icon: Img.TaskDaily,
    tasks: [
      {
        title: "Daily Claim",
        claim: true,
        logo: {
          uri: Img.DailyClaim,
        },
        caption:
          "Claim daily rewards and earn Tickets by logging in each day without skipping!",
        cta: "Claim today’s reward",
        active: true,
        comingSoon: true,
      },
    ],
  },
  {
    title: "Join Us",
    icon: Img.TaskJoin,
    reward: 1,
    completed: false,
    tasks: [
      {
        title: "Follow Us on X",
        completed: false,
        logo: {
          uri: Img.TwitterX,
          color: "#000000",
        },
        caption:
          "Follow Us on X, like and share our pinned post, earn Tickets just for staying connected!",
        extraInstruction:
          "*You have 2 minutes to do it so we can confirm that the task has been completed",
        cta: "Open X",
        resource: "x.com/conet_network?lang=en",
        active: true,
      },
      {
        title: "Join our Community",
        completed: false,
        logo: {
          uri: Img.Telegram,
          color: "#66ACDD",
        },
        caption:
          "Join our Community on Telegram and earn Tickets just for staying connected!",
        cta: "Open Telegram",
        resource: "https://t.me/conet_network",
        active: true,
      },
      {
        title: "Join our Server",
        completed: false,
        logo: {
          uri: Img.Discord,
          color: "#5865F2",
        },
        caption:
          "Join our Server on Discord and earn Tickets just for staying connected!",
        cta: "Open Discord",
        resource: "https://discord.gg/JrpMBFkewd",
        active: true,
        comingSoon: true,
      },
    ],
  },
  {
    title: "Daily Tasks",
    icon: Img.TaskDaily,
    reward: 1,
    completed: false,
    tasks: [
      {
        title: "Quiz",
        completed: false,
        logo: {
          uri: Img.TaskQuiz,
        },
        quiz: true,
        active: true,
        comingSoon: true,
      },
      {
        title: "Interact with Us on X",
        completed: false,
        logo: {
          uri: Img.TwitterX,
          color: "#000000",
        },
        active: false,
        comingSoon: true,
      },
    ],
  },
  {
    title: "Extras",
    icon: Img.TaskExtras,
    reward: 1,
    completed: false,
    tasks: [
      {
        title: "Follow CoNET Partner",
        completed: true,
        logo: {
          uri: Img.CoNETPartner,
          color: "#CC00D0",
        },
        active: true,
        comingSoon: true,
      },
      {
        title: "Join Collab Community",
        completed: false,
        logo: {
          color: "#CC00D0",
        },
        active: false,
        comingSoon: true,
      },
      {
        title: "Try Collab Mini App",
        completed: false,
        logo: {
          color: "#CC00D0",
        },
        active: false,
        comingSoon: true,
      },
    ],
  },
  {
    title: "Finished Tasks",
    icon: Img.TaskFinished,
    tasks: [
      {
        title: "Daily Task",
        completed: true,
        logo: {
          uri: Img.CommonTask,
        },
        active: true,
        comingSoon: true,
      },
      {
        title: "Watch Video",
        completed: true,
        logo: {
          uri: Img.WatchVideo,
        },
        active: false,
        comingSoon: true,
      },
    ],
  },
];
