import { v4 } from "uuid";

interface WorkerCommand {
  cmd: any;
  data?: any;
  uuid: string;
  err?: any;
}

const channelWrokerListenName = "toMainWroker";

export const _postMessage = (
  cmd: WorkerCommand,
  close: boolean,
  resolve: any,
  Callback?: (err: string, data: any[]) => void
) => {
  const channel = new BroadcastChannel(channelWrokerListenName);

  const kk = (e: any) => {
    listeningChannel(e.data, cmd.uuid);
  };

  const listenChannel = cmd.uuid ? new BroadcastChannel(cmd.uuid) : null;

  const listeningChannel = (data: any, uuid: string) => {
    let cmd: WorkerCommand;

    try {
      cmd = JSON.parse(data);
    } catch (ex) {
      return console.log(
        "class CONET_Platfrom_API",
        `listeningChannel JSON.parse(data) Error`
      );
    }

    if (close && listenChannel) {
      listenChannel.close();
    }

    if (cmd.err) {
      if (resolve) {
        return resolve([cmd.err, cmd.data]);
      }

      if (Callback) {
        return Callback(cmd.err, [cmd.data]);
      }

      return console.log(`postMessage Callback && resolve all null`, cmd.err);
    }

    if (resolve) {
      return resolve(["SUCCESS", cmd.data]);
    }

    if (Callback) {
      if (!cmd.data.length) {
        if (listenChannel) {
          listenChannel.close();
        }

        return Callback("", []);
      }

      return Callback("", cmd.data);
    }

    return console.log(`postMessage Callback && resolve all null`, cmd.data);
  };

  if (listenChannel) {
    listenChannel.addEventListener("message", kk);
  }

  channel.postMessage(JSON.stringify(cmd));
  channel.close();
};

export const importWallet: (walletPrivateKey: string) => Promise<string> = (
  walletPrivateKey: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "importWallet",
      uuid: v4(),
      data: [walletPrivateKey],
    };
    return _postMessage(cmd, true, resolve);
  });

export const startMining: (walletAddress: string) => Promise<string> = (
  walletAddress: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "startMining",
      uuid: v4(),
      data: [walletAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

export const stopMining: (walletAddress: string) => Promise<string> = (
  walletAddress: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "stopMining",
      uuid: v4(),
      data: [walletAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

export const checkTwitter: (
  walletAddress: string,
  twitterAccount: string
) => Promise<any> = (walletAddress: string, twitterAccount: string) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "checkTwitter",
      uuid: v4(),
      data: [walletAddress, twitterAccount],
    };
    return _postMessage(cmd, true, resolve);
  });

export const checkTelegram: (
  walletAddress: string,
  twitterAccount: string
) => Promise<any> = (walletAddress: string, telegramId: string) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "checkTelegram",
      uuid: v4(),
      data: [walletAddress, telegramId],
    };
    return _postMessage(cmd, true, resolve);
  });

export const claimDailyReward: (walletAddress: string) => Promise<any> = (
  walletAddress: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "claimDailyReward",
      uuid: v4(),
      data: [walletAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

export const checkSocialMedias: (walletAddress: string) => Promise<any> = (
  walletAddress: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "checkSocialMedias",
      uuid: v4(),
      data: [walletAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

export const getRouletteResult: (walletAddress: string) => Promise<string> = (
  walletAddress: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "getRouletteResult",
      uuid: v4(),
      data: [walletAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

export const unlockTicket: (walletAddress: string) => Promise<string> = (
  walletAddress: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "unlockTicket",
      uuid: v4(),
      data: [walletAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

export const getTicketResult: (walletAddress: string) => Promise<string> = (
  walletAddress: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "getTicketResult",
      uuid: v4(),
      data: [walletAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

export const registerReferrer: (referrerAddr: string) => Promise<any> = (
  referrerAddr
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "registerReferrer",
      uuid: v4(),
      data: [referrerAddr],
    };
    return _postMessage(cmd, true, resolve);
  });

export const clearStorage: () => Promise<any> = () =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "clearStorage",
      uuid: v4(),
      data: [],
    };
    return _postMessage(cmd, true, resolve);
  });

export const saveGameProfileInfo: (
  walletAddress: string,
  gameProfileData: any
) => Promise<any> = (walletAddress: string, gameProfileData: any) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "saveGameProfileInfo",
      uuid: v4(),
      data: [walletAddress, gameProfileData],
    };
    return _postMessage(cmd, true, resolve);
  });

export const checkPartner: (
  walletAddress: string,
  partnerId: string
) => Promise<any> = (walletAddress: string, partnerId: string) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "checkPartner",
      uuid: v4(),
      data: [walletAddress, partnerId],
    };
    return _postMessage(cmd, true, resolve);
  });

