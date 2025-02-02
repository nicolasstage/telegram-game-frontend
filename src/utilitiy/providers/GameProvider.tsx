"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import Leaderboard from "../types/leaderboard";
import { fetchImportWallet, fetchRegisterReferrer, fetchStartMining } from "@/API/getData";
import { AnyARecord } from "dns";

export type Difficulty = "easy" | "normal" | "hard";

export type AssetType = 'cCNTP' | 'ticket' | 'conetian' | 'conetianReferrer';
export const ReadableAssetType: Record<string, string> = {
  'cCNTP': 'CNTP',
  'Ticket': 'Ticket',
  'conetian': 'Conetian NFT',
  'conetianReferrer': 'Conetian Agent NFT'
}

export type TransferTokenDetails = {
  amount: string;
  assetName: AssetType;
  toAddress: string;
  gasFee: number;
  gasPrice: number;
};

export type ConetianPurchaseDetails = {
  agentWallet: string;
  selectedCoin: string;
  amount: number;
  nftPriceByCoin: number;
  total: number;
  gasFee: number;
  gasPrice: number;
};

type GameContext = {
  router?: string;
  setRouter?: (props: string) => void;
  difficulty?: Difficulty;
  setDifficulty?: (val: Difficulty) => void;
  effects?: number;
  setEffects?: (val: number) => void;
  music?: number;
  setMusic?: (val: number) => void;
  highScore?: number;
  setHighScore?: (e: number) => void;
  profile?: any;
  setProfile?: (o: any) => void;
  leaderboard?: Leaderboard;
  setLeaderboard?: (e: Leaderboard) => void;
  dailyClaimInfo?: DailyClaimInfo;
  setDailyClaimInfo?: (e: DailyClaimInfo) => void;
  miningErrorTimeout?: React.MutableRefObject<NodeJS.Timeout | null>;
  walletAddress?: React.MutableRefObject<string>;
  path?: string;
  setPath?: (path: string) => void;
  privateKey?: string;
  setPrivateKey?: (key: string) => void;
  balance?: number;
  setBalance?: (num: number) => void;
  mining?: boolean;
  setMining?: (e: boolean) => void;
  miningError?: boolean;
  setMiningError?: (e: boolean) => void;
  onlineMiners?: number;
  setOnlineMiners?: (num: number) => void;
  miningRate?: number;
  setMiningRate?: (num: number) => void;
  games?: any;
  setGames?: (o: any) => void;
  lottery?: number;
  setLottery?: (e: number) => void;
  isLeaderboardLoading?: boolean;
  setIsLeaderboardLoading?: (e: boolean) => void;
  gameStatus?: number;
  setGameStatus?: (e: number) => void;
  lotteryBalance?: number;
  setLotteryBalance?: (e: number) => void;
  audio?: boolean;
  setAudio?: (e: any) => any;
  musicVolume?: number;
  setMusicVolume?: (e: number) => void;
  effectsVolume?: number;
  setEffectsVolume?: (e: number) => void;
  setGameDifficulty?: (num: number) => void;
  gameDifficulty?: number;
  setReferrerAddress?: (e: string) => void;
  referrerAddress?: string;
  buyItem?: any;
  setBuyItem?: (skin: any) => void;
  transferTokenDetails?: TransferTokenDetails;
  setTransferTokenDetails?: (details: any) => void;
  spinningCounter?: number;
  setSpinningCounter?: (e: any) => void;
  spinningCounterInterval?: any;
  oracleAssets?: any;
  setOracleAssets?: (e: any) => void;
  conetianPurchaseDetails?: ConetianPurchaseDetails;
  setConetianPurchaseDetails?: (e: any) => void;
  isDebox?: boolean;
  setIsDebox?: (e: any) => void;
};

const Game = createContext<GameContext>({});

export function useGameContext() {
  const context = useContext(Game);
  return context;
}

type GameProps = {
  children: ReactNode;
};

type DailyClaimInfo = {
  todayAsset: TodayAssetInfo;
  todayDayOfWeek: number;
};

type TodayAssetInfo = {
  asset: string;
  quantity: string;
  nft_number: number;
};

