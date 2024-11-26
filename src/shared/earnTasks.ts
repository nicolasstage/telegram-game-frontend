import { Img } from "@/utilitiy/images";
import { PartnerLogos } from "@/utilitiy/partnerLogos";

type RewardType = "CNTP" | "Key" | "Ticket";
type TaskType = "social" | "partner" | "video-task";

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
  nftId?: number;
  title: string;
  icon?: string;
  tasks: Task[];
  reward?: number;
  rewardAsset?: RewardType;
  completed?: boolean;
}

export interface Task {
  taskId: string;
  nftId?: number;
  title: string;
  titleSize?: string;
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

export const _dailyClaim: TaskCategory = {
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
};

export const _videoTasks: TaskCategory = {
  categoryId: "video-tasks",
  title: "Video Tasks",
  icon: Img.TaskExtras,
  completed: false,
  tasks: [
    {
      taskId: "video-tasks_task-1",
      nftId: 17,
      type: "video-task",
      title: "Blockchain & Decentralization Explained",
      titleSize: "20px",
      caption:
        "Watch the new video in our Youtube channel The CoNETian TG Guide",
      completed: false,
      resource: "https://youtu.be/TpSSeik9SPk?si=0ihKvAKj7hCgFA92",
      logo: {
        uri: Img.Youtube,
        size: 50,
      },
      active: true,
      comingSoon: false,
      cta: "Open Youtube",
    },
  ],
};

export const _referralTask: TaskCategory = {
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
};

export const _socialTasks: TaskCategory = {
  categoryId: "social",
  title: "Join Us",
  icon: Img.TaskJoin,
  reward: 1,
  rewardAsset: "Ticket",
  completed: false,
  tasks: [
    {
      taskId: "social_task-1",
      nftId: 2,
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
      nftId: 3,
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
      nftId: 13,
      title: "Join our Instagram Channel",
      type: "social",
      completed: false,
      logo: {
        uri: Img.Instagram,
        color: "#E94869",
        size: 50,
      },
      caption:
        "Follow us on Instagram and earn Tickets just for staying connected!",
      cta: "Open Instagram",
      resource: "https://www.instagram.com/conet_network/",
      active: true,
      comingSoon: false,
    },
    {
      taskId: "social_task-4",
      nftId: 14,
      title: "Follow us on Youtube",
      type: "social",
      completed: false,
      logo: {
        uri: Img.Youtube,
        color: "#FFFFFF",
        size: 50,
      },
      caption:
        "Subscribe to our Youtube channel and earn Tickets just for staying connected!",
      cta: "Open Youtube",
      resource: "https://www.youtube.com/@CoNET_Network",
      active: true,
      comingSoon: false,
    },
    {
      taskId: "social_task-5",
      nftId: 15,
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
};

export const _partnerTasks: TaskCategory[] = [
  {
    categoryId: "galacticgold",
    nftId: 22,
    title: "Galactic Gold Rush",
    icon: Img.TaskExtras,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "galacticgold_task-1",
        title: "Play Galactic Gold Rush",
        type: "partner",
        completed: false,
        caption:
          "Embark on an interstellar adventure where you're at the helm of constructing a revolutionary blockchain protocol. ",
        resource: "https://t.me/galactic_gold_rush_bot?start=8048922416",
        logo: {
          uri: PartnerLogos.GalacticGoldLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram",
      },
      {
        taskId: "galacticgold_task-2",
        title: "Join Galactic Gold Rush Telegram Chat",
        type: "partner",
        completed: false,
        caption:
          "Embark on an interstellar adventure where you're at the helm of constructing a revolutionary blockchain protocol. ",
        resource: "https://t.me/stargating",
        titleSize: "20px",
        logo: {
          uri: PartnerLogos.GalacticGoldLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram",
      },
    ],
  },
  {
    categoryId: "draton",
    nftId: 23,
    title: "Draton",
    icon: Img.TaskExtras,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "draton_task-1",
        title: "Join Draton Bot",
        type: "partner",
        completed: false,
        caption:
          "DRATON is an easy-to-use Telegram app featuring Auto Trading Bot on TON ecosystem, utilizing AI technology to deliver the best trading experience and efficiency.",
        resource: "https://t.me/DratonTrading_bot/Launch?startapp=1aCSTypLcH",
        logo: {
          uri: PartnerLogos.DratonLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram",
      },
      {
        taskId: "draton_task-2",
        title: "Join Draton Telegram Channel",
        type: "partner",
        completed: false,
        caption:
          "DRATON is an easy-to-use Telegram app featuring Auto Trading Bot on TON ecosystem, utilizing AI technology to deliver the best trading experience and efficiency.",
        resource: "https://t.me/draton_channel",
        logo: {
          uri: PartnerLogos.DratonLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram",
      },
      {
        taskId: "draton_task-3",
        title: "Follow Draton on X",
        type: "partner",
        completed: false,
        caption:
          "DRATON is an easy-to-use Telegram app featuring Auto Trading Bot on TON ecosystem, utilizing AI technology to deliver the best trading experience and efficiency.",
        resource: "https://x.com/dratonbot",
        logo: {
          uri: PartnerLogos.DratonLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open X",
      },
    ],
  },
];
