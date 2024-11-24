import toast from 'react-hot-toast';
import BackButton from '@/components/backButton';
import CurrentBalance from '@/components/currentBalance';
import GuardianCard from '@/components/guardianCard';
import PageWrapper from '@/components/pageWrapper';
import { useEffect, useRef, useState } from 'react';
import { Div, FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { _dailyClaim, _videoTasks, _partnerTasks, _referralTask, _socialTasks, Task, TaskCategory } from '../../shared/earnTasks';
import Image from 'next/image';
import { Img } from '@/utilitiy/images';
import Modal from '@/components/modal';
import { Button } from '@/components/button';
import "./styles.css";
import DailyClaim from './page-components/DailyClaim';
import CommonTask from './page-components/CommonTask';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import { checkSocialMedias, checkTwitter } from '@/API';
import { fetchCheckPartner, fetchCheckTelegram, fetchCheckTwitter, fetchClaimDailyReward } from '@/API/getData';
import copy from 'copy-to-clipboard';

export default function Earn() {
  const [dailyClaimTasks, setDailyClaimTasks] = useState<TaskCategory>(_dailyClaim);
  const [referralTasks, setReferralTasks] = useState<TaskCategory>(_referralTask);
  const [socialTasks, setSocialTasks] = useState<TaskCategory>(_socialTasks);
  const [videoTasks, setVideoTasks] = useState<TaskCategory>(_videoTasks);
  const [partnerTaskGroups, setPartnerTaskGroups] = useState<TaskCategory[]>(_partnerTasks);

  const [chosenTask, setChosenTask] = useState<Task>();
  const [chosenTaskCategory, setChosenTaskCategory] = useState<TaskCategory>()
  const [userName, setUserName] = useState<string>('')
  const [telegramId, setTelegramId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isTodayRewardTaken, setIsTodayRewardTaken] = useState<boolean>(false)

  const { profile, dailyClaimInfo } = useGameContext();

  let gameLink: string = "";

  if (typeof window !== 'undefined')
    gameLink = window?.location?.origin + "/?referrer=";

  const tgBotLink = "https://t.me/conetian_bot/?start=";

  useEffect(() => {
    const isTaken = profile?.dailyClaimWeek?.find((el: any, i: any) => i === dailyClaimInfo?.todayDayOfWeek)

    setIsTodayRewardTaken(isTaken)

    if (isTaken) {
      const tmpTasks = dailyClaimTasks
      tmpTasks.tasks.forEach((task) => {
        task.completed = true
      })

      setDailyClaimTasks(tmpTasks)
    }
  }, [dailyClaimInfo, profile?.dailyClaimWeek])

  useEffect(() => {
    async function fetchSocialMedias() {
      const res = await checkSocialMedias(profile?.keyID)

      const socialTasksCopy = socialTasks

      if (res[1][0][0].length === 0) {
        socialTasksCopy.tasks.forEach((task) => {
          task.completed = false
        });

        return
      }

      socialTasksCopy.tasks.forEach(task => {
        if (res[1][0][0].includes(task.nftId?.toString()))
          task.completed = true
        else
          task.completed = false
      });

      setSocialTasks?.(socialTasksCopy)
    }

    fetchSocialMedias()
  }, [profile])

  useEffect(() => {
    async function fetchSocialMedias() {
      const res = await checkSocialMedias(profile?.keyID)

      const partnerTaskGroupsCopy = [...partnerTaskGroups]

      if (res[1][0][0].length === 0) {
        partnerTaskGroups.forEach(group => {
          group.tasks.forEach(task => {
            task.completed = false
          })
        });

        return
      }

      partnerTaskGroupsCopy.forEach(group => {
        if (res[1][0][0].includes(group.nftId?.toString())) {
          group.tasks.forEach(task => {
            task.completed = true
          })
        } else {
          group.tasks.forEach(task => {
            task.completed = false
          })
        }
      })

      setPartnerTaskGroups?.(partnerTaskGroupsCopy)
    }

    fetchSocialMedias()
  }, [])

  useEffect(() => {
    async function fetchSocialMedias() {
      const res = await checkSocialMedias(profile?.keyID)

      const videoTasksCopy = videoTasks

      if (res[1][0][0].length === 0) {
        videoTasksCopy.tasks.forEach(task => {
          task.completed = false
        })

        return
      }

      videoTasksCopy.tasks.forEach(task => {
        if (res[1][0][0].includes(task.nftId?.toString())) {
          task.completed = true
        } else {
          task.completed = false
        }
      })

      setVideoTasks?.(videoTasksCopy)
    }

    fetchSocialMedias()
  }, [])

  function copyReferralLink(text: string) {
    if (!text) return;

    //Copy and Toast
    copy(text);

    toast.success("Referral Link copied to the clipbboard!", {
      position: "bottom-center",
      duration: 2000,
    });
  }

  async function checkTwitterAccount() {
    setIsLoading(true)

    const res = await fetchCheckTwitter(profile.keyID, userName)

    if (res?.response?.isFollow === true && res?.response?.isRetweet === true) {
      const socialTasksCopy = socialTasks
      socialTasksCopy.tasks[0].completed = true
      setSocialTasks(socialTasksCopy)

      toast.success("Task completed! Check your rewards in the Earn Page", {
        position: "bottom-center",
        duration: 2000,
      });
    } else if (res?.response?.protected === true) {
      toast.error("Your account is private. Please make it public to claim your reward.", {
        position: "bottom-center",
        duration: 2000,
      });
    }
    else {
      toast.error("Unable to confirm. Check if you have completed the tasks", {
        position: "bottom-center",
        duration: 2000,
      });
    }

    setIsLoading(false)
  }

  async function checkTelegramAccount() {
    setIsLoading(true)

    const res = await fetchCheckTelegram(profile.keyID, telegramId)

    if (res?.response?.isInTGGroup === true && !res?.response?.isusedByOtherWallet) {
      const socialTasksCopy = socialTasks
      socialTasksCopy.tasks[1].completed = true
      setSocialTasks(socialTasksCopy)

      toast.success("Task completed! Check your rewards in the Earn Page", {
        position: "bottom-center",
        duration: 2000,
      });
    }

    if (res?.response?.isusedByOtherWallet === true) {
      toast.error("Account already used by other wallet.", {
        position: "bottom-center",
        duration: 2000,
      });
    } else {
      toast.error("Unable to confirm. Check if you have completed the tasks", {
        position: "bottom-center",
        duration: 2000,
      });
    }

    setIsLoading(false)
  }

  async function checkInstagramAccount() {
    if (!chosenTask) return;
    if (!chosenTask.resource) return;
    if (!chosenTask.nftId) return;

    const socialTasksCopy = socialTasks;

    window.open(chosenTask.resource, "_blank");

    const res = await fetchCheckPartner(profile?.keyID, chosenTask.nftId.toString())

    if (!res.error) {
      setTimeout(() => {
        socialTasksCopy.tasks[2].completed = true

        setSocialTasks?.(socialTasksCopy)

        toast.success("Task completed! Check your rewards in the Earn Page", {
          position: "bottom-center",
          duration: 2000,
        });
      }, 5000);
    }
    else {
      toast.error("Unable to confirm. Check if you have completed the tasks", {
        position: "bottom-center",
        duration: 2000,
      });
    }
  }

  async function checkYoutubeAccount() {
    if (!chosenTask) return;
    if (!chosenTask.resource) return;
    if (!chosenTask.nftId) return;

    const socialTasksCopy = socialTasks;

    window.open(chosenTask.resource, "_blank");

    const res = await fetchCheckPartner(profile?.keyID, chosenTask.nftId.toString())

    if (!res.error) {
      setTimeout(() => {
        socialTasksCopy.tasks[3].completed = true

        setSocialTasks?.(socialTasksCopy)

        toast.success("Task completed! Check your rewards in the Earn Page", {
          position: "bottom-center",
          duration: 2000,
        });
      }, 5000);
    }
    else {
      toast.error("Unable to confirm. Check if you have completed the tasks", {
        position: "bottom-center",
        duration: 2000,
      });
    }
  }

  const handlePartnerCheckButton = async () => {

    window.open(chosenTask?.resource, "_blank");

    setTimeout(async () => {
      if (chosenTask?.completed) return;
      if (!chosenTask?.resource) return;
      if (!chosenTaskCategory?.nftId) return;


      const partnerTaskGroupsCopy = partnerTaskGroups ? [...partnerTaskGroups] : []

      if (chosenTaskCategory?.categoryId) {
        const chosenCategoryIndex = partnerTaskGroupsCopy.findIndex((group: TaskCategory) => group.nftId === chosenTaskCategory?.nftId)

        chosenTaskCategory.tasks.forEach(task => {
          if (task.taskId === chosenTask?.taskId) {
            task.completed = true
          }
        })

        partnerTaskGroupsCopy[chosenCategoryIndex].tasks = chosenTaskCategory.tasks

        const completedTasks = chosenTaskCategory.tasks.reduce((_completedTasks: number, task: Task) => {
          if (task.completed) _completedTasks++
          return _completedTasks
        }, 0)

        if (completedTasks < chosenTaskCategory.tasks.length)
          return

        const res = await fetchCheckPartner(profile?.keyID, chosenTaskCategory.nftId.toString())

        if (!res.error) {
          chosenTaskCategory.tasks.forEach(task => {
            task.completed = true
          })

          partnerTaskGroupsCopy[chosenCategoryIndex].tasks = chosenTaskCategory.tasks

          setPartnerTaskGroups?.(partnerTaskGroupsCopy)

          toast.success("Task completed! Check your rewards in the Earn Page", {
            position: "bottom-center",
            duration: 2000,
          });
        }
        else {
          toast.error("Unable to confirm. Check if you have completed the tasks", {
            position: "bottom-center",
            duration: 2000,
          });
        }
      }
    }, 10000);
  }

  const handleCheckVideoTaskButton = async () => {
    if (!chosenTask) return;
    if (!chosenTask.resource) return;
    if (!chosenTask.nftId) return;

    const videoTasksCopy = videoTasks;

    window.open(chosenTask.resource, "_blank");

    const res = await fetchCheckPartner(profile?.keyID, chosenTask.nftId.toString())

    if (!res.error) {
      setTimeout(() => {
        const taskIndex = videoTasksCopy.tasks.findIndex((task) => task.taskId === chosenTask.taskId)

        videoTasksCopy.tasks[taskIndex].completed = true

        setVideoTasks?.(videoTasksCopy)

        toast.success("Task completed! Check your rewards in the Earn Page", {
          position: "bottom-center",
          duration: 2000,
        });
      }, 5000);
    }
    else {
      toast.error("Unable to confirm. Check if you have completed the tasks", {
        position: "bottom-center",
        duration: 2000,
      });
    }
  }

  const handleClaim = async () => {
    const res = await fetchClaimDailyReward(profile.keyID)

    if (res.error) {
      toast.error(res.message, {
        position: "bottom-center",
        duration: 2000,
      });

      return
    }

    if (res?.response?.result === true) {
      const dailyClaimTasksCopy = dailyClaimTasks
      dailyClaimTasksCopy.tasks[0].completed = true
      setDailyClaimTasks(dailyClaimTasksCopy)

      toast.success("Task completed! Check your rewards in the Earn Page", {
        position: "bottom-center",
        duration: 2000,
      });

      setIsTodayRewardTaken(true);

      return
    }

    else {
      toast.error("You can only claim once per day. Please try again tomorrow", {
        position: "bottom-center",
        duration: 2000,
      });
    }
  }

  function chooseTask(task: Task, category: TaskCategory) {
    setChosenTask(task);
    setChosenTaskCategory(category)
  }

  function closeTask() {
    setChosenTask(undefined);
  }

  function buttonAction() {
    if (!chosenTask) return;

    if (chosenTask.claim) {
      handleClaim();
      return;
    }

    if (chosenTask.referral) {
      copyReferralLink(chosenTask.referral ? tgBotLink + profile?.keyID : "")
      return;
    }

    if (!chosenTask.resource) return;

    window.open(chosenTask.resource, "_blank");
  }

  return (
    <>
      <PageWrapper margin="12px 16px 160px 16px">
        <BackButton text="Earn" />

        <FlexDiv $direction="column" $gap="8px">
          <CurrentBalance inline asset="cntp" />
          <CurrentBalance inline asset="ticket" />
        </FlexDiv>

        <GuardianCard />

        {/* Referral Task */}
        <FlexDiv $direction="column" key={referralTasks.title} $gap="12px" className="task-category">
          <FlexDiv $direction="column" $gap="8px">
            <FlexDiv $gap="5px" $align="center">
              {referralTasks.icon && <Image alt={referralTasks.title} width={24} height={24} src={referralTasks.icon} />}
              <P $fontSize="24px">{referralTasks.title}</P>
            </FlexDiv>
          </FlexDiv>

          {referralTasks.tasks.filter((task) => task?.active).map((task) => (
            <FlexDiv key={task.title} $gap="16px" $padding="16px" $border="1px solid #FFFFFF1A" $radius="16px" $align="center" $height="95px" className={`task`} onClick={() => chooseTask(task, referralTasks)}>
              <FlexDiv className="text-content" $direction="column" $gap="4px">
                <P $fontSize="24px">{task.title}</P>
              </FlexDiv>
              <Image src={Img.RightArrowImg} alt="Proceed" width={28} height={28} />
            </FlexDiv>
          ))}
        </FlexDiv>

        {/* Daily Claim */}
        <FlexDiv $direction="column" key={dailyClaimTasks.title} $gap="12px" className="task-category">
          <FlexDiv $direction="column" $gap="8px">
            <FlexDiv $gap="5px" $align="center">
              {dailyClaimTasks.icon && <Image alt={dailyClaimTasks.title} width={24} height={24} src={dailyClaimTasks.icon} />}
              <P $fontSize="24px">{dailyClaimTasks.title}</P>
            </FlexDiv>
          </FlexDiv>

          {dailyClaimTasks.tasks.filter((task) => task?.active).map((task) => (
            <FlexDiv key={task.title} $gap="16px" $padding="16px" $border="1px solid #FFFFFF1A" $radius="16px" $align="center" $height="95px" className={`task`} onClick={() => chooseTask(task, dailyClaimTasks)}>
              {
                task.logo && (
                  <FlexDiv $width="60px" $height="60px" $background={task.logo?.color || "transparent"} $radius="8px" $justify="center" $align="center">
                    {task.logo.uri && (
                      <Image src={task.logo.uri} alt="Task" width={task.logo.color ? 28 : 48} height={task.logo.color ? 28 : 48} style={{ "borderRadius": "8px" }} />
                    )}
                  </FlexDiv>
                )
              }
              <FlexDiv className="text-content" $direction="column" $gap="4px">
                <P $fontSize={task.titleSize || "24px"}>{task.title}</P>
              </FlexDiv>
              <Image src={Img.RightArrowImg} alt="Proceed" width={28} height={28} />
            </FlexDiv>
          ))}
        </FlexDiv>

        {/* Social Tasks */}
        <FlexDiv $direction="column" key={socialTasks.title} $gap="12px" className="task-category">
          <FlexDiv $direction="column" $gap="8px">
            <FlexDiv $gap="5px" $align="center">
              {socialTasks.icon && <Image alt={socialTasks.title} width={24} height={24} src={socialTasks.icon} />}
              <P $fontSize="24px">{socialTasks.title}</P>
            </FlexDiv>
          </FlexDiv>

          {socialTasks.tasks.filter((task) => task?.active).map((task) => (
            task.comingSoon ? (
              <div key={task.title} style={{ position: 'relative', width: '100%', height: '104px', cursor: 'not-allowed', display: 'flex', border: '1px solid #535254', alignItems: 'center', borderRadius: '16px', backgroundColor: '#262527', justifyContent: 'space-between', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '14px' }}>
                  <Image src={task?.logo?.uri || ''} alt="Coming Soon" width={50} height={50} />
                  <div>
                    <p style={{ color: '#ADAAAD', fontSize: task.titleSize || '24px', lineHeight: '28px' }}>{task.title}</p>
                    <p style={{ color: '#ADAAAD', fontSize: '12px', lineHeight: '20px' }}>Coming soon</p>
                  </div>
                </div>
                <Image src={Img.Lock} alt='lock' width={30} height={30} />
              </div>
            ) : (
              <FlexDiv key={task.title} $gap="16px" $padding="16px" $border="1px solid #FFFFFF1A" $radius="16px" $align="center" $height="95px" className={`task`} onClick={() => chooseTask(task, socialTasks)}>
                {
                  task.logo && (
                    <FlexDiv $width="60px" $height="60px" $background={task.logo?.color || "transparent"} $radius="8px" $justify="center" $align="center">
                      {task.logo.uri && (
                        <Image src={task.logo.uri} alt="Task" width={task.logo.color ? 28 : 48} height={task.logo.color ? 28 : 48} style={{ "borderRadius": "8px" }} />
                      )}
                    </FlexDiv>
                  )
                }
                <FlexDiv className="text-content" $direction="column" $gap="4px">
                  <P $fontSize={task.titleSize || "24px"}>{task.title}</P>
                </FlexDiv>
                {
                  task.completed ? (
                    <Image src={Img.TaskCheck} alt="Proceed" width={24} height={24} />
                  ) : (
                    <Image src={Img.RightArrowImg} alt="Proceed" width={28} height={28} />
                  )
                }
              </FlexDiv>
            )
          ))}
        </FlexDiv>

        {/* Video Tasks */}
        <FlexDiv $direction="column" key={videoTasks.title} $gap="12px" className="task-category">
          <FlexDiv $direction="column" $gap="8px">
            <FlexDiv $gap="5px" $align="center">
              {videoTasks.icon && <Image alt={videoTasks.title} width={24} height={24} src={videoTasks.icon} />}
              <P $fontSize="24px">{videoTasks.title}</P>
            </FlexDiv>
          </FlexDiv>

          {videoTasks.tasks.filter((task) => task?.active).map((task) => (
            task.comingSoon ? (
              <div key={task.title} style={{ position: 'relative', width: '100%', height: '104px', cursor: 'not-allowed', display: 'flex', border: '1px solid #535254', alignItems: 'center', borderRadius: '16px', backgroundColor: '#262527', justifyContent: 'space-between', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '14px' }}>
                  <Image src={task?.logo?.uri || ''} alt="Coming Soon" width={50} height={50} />
                  <div>
                    <p style={{ color: '#ADAAAD', fontSize: task.titleSize || '24px', lineHeight: '28px' }}>{task.title}</p>
                    <p style={{ color: '#ADAAAD', fontSize: '12px', lineHeight: '20px' }}>Coming soon</p>
                  </div>
                </div>
                <Image src={Img.Lock} alt='lock' width={30} height={30} />
              </div>
            ) : (
              <FlexDiv key={task.title} $gap="16px" $padding="16px" $border="1px solid #FFFFFF1A" $radius="16px" $align="center" $height="95px" className={`task`} onClick={() => chooseTask(task, socialTasks)}>
                {
                  task.logo && (
                    <FlexDiv $width="60px" $height="60px" $background={task.logo?.color || "transparent"} $radius="8px" $justify="center" $align="center">
                      {task.logo.uri && (
                        <Image src={task.logo.uri} alt="Task" width={task.logo.color ? 28 : 48} height={task.logo.color ? 28 : 48} style={{ "borderRadius": "8px" }} />
                      )}
                    </FlexDiv>
                  )
                }
                <FlexDiv className="text-content" $direction="column" $gap="4px">
                  <P $fontSize={task.titleSize || "24px"}>{task.title}</P>
                </FlexDiv>
                {
                  task.completed ? (
                    <Image src={Img.TaskCheck} alt="Proceed" width={24} height={24} />
                  ) : (
                    <Image src={Img.RightArrowImg} alt="Proceed" width={28} height={28} />
                  )
                }
              </FlexDiv>
            )
          ))}
        </FlexDiv>

        {/* Partner Tasks */}
        {partnerTaskGroups.filter((group) => !!group.tasks.find((task) => task.active)).map((group) => (
          <FlexDiv $direction="column" key={group.title} $gap="12px" className="task-category">
            <FlexDiv $direction="column" $gap="8px">
              <FlexDiv $gap="5px" $align="center">
                {group.icon && <Image alt={group.title} width={24} height={24} src={group.icon} />}
                <P $fontSize="24px">{group.title}</P>
              </FlexDiv>
              <P $fontSize="14px">Complete all tasks and receive {group.reward} {group.rewardAsset}</P>
            </FlexDiv>

            {
              group.tasks.filter((task) => task.active).map((task) => (
                <FlexDiv key={task.title} $gap="16px" $padding="16px" $border="1px solid #FFFFFF1A" $radius="16px" $align="center" $height="95px" className={`task ${task.completed ? 'completed' : ''}`} onClick={() => chooseTask(task, group)}>
                  {
                    task.logo && (
                      <FlexDiv $width="60px" $height="60px" $background={task.logo?.color || "transparent"} $radius="8px" $justify="center" $align="center">
                        {task.logo.uri && (
                          <Image src={task.logo.uri} alt="Task" width={task.logo.color ? 28 : 48} height={task.logo.color ? 28 : 48} style={{ "borderRadius": "8px" }} />
                        )}
                      </FlexDiv>
                    )
                  }
                  <FlexDiv className="text-content" $direction="column" $gap="4px">
                    <P $fontSize="24px">{task.title}</P>
                  </FlexDiv>
                  {
                    task.completed ? (
                      <Image src={Img.TaskCheck} alt="Proceed" width={24} height={24} />
                    ) : (
                      <Image src={Img.RightArrowImg} alt="Proceed" width={28} height={28} />
                    )
                  }
                </FlexDiv>
              ))
            }
          </FlexDiv>
        ))}

        {
          chosenTask && (
            <Modal align="flex-end" close={closeTask}>
              <FlexDiv $background="#111113E5" $width="100%" $maxHeight='100vh' $padding="24px" className="modal-content" $direction="column" $align="center" $position="relative" $overflowY='auto' $gap="16px">
                <Button className="close" onClick={closeTask}>X</Button>
                <P $fontSize="20px">{chosenTask.title}</P>

                {
                  chosenTask.claim ? (
                    <DailyClaim chosenTask={chosenTask} />
                  ) : chosenTask.type === 'video-task' ? (
                    <CommonTask
                      chosenTask={chosenTask}
                      categoryId={chosenTaskCategory?.categoryId}
                      handleActionButton={handleCheckVideoTaskButton}
                    />
                  ) : (
                    <CommonTask
                      chosenTask={chosenTask}
                      categoryId={chosenTaskCategory?.categoryId}
                      handleActionButton={handlePartnerCheckButton}
                    />
                  )
                }

                {
                  chosenTask.completed ? (
                    <FlexDiv $padding="10px 16px" $background="#79F8FF26" className="check" $width="100%" $radius="999px" $align="center" $gap="12px">
                      <Image src={Img.TaskCheck} alt="Proceed" width={24} height={24} />
                      <FlexDiv $direction="column" $gap="2px">
                        <P $color="#79F8FF" >Task completed!</P>
                        <P>Check your rewards in the Earn Page</P>
                      </FlexDiv>
                    </FlexDiv>
                  ) : (chosenTask?.referral || chosenTask?.type === 'social') && (
                    chosenTask?.cta === 'Open X' ? (
                      <div>
                        <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" onClick={buttonAction} $padding="18px" style={{ marginBottom: '16px' }}>
                          <FlexDiv $align="center" $gap="8px">
                            {
                              !chosenTask?.claim && (
                                <Image src={chosenTask?.referral ? Img.CopyImg : Img.OpenExternal} alt="Open External" width={24} height={24} />
                              )
                            }
                            <P>{chosenTask?.referral ? "Copy referral link" : chosenTask?.cta}</P>
                          </FlexDiv>
                        </Button>

                        <label style={{ color: '#FFFFFF' }}>Enter your X username to confirm interaction tasks</label>
                        <input style={{ color: '#FFFFFF', borderRadius: '16px', display: 'block', width: '100%', padding: '14px 16px', height: '56px', marginTop: '16px', backgroundColor: isLoading ? '#1B1B1D' : '#63636366', border: 'none', fontSize: '16px' }} disabled={isLoading} className='import-input' value={userName.toLowerCase()} placeholder='Username without @' onChange={(e) => setUserName(e.target.value.toLowerCase())} />

                        <button style={{ color: '#FFFFFF', padding: '16px 24px', borderRadius: '32px', width: '100%', marginTop: '16px', marginBottom: '16px', border: isLoading ? '1px solid #fff' : 'none', backgroundColor: isLoading ? '#363E59' : '#17181F' }} disabled={isLoading} onClick={() => checkTwitterAccount()}>{isLoading ? 'Confirming...' : 'Confirm username'}</button>
                      </div>
                    ) :
                      chosenTask.cta === 'Open Telegram' && chosenTask?.type === 'social' ? (
                        <div>
                          <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" onClick={buttonAction} $padding="18px" style={{ marginBottom: '16px' }}>
                            <FlexDiv $align="center" $gap="8px">
                              {
                                !chosenTask.claim && (
                                  <Image src={chosenTask.referral ? Img.CopyImg : Img.OpenExternal} alt="Open External" width={24} height={24} />
                                )
                              }
                              <P>{chosenTask.referral ? "Copy referral link" : chosenTask.cta}</P>
                            </FlexDiv>
                          </Button>

                          <label style={{ color: '#FFFFFF' }}>Send a private message with /id to <a href='https://t.me/conetGameUserBot' target='_blank' rel='noreferrer' style={{ color: '#8DA8FF', textDecoration: 'underline' }}>conetGameUserBot</a>, to get your telegram id, then input it in the field.</label>
                          <input style={{ color: '#FFFFFF', borderRadius: '16px', display: 'block', width: '100%', padding: '14px 16px', height: '56px', marginTop: '40px', backgroundColor: isLoading ? '#1B1B1D' : '#63636366', border: 'none', fontSize: '16px' }} disabled={isLoading} className='import-input' value={telegramId} onChange={(e) => setTelegramId(e.target.value)} />

                          <button style={{ color: '#FFFFFF', padding: '16px 24px', borderRadius: '32px', width: '100%', marginTop: '32px', border: isLoading ? '1px solid #fff' : 'none', backgroundColor: isLoading ? '#363E59' : '#17181F' }} disabled={isLoading} onClick={() => checkTelegramAccount()}>{isLoading ? 'Confirming...' : 'Confirm ID'}</button>
                        </div>
                      ) : chosenTask.cta === 'Open Instagram' && chosenTask?.type === 'social' ? (
                        <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" disabled={chosenTask.claim && isTodayRewardTaken} onClick={checkInstagramAccount} $padding="18px">
                          <FlexDiv $align="center" $gap="8px">
                            {
                              !chosenTask.claim && (
                                <Image src={chosenTask.referral ? Img.CopyImg : Img.OpenExternal} alt="Open External" width={24} height={24} />
                              )
                            }
                            <P>{chosenTask.referral ? "Copy Telegram Game Referral Link" : chosenTask.cta}</P>
                          </FlexDiv>
                        </Button>
                      ) : chosenTask.cta === 'Open Youtube' && chosenTask?.type === 'social' ? (
                        <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" disabled={chosenTask.claim && isTodayRewardTaken} onClick={checkYoutubeAccount} $padding="18px">
                          <FlexDiv $align="center" $gap="8px">
                            {
                              !chosenTask.claim && (
                                <Image src={chosenTask.referral ? Img.CopyImg : Img.OpenExternal} alt="Open External" width={24} height={24} />
                              )
                            }
                            <P>{chosenTask.referral ? "Copy Telegram Game Referral Link" : chosenTask.cta}</P>
                          </FlexDiv>
                        </Button>) :
                        (
                          <>
                            <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" disabled={chosenTask.claim && isTodayRewardTaken} onClick={buttonAction} $padding="18px">
                              <FlexDiv $align="center" $gap="8px">
                                {
                                  !chosenTask.claim && (
                                    <Image src={chosenTask.referral ? Img.CopyImg : Img.OpenExternal} alt="Open External" width={24} height={24} />
                                  )
                                }
                                <P>{chosenTask.referral ? "Copy Telegram Game Referral Link" : chosenTask.cta}</P>
                              </FlexDiv>
                            </Button>

                            {chosenTask.referral &&
                              <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" onClick={() => copyReferralLink(chosenTask.referral ? gameLink + profile?.keyID : "")} $padding="18px">
                                <FlexDiv $align="center" $gap="8px">
                                  <Image src={Img.CopyImg} alt="Open External" width={24} height={24} />
                                  <P>Copy Game Referral Link</P>
                                </FlexDiv>
                              </Button>
                            }
                          </>
                        )
                  )
                }

                {chosenTask?.claim && dailyClaimInfo?.todayDayOfWeek?.toString() && (
                  isTodayRewardTaken ?
                    <Button $cursor='not-allowed !important' $width="100%" $minHeight='55px' $radius="999px" $background={"gray"} disabled $padding="18px">
                      <FlexDiv $align="center" $gap="8px">
                        <P>{chosenTask.cta}</P>
                      </FlexDiv>
                    </Button> : (<Button $cursor='pointer' $width="100%" $minHeight='55px' $radius="999px" $background="#17181F" $border="1px solid #04DAE8" onClick={buttonAction} $padding="18px">
                      <FlexDiv $align="center" $gap="8px">
                        <P>{chosenTask.cta}</P>
                      </FlexDiv>
                    </Button>
                    )
                )}
              </FlexDiv>
            </Modal>
          )
        }

      </PageWrapper>
    </>
  )
}