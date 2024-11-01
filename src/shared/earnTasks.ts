import { Img } from "@/utilitiy/images";
import { PartnerLogos } from "@/utilitiy/partnerLogos";

type RewardType = "CNTP" | "Key" | "Ticket";
type TaskType = "social" | "partner";

export enum Partners {
  mhaya = "4",
  stabilityAi = "5",
  bearfi = "6",
  tapGear = "7",
  hybrid = "8",
  habit = "9",
  frogs = "10",
  cognixphere = "11",
}

export interface Quiz {
  title: string;
  caption: string;
  questions: QuizQuestion[];
  reward: number;
  rewardAsset?: RewardType;
}

export interface QuizQuestion {
  quest: string;
  options: string[];
  answerIndex: number;
  timer: number;
}

export interface TaskCategory {
  categoryId: string;
  title: string;
  icon?: string;
  tasks: Task[];
  reward?: number;
  rewardAsset?: RewardType;
  completed?: boolean;
}

export interface Task {
  taskId: string;
  title: string;
  type?: TaskType;
  completed?: boolean;
  logo?: {
    uri?: string;
    color?: string;
    size?: number;
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
  rewardAsset?: RewardType;
}

export const dailyQuiz: Quiz = {
  reward: 1,
  rewardAsset: "Ticket",
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

export const taskCategories: TaskCategory[] = [
  {
    categoryId: "referral",
    title: "Send Invitation",
    icon: Img.TaskInvitation,
    completed: false,
    tasks: [
      {
        taskId: "referral_task-1",
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
    categoryId: "daily-rewards",
    title: "Daily Rewards",
    icon: Img.TaskDaily,
    tasks: [
      {
        taskId: "daily-rewards_task-1",
        title: "Daily Claim",
        claim: true,
        caption:
          "Claim daily rewards and earn Tickets by logging in each day without skipping!",
        extraInstruction:
          "*Complete at least one social task to be able to claim.",
        logo: {
          uri: Img.DailyClaim,
        },
        cta: "Claim today's reward",
        active: true,
        comingSoon: false,
      },
    ],
  },
  {
    categoryId: "social",
    title: "Join Us",
    icon: Img.TaskJoin,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "social_task-1",
        title: "Follow Us on X",
        type: "social",
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
        resource: "https://x.com/conet_network?lang=en",
        active: true,
      },
      {
        taskId: "social_task-2",
        title: "Join our Community",
        type: "social",
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
        taskId: "social_task-3",
        title: "Join our Server",
        type: "social",
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
    categoryId: "daily-tasks",
    title: "Daily Tasks",
    icon: Img.TaskDaily,
    completed: false,
    tasks: [
      {
        taskId: "daily-tasks_task-1",
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
        taskId: "daily-tasks_task-2",
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
    categoryId: "partners",
    title: "Partners",
    icon: Img.TaskExtras,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "partners_task-1",
        title: "TITLE HERE",
        completed: false,
        caption: "CAPTION HERE",
        extraInstruction: "EXTRA INSTRUCTION HERE",
        logo: {
          uri: Img.CoNETPartner,
          size: 100,
        },
        active: false,
        comingSoon: false,
      },
    ],
  },
  {
    categoryId: "mhaya",
    title: "Mhaya",
    icon: Img.TaskExtras,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "mhaya_task-1",
        title: "Join Mhaya Bot",
        type: "partner",
        completed: false,
        caption: "Monopoly Airdrop USDT",
        extraInstruction: "Ends on 10/03/2022 11:59 PM",
        reward: 1,
        rewardAsset: "Ticket",
        resource: "https://t.me/mhaya_bot?start=28ABuxL1YEC",
        logo: {
          uri: PartnerLogos.MhayaLogo,
          size: 100,
        },
        active: false,
        comingSoon: false,
        cta: "Open Telegram",
      },
    ],
  },
  {
    categoryId: "stability-world-ai",
    title: "Stability World AI",
    icon: Img.TaskExtras,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "stability-world-ai_task-1",
        title: "Follow Stability World AI",
        type: "partner",
        completed: false,
        caption:
          "🎨 Stability World AI: Your One-Stop Generative AI Platform for Web3 Users",
        extraInstruction: "Ends on 10/03/2022 11:59 PM",
        resource: "https://x.com/StabilityW_AI",
        logo: {
          uri: PartnerLogos.StabilityAiLogo,
          size: 100,
        },
        active: false,
        comingSoon: false,
        cta: "Open X",
      },
      {
        taskId: "stability-world-ai_task-2",
        title: "Join Stability World AI Bot",
        type: "partner",
        completed: false,
        caption:
          "🎨 Stability World AI: Your One-Stop Generative AI Platform for Web3 Users",
        extraInstruction: "Ends on 10/03/2022 11:59 PM",
        resource:
          "https://t.me/stabilityworld_ai_bot/start?startapp=4AED88A3FDFCA3B3",
        logo: {
          uri: PartnerLogos.StabilityAiLogo,
          size: 100,
        },
        active: false,
        comingSoon: false,
        cta: "Open Telegram",
      },
    ],
  },
  {
    categoryId: "bearfi",
    title: "BearFi",
    icon: Img.TaskExtras,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "bearfi_task-1",
        title: "Follow BearFi on X",
        type: "partner",
        completed: false,
        caption:
          "BearFi an innovative Web3 Gaming and Social Marketing platform on Telegram, known for its easy-to-use earn mechanism and potential for multichain on Telegram and Web3 expansion.",
        resource: "https://x.com/BearFiBot",
        logo: {
          uri: PartnerLogos.BearfiLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open X",
      },
      {
        taskId: "bearfi_task-2",
        title: "Join BearFi Channel",
        type: "partner",
        completed: false,
        caption:
          "BearFi an innovative Web3 Gaming and Social Marketing platform on Telegram, known for its easy-to-use earn mechanism and potential for multichain on Telegram and Web3 expansion.",
        resource: "https://t.me/bearfi_news",
        logo: {
          uri: PartnerLogos.BearfiLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram",
      },
      {
        taskId: "bearfi_task-3",
        title: "Play BearFi",
        type: "partner",
        completed: false,
        caption:
          "BearFi an innovative Web3 Gaming and Social Marketing platform on Telegram, known for its easy-to-use earn mechanism and potential for multichain on Telegram and Web3 expansion.",
        resource: "https://t.me/BearFi_OfficialBot",
        logo: {
          uri: PartnerLogos.BearfiLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram",
      },
    ],
  },
  {
    categoryId: "tap-gear",
    title: "TapGear",
    icon: Img.TaskExtras,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "tap-gear_task-1",
        title: "Follow TapGear on X",
        type: "partner",
        completed: false,
        caption:
          "TapGear is a one of a kind Tap-to-Earn and Play-To-Earn game showcasing its strategic concepts and mechanics.",
        resource: "https://x.com/tap_gear1",
        logo: {
          uri: PartnerLogos.TapGearLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open X",
      },
      {
        taskId: "tap-gear_task-2",
        title: "Follow TapGear on Facebook",
        type: "partner",
        completed: false,
        caption:
          "TapGear is a one of a kind Tap-to-Earn and Play-To-Earn game showcasing its strategic concepts and mechanics.",
        resource:
          "https://www.facebook.com/profile.php?id=61563351325496&mibextid=ZbWKwL",
        logo: {
          uri: PartnerLogos.TapGearLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Facebook",
      },
      {
        taskId: "tap-gear_task-3",
        title: "Join TapGear Channel",
        type: "partner",
        completed: false,
        caption:
          "TapGear is a one of a kind Tap-to-Earn and Play-To-Earn game showcasing its strategic concepts and mechanics.",
        resource: "https://t.me/TapGear01",
        logo: {
          uri: PartnerLogos.TapGearLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram",
      },
    ],
  },
  {
    categoryId: "hybrid",
    title: "Hybrid",
    icon: Img.TaskExtras,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "hybrid_task-1",
        title: "Open Hybrid MiniApp on Telegram",
        type: "partner",
        completed: false,
        caption: "Create, connect, grow and farm Hybrid Points.",
        resource:
          "https://t.me/HybridMiniAppBot/HybridMiniApp?startapp=6636449772",
        logo: {
          uri: PartnerLogos.HybridLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram Bot",
      },
    ],
  },
  {
    categoryId: "habit",
    title: "Habit Farming App",
    icon: Img.TaskExtras,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "habit_task-1",
        title: "Open Habit Bot on Telegram",
        type: "partner",
        completed: false,
        caption: "Habit (Tap > Trade > Win USDT)",
        resource: "https://t.me/HabitNetwork_bot/HABIT?startapp=ref_6511194035",
        logo: {
          uri: PartnerLogos.HabitLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram Bot",
      },
    ],
  },
  {
    categoryId: "frogs",
    title: "$Frogs",
    icon: Img.TaskExtras,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "frogs_task-1",
        title: "Play FROGS Game",
        type: "partner",
        completed: false,
        caption:
          "A meme coin that brings the iconic Pepe the Frog energy and the bold spirit of Donald Trump to the Telegram community! 🚀💥",
        resource: "https://t.me/realFrogs_bot",
        logo: {
          uri: PartnerLogos.FrogsLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram Bot",
      },
      {
        taskId: "frogs_task-2",
        title: "Visit Channel and Engage",
        type: "partner",
        completed: false,
        caption:
          "A meme coin that brings the iconic Pepe the Frog energy and the bold spirit of Donald Trump to the Telegram community! 🚀💥",
        resource: "https://t.me/realFrogsClub",
        logo: {
          uri: PartnerLogos.FrogsLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram Group",
      },
    ],
  },
  {
    categoryId: "cognixphere",
    title: "CogniXphere",
    icon: Img.TaskExtras,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "cognixphere_task-1",
        title: "Join CogniXphere Telegram Bot",
        type: "partner",
        completed: false,
        caption: "Join CogniXphere MiniApp",
        resource:
          "https://t.me/CogniXphereBot/minigame?startapp=kentId6308729999",
        logo: {
          uri: PartnerLogos.CogniXphereLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram Bot",
      },
      {
        taskId: "cognixphere_task-2",
        title: "Join CogniXphere Telegram Chat",
        type: "partner",
        completed: false,
        caption: "Join CogniXphere MiniApp",
        resource: "https://t.me/CogniXphereObservation",
        logo: {
          uri: PartnerLogos.CogniXphereLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram Chat",
      },
      {
        taskId: "cognixphere_task-3",
        title: "Follow CogniXphere on X",
        type: "partner",
        completed: false,
        caption: "Join CogniXphere MiniApp",
        resource: "https://x.com/CogniXphere",
        logo: {
          uri: PartnerLogos.CogniXphereLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open X",
      },
    ],
  },
  {
    categoryId: "finished-tasks",
    title: "Finished Tasks",
    icon: Img.TaskFinished,
    tasks: [
      {
        taskId: "finished-tasks_task-1",
        title: "Daily Task",
        completed: true,
        logo: {
          uri: Img.CommonTask,
        },
        active: true,
        comingSoon: true,
      },
      {
        taskId: "finished-tasks_task-2",
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