export function GameProvider({ children }: GameProps) {
  const [router, setRouter] = useState<string>("/");
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [music, setMusic] = useState<number>(0);
  const [effects, setEffects] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [profile, setProfile] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<Leaderboard>({
    allTime: [],
    weekly: [],
    daily: [],
    monthly: [],
  });
  const [dailyClaimInfo, setDailyClaimInfo] = useState<DailyClaimInfo>({
    todayAsset: { asset: "", quantity: "", nft_number: 0 },
    todayDayOfWeek: 0,
  });
  const [oracleAssets, setOracleAssets] = useState<any>(null)
  const [mining, setMining] = useState<boolean>(false);
  const [onlineMiners, setOnlineMiners] = useState<number>(0);
  const [miningRate, setMiningRate] = useState<number>(0);
  const [miningError, setMiningError] = useState<boolean>(false);
  const [path, setPath] = useState<string>("/");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [lottery, setLottery] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<number>(0);
  const [gameDifficulty, setGameDifficulty] = useState<number>(1);
  const [lotteryBalance, setLotteryBalance] = useState<number>(0);
  const [isLeaderboardLoading, setIsLeaderboardLoading] =
    useState<boolean>(true);
  const [audio, setAudio] = useState<boolean>(false);
  const [musicVolume, setMusicVolume] = useState<number>(0);
  const [effectsVolume, setEffectsVolume] = useState<number>(0);
  const [referrerAddress, setReferrerAddress] = useState<string>("");
  const [games, setGames] = useState<object>({
    gameSpeed: 0,
    gameFrame: 100,
    gravity: 0.6,
    conetian: { x: 30, y: 30, width: 50, height: 50, dy: 0 },
    asteroids: [],
    frame: 0,
    score: 0,
  });
  const [buyItem, setBuyItem] = useState<any>({});
  const [transferTokenDetails, setTransferTokenDetails] =
    useState<TransferTokenDetails>({
      amount: "0",
      assetName: "cCNTP",
      gasFee: 0,
      gasPrice: 0,
      toAddress: "",
    });
  const [spinningCounter, setSpinningCounter] = useState<number>(0);
  const [conetianPurchaseDetails, setConetianPurchaseDetails] = useState<ConetianPurchaseDetails>({
    agentWallet: "",
    selectedCoin: "",
    amount: 0,
    nftPriceByCoin: 0,
    total: 0,
    gasFee: 0,
    gasPrice: 0,
  });
  const [isDebox, setIsDebox] = useState<boolean>(false);

  const spinningCounterInterval = useRef<NodeJS.Timeout | undefined>(undefined);
  const miningErrorTimeout = useRef<NodeJS.Timeout | null>(null);
  const walletAddress = useRef<string>("");

  useEffect(() => {
    const init = async (walletAddress: string) => {
      if (walletAddress && !mining) {
        const result = await fetchStartMining(walletAddress);

        if (result && !result?.error) {
          setOnlineMiners(result?.online);
          setMiningRate(result?.rate);
          setMining(true);
          setMiningError(false);
        } else {
          setMiningError(true);

          if (miningErrorTimeout.current)
            clearTimeout(miningErrorTimeout.current);

          miningErrorTimeout.current = setTimeout(
            () => init(walletAddress),
            15000
          );
        }
      }
    };

    if (profile?.keyID && profile?.keyID !== walletAddress.current) {
      walletAddress.current = profile?.keyID;

      let referrer = new URLSearchParams(window.location.search).get("referrer");

      if (referrer) fetchRegisterReferrer(referrer);

      init(profile?.keyID);
    }
  }, [profile]);

  useEffect(() => {
    const url = window.location.search;

    const splitUrl = url.split("privateKey=");

    if (splitUrl.length > 1) {
      const privateKey = splitUrl[1];
      if (privateKey && privateKey !== profile?.privateKeyArmor) fetchImportWallet(privateKey);
    }
  }, [profile]);

  useEffect(() => {
    const hScore = localStorage?.getItem("hScore");

    if (hScore) {
      setHighScore(parseInt(hScore));
    }
  }, []);

  useEffect(() => {
    if (spinningCounter === 0 && spinningCounterInterval?.current) {
      clearInterval(spinningCounterInterval?.current);
    }
  }, [spinningCounter])

  return (
    <Game.Provider
      value={{
        router,
        setRouter,
        difficulty,
        setDifficulty,
        effects,
        setEffects,
        music,
        setMusic,
        highScore,
        setHighScore,
        profile,
        setProfile,
        leaderboard,
        setLeaderboard,
        dailyClaimInfo,
        setDailyClaimInfo,
        walletAddress,
        mining,
        setMining,
        path,
        setPath,
        privateKey,
        setPrivateKey,
        balance,
        setBalance,
        miningError,
        setMiningError,
        onlineMiners,
        setOnlineMiners,
        miningRate,
        setMiningRate,
        miningErrorTimeout,
        games,
        setGames,
        lottery,
        setLottery,
        gameStatus,
        setGameStatus,
        lotteryBalance,
        setLotteryBalance,
        setIsLeaderboardLoading,
        isLeaderboardLoading,
        audio,
        setAudio,
        musicVolume,
        setMusicVolume,
        effectsVolume,
        setEffectsVolume,
        setGameDifficulty,
        gameDifficulty,
        setReferrerAddress,
        referrerAddress,
        buyItem,
        setBuyItem,
        transferTokenDetails,
        setTransferTokenDetails,
        spinningCounter,
        setSpinningCounter,
        spinningCounterInterval,
        oracleAssets,
        setOracleAssets,
        conetianPurchaseDetails,
        setConetianPurchaseDetails,
        isDebox,
        setIsDebox
      }}
    >
      {children}
    </Game.Provider>
  );
}
