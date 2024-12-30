import { Img } from "@/utilitiy/images";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type RewardType = "CNTP" | "Key" | "Ticket";
type TaskType = "social" | "partner" | "video-task" | "silentpassvpn";

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

export default function useTasks() {
  const { t } = useTranslation();

  /* const dailyQuiz: Quiz = {
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
  }; */

  const _dailyClaim: TaskCategory = {
    categoryId: "daily-rewards",
    title: t("earn.tasks.dailyRewards"),
    icon: Img.TaskDaily,
    tasks: [
      {
        taskId: "daily-rewards_task-1",
        title: t("earn.tasks.dailyClaim"),
        claim: true,
        caption: t("earn.tasks.dailyClaimCaption"),
        extraInstruction: t("earn.tasks.dailyClaimExtraInstruction"),
        logo: {
          uri: Img.DailyClaim,
        },
        cta: t("earn.tasks.dailyClaimCTA"),
        active: true,
        comingSoon: false,
      },
    ],
  };

  const _videoTasks: TaskCategory = {
    categoryId: "video-tasks",
    title: t("earn.tasks.videoTasks"),
    icon: Img.TaskExtras,
    completed: false,
    tasks: [
      {
        taskId: "video-tasks_task-1",
        nftId: 17,
        type: "video-task",
        title: t("earn.tasks.videoTaskTitle"),
        titleSize: "20px",
        caption: t("earn.tasks.videoTaskCaption"),
        completed: false,
        resource: "https://youtu.be/TpSSeik9SPk?si=0ihKvAKj7hCgFA92",
        logo: {
          uri: Img.Youtube,
          size: 50,
        },
        active: true,
        comingSoon: false,
        cta: t("earn.tasks.videoTaskCTA"),
      },
    ],
  };

  const _referralTask: TaskCategory = {
    categoryId: "referral",
    title: t("earn.tasks.referral"),
    icon: Img.TaskInvitation,
    completed: false,
    tasks: [
      {
        taskId: "referral_task-1",
        title: t("earn.tasks.referralTaskTitle"),
        completed: false,
        caption: t("earn.tasks.referralTaskCaption"),
        referral: true,
        active: true,
      },
    ],
  };

  const _socialTasks: TaskCategory = {
    categoryId: "social",
    title: t("earn.tasks.social"),
    icon: Img.TaskJoin,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "social_task-1",
        nftId: 2,
        title: t("earn.tasks.socialTask1Title"),
        type: "social",
        completed: false,
        logo: {
          uri: Img.TwitterX,
          color: "#000000",
        },
        caption: t("earn.tasks.socialTask1Caption"),
        extraInstruction: t("earn.tasks.socialTask1ExtraInstruction"),
        cta: t("earn.tasks.socialTask1CTA"),
        resource: "https://x.com/conet_network?lang=en",
        active: true,
      },
      {
        taskId: "social_task-2",
        nftId: 3,
        title: t("earn.tasks.socialTask2Title"),
        type: "social",
        completed: false,
        logo: {
          uri: Img.Telegram,
          color: "#66ACDD",
        },
        caption: t("earn.tasks.socialTask2Caption"),
        cta: t("earn.tasks.socialTask2CTA"),
        resource: "https://t.me/conet_network",
        active: true,
      },
      {
        taskId: "social_task-3",
        nftId: 13,
        title: t("earn.tasks.socialTask3Title"),
        type: "social",
        completed: false,
        logo: {
          uri: Img.Instagram,
          color: "#E94869",
          size: 50,
        },
        caption: t("earn.tasks.socialTask3Caption"),
        cta: t("earn.tasks.socialTask3CTA"),
        resource: "https://www.instagram.com/conet_network/",
        active: true,
        comingSoon: false,
      },
      {
        taskId: "social_task-4",
        nftId: 14,
        title: t("earn.tasks.socialTask4Title"),
        type: "social",
        completed: false,
        logo: {
          uri: Img.Youtube,
          color: "#FFFFFF",
          size: 50,
        },
        caption: t("earn.tasks.socialTask4Caption"),
        cta: t("earn.tasks.socialTask4CTA"),
        resource: "https://www.youtube.com/@CoNET_Network",
        active: true,
        comingSoon: false,
      },
    ],
  };

  const _partnerTasks: TaskCategory[] = [
    {
      categoryId: "silentpass-tasks",
      nftId: 24,
      title: t("earn.tasks.partnerSilentPass"),
      icon: Img.TaskExtras,
      completed: false,
      tasks: [
        {
          taskId: "silentpass-tasks_task-1",
          type: "partner",
          title: t("earn.tasks.partnerSilentPassTitle"),
          titleSize: "20px",
          caption: t("earn.tasks.partnerSilentPassCaption"),
          completed: false,
          resource: "https://x.com/silentpassvpn",
          logo: {
            uri: Img.SilentPassVpn,
            size: 50,
          },
          active: true,
          comingSoon: false,
          cta: t("earn.tasks.partnerSilentPassCTA"),
        },
      ],
    },
  ];


  const [dailyClaimTasks, setDailyClaimTasks] = useState<TaskCategory>(_dailyClaim);
  const [referralTasks, setReferralTasks] = useState<TaskCategory>(_referralTask);
  const [socialTasks, setSocialTasks] = useState<TaskCategory>(_socialTasks);
  const [videoTasks, setVideoTasks] = useState<TaskCategory>(_videoTasks);
  const [partnerTaskGroups, setPartnerTaskGroups] = useState<TaskCategory[]>(_partnerTasks);

  return {
    dailyClaimTasks,
    setDailyClaimTasks,
    referralTasks,
    setReferralTasks,
    socialTasks,
    setSocialTasks,
    videoTasks, setVideoTasks,
    partnerTaskGroups, setPartnerTaskGroups
  }
}