export const transferToken: (
  amount: number,
  sourceProfileKeyID: string,
  assetName: string,
  toAddress: string
) => Promise<string> = (
  amount: number,
  sourceProfileKeyID: string,
  assetName: string,
  toAddress: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "transferToken",
      uuid: v4(),
      data: [amount, sourceProfileKeyID, assetName, toAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

export const transferNft: (
  amount: number,
  sourceProfileKeyID: string,
  assetName: string,
  toAddress: string
) => Promise<string> = (
  amount: number,
  sourceProfileKeyID: string,
  assetName: string,
  toAddress: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "transferNft",
      uuid: v4(),
      data: [amount, sourceProfileKeyID, assetName, toAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

export const estimateGas: (
  amount: string,
  sourceProfileKeyID: string,
  assetName: string,
  toAddress: string
) => Promise<string> = (
  amount: string,
  sourceProfileKeyID: string,
  assetName: string,
  toAddress: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "estimateGas",
      uuid: v4(),
      data: [amount, sourceProfileKeyID, assetName, toAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

export const estimateGasForNftContract: (
  amount: string,
  sourceProfileKeyID: string,
  assetName: string,
  toAddress: string
) => Promise<string> = (
  amount: string,
  sourceProfileKeyID: string,
  assetName: string,
  toAddress: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "estimateGasForNftContract",
      uuid: v4(),
      data: [amount, sourceProfileKeyID, assetName, toAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

export const getNativeBalance: (
  sourceProfileKeyID: string
) => Promise<string> = (sourceProfileKeyID: string) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "getNativeBalance",
      uuid: v4(),
      data: [sourceProfileKeyID],
    };
    return _postMessage(cmd, true, resolve);
  });

export const isAddress: (address: string) => Promise<string> = (
  address: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "isAddress",
      uuid: v4(),
      data: [address],
    };
    return _postMessage(cmd, true, resolve);
  });

export const prePurchase: (
  address: string,
  total: number,
  selectedCoin: string
) => Promise<string> = (address: string, total: number, selectedCoin: string) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "prePurchase",
      uuid: v4(),
      data: [address, total, selectedCoin],
    };
    return _postMessage(cmd, true, resolve);
  });

export const purchaseConetian: (
  address: string,
  amount: number,
  selectedCoin: string,
  total: number,
  agentWallet: string
) => Promise<string> = (
  address: string,
  amount: number,
  selectedCoin: string,
  total: number,
  agentWallet: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "purchaseConetian",
      uuid: v4(),
      data: [address, amount, selectedCoin, total, agentWallet],
    };
    return _postMessage(cmd, true, resolve);
  });

export const isWalletAgent: (walletAddress: string) => Promise<boolean> = (
  walletAddress
) =>
  new Promise(async (resolve) => {
    const cmd: WorkerCommand = {
      cmd: "isWalletAgent",
      uuid: v4(),
      data: [walletAddress],
    };
    return _postMessage(cmd, false, (err: any, data: any) => {
      if (err) {
        return resolve(err);
      }
      return resolve(data[0]);
    });
  });
