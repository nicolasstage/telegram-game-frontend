import { Img } from '@/utilitiy/images';

export interface BoxType {
  icon: string;
  title: string;
  description: string;
  minimumRank: string;
  requiredKey: "normal" | "special" | "conet";
}

export interface KeyType {
  name: "normal" | "special" | "conet";
  icon: string;
  cost: {
    cntp: number;
    tickets: number;
  };
}

export const boxes: BoxType[] = [
  {
    icon: Img.GuardianBox,
    title: "Guardian box",
    description: "A special box, only for Guardians",
    minimumRank: "Guardian",
    requiredKey: "conet",
  },
  {
    icon: Img.BronzeBox,
    title: "Bronze box",
    description: "Humble start with simple treasures",
    minimumRank: "Cader",
    requiredKey: "normal",
  },
  {
    icon: Img.SilverBox,
    title: "Silver box",
    description: "A step up with a bit more sparkle",
    minimumRank: "Cadet",
    requiredKey: "normal",
  },
  {
    icon: Img.GoldBox,
    title: "Gold box",
    description: "Gleaming with mid-tier rewards",
    minimumRank: "Captain",
    requiredKey: "special",
  },
  {
    icon: Img.PlatinumBox,
    title: "Platinum box",
    description: "Packed with shiny surprises",
    minimumRank: "Captain",
    requiredKey: "special",
  },
  {
    icon: Img.OsmiumBox,
    title: "Osmium box",
    description: "Premium prizes await inside",
    minimumRank: "Colonel",
    requiredKey: "special",
  },
  {
    icon: Img.ConetiumBox,
    title: "CoNETium box",
    description: "A rare find with legendary loot",
    minimumRank: "Lieutenant General",
    requiredKey: "conet",
  },
];

export const keys: KeyType[] = [
  {
    name: "normal",
    icon: Img.NormalKey,
    cost: {
      cntp: 1,
      tickets: 5,
    }
  }, {
    name: "special",
    icon: Img.SpecialKey,
    cost: {
      cntp: 5,
      tickets: 10,
    }
  }, {
    name: "conet",
    icon: Img.ConetKey,
    cost: {
      cntp: 10,
      tickets: 50,
    }
  },
]