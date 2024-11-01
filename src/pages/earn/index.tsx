import toast from 'react-hot-toast';
import BackButton from '@/components/backButton';
import CurrentBalance from '@/components/currentBalance';
import GuardianCard from '@/components/guardianCard';
import PageWrapper from '@/components/pageWrapper';
import { useEffect, useRef, useState } from 'react';
import { Div, FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { Task, taskCategories, TaskCategory } from '../../shared/earnTasks';
import Image from 'next/image';
import { Img } from '@/utilitiy/images';
import Modal from '@/components/modal';
import { Button } from '@/components/button';
import "./styles.css";
import DailyClaim from './page-components/DailyClaim';
import CommonTask from './page-components/CommonTask';
import DailyQuiz from './page-components/DailyQuiz';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import { checkSocialMedias, checkTwitter } from '@/API';
import { fetchCheckPartner, fetchCheckTelegram, fetchCheckTwitter, fetchClaimDailyReward } from '@/API/getData';
import copy from 'copy-to-clipboard';
import { selectPartner } from '@/shared/functions';

export default function Earn() {
  const [tasks, setTasks] = useState<TaskCategory[]>(taskCategories);
  const [chosenTask, setChosenTask] = useState<Task>();
  const [chosenTaskCategory, setChosenTaskCategory] = useState<TaskCategory>()
  const [userName, setUserName] = useState<string>('')
  const [telegramId, setTelegramId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [completedTaskCategory, setCompletedTaskCategory] = useState<TaskCategory>();
  const [isTodayRewardTaken, setIsTodayRewardTaken] = useState<boolean>(false)
  const [completedStabilityAi, setCompletedStabilityAi] = useState<boolean[]>([])
  const [completedBearfi, setCompletedBearfi] = useState<boolean[]>([])
  const [completedTapGear, setCompletedTapGear] = useState<boolean[]>([])
  const [completedFrogs, setCompletedFrogs] = useState<boolean[]>([])
  const [completedCognixphere, setCompletedCognixphere] = useState<boolean[]>([])

  const { profile, dailyClaimInfo } = useGameContext();

  let gameLink: string = "";

  if (typeof window !== 'undefined')
    gameLink = window?.location?.origin + "/?referrer=";

  const tgBotLink = "https://t.me/conetian_bot/?start=";

  useEffect(() => {
    const isTaken = profile?.dailyClaimWeek?.find((el: any, i: any) => i === dailyClaimInfo?.todayDayOfWeek)

    setIsTodayRewardTaken(isTaken)

    if (isTaken) {
      const tasksCopy = [...tasks]
      tasksCopy[1].tasks[0].completed = true
      setTasks(tasksCopy)
    }
  }, [dailyClaimInfo, profile?.dailyClaimWeek])

  useEffect(() => {
    let completedCategory: TaskCategory | undefined = undefined;

    tasks.filter((task) => task.reward && !task.completed).forEach((category) => {
      const anyUncompletedTask = category.tasks.find((task) => !task.completed);

      if (!anyUncompletedTask) {
        completedCategory = category;
      }
    })

    completedCategory &&
      setCompletedTaskCategory(completedCategory);
  }, [tasks]);

  useEffect(() => {
    async function fetchSocialMedias() {
      const res = await checkSocialMedias(profile?.keyID)

      const tasksCopy = [...tasks]

      if (res[1][0][0].length === 0) {
        tasksCopy[2].tasks[0].completed = false
        tasksCopy[2].tasks[1].completed = false
        tasksCopy[2].tasks[2].completed = false

        return
      }

      if (res[1][0][0].includes('2')) {
        tasksCopy[2].tasks[0].completed = true
      } else {
        tasksCopy[2].tasks[0].completed = false
      }

      if (res[1][0][0].includes('3')) {
        tasksCopy[2].tasks[1].completed = true
      } else {
        tasksCopy[2].tasks[1].completed = false
      }

      setTasks?.(tasksCopy)
    }

    fetchSocialMedias()
  }, [profile])

  useEffect(() => {
    async function fetchSocialMedias() {
      const res = await checkSocialMedias(profile?.keyID)

      const tasksCopy = [...tasks]

      if (res[1][0][0].length === 0) {
        tasksCopy[7].tasks[0].completed = false
        tasksCopy[7].tasks[1].completed = false
        tasksCopy[7].tasks[2].completed = false
        tasksCopy[8].tasks[0].completed = false
        tasksCopy[8].tasks[1].completed = false
        tasksCopy[8].tasks[2].completed = false
        tasksCopy[9].tasks[0].completed = false
        tasksCopy[10].tasks[0].completed = false
        tasksCopy[11].tasks[0].completed = false
        tasksCopy[12].tasks[0].completed = false

        return
      }

      if (res[1][0][0].includes('6')) {
        tasksCopy[7].tasks[0].completed = true
        tasksCopy[7].tasks[1].completed = true
        tasksCopy[7].tasks[2].completed = true
      } else {
        tasksCopy[7].tasks[0].completed = false
        tasksCopy[7].tasks[1].completed = false
        tasksCopy[7].tasks[2].completed = false
      }

      if (res[1][0][0].includes('7')) {
        tasksCopy[8].tasks[0].completed = true
        tasksCopy[8].tasks[1].completed = true
        tasksCopy[8].tasks[2].completed = true
      } else {
        tasksCopy[8].tasks[0].completed = false
        tasksCopy[8].tasks[1].completed = false
        tasksCopy[8].tasks[2].completed = false
      }

      if (res[1][0][0].includes('8')) {
        tasksCopy[9].tasks[0].completed = true
      } else {
        tasksCopy[9].tasks[0].completed = false
      }

      if (res[1][0][0].includes('9')) {
        tasksCopy[10].tasks[0].completed = true
      } else {
        tasksCopy[10].tasks[0].completed = false
      }

      if (res[1][0][0].includes('10')) {
        tasksCopy[11].tasks[0].completed = true
        tasksCopy[11].tasks[1].completed = true
      } else {
        tasksCopy[11].tasks[0].completed = false
        tasksCopy[11].tasks[1].completed = false
      }

      if (res[1][0][0].includes('11')) {
        tasksCopy[12].tasks[0].completed = true
        tasksCopy[12].tasks[1].completed = true
        tasksCopy[12].tasks[2].completed = true
      } else {
        tasksCopy[12].tasks[0].completed = false
        tasksCopy[12].tasks[1].completed = false
        tasksCopy[12].tasks[2].completed = false
      }

      setTasks?.(tasksCopy)
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
      const tasksCopy = [...tasks]
      tasksCopy[2].tasks[0].completed = true
      setTasks(tasksCopy)
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
      const tasksCopy = [...tasks]
      tasksCopy[2].tasks[1].completed = true
      setTasks(tasksCopy)
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

  const handlePartnerCheckButton = async () => {
    window.open(chosenTask?.resource, "_blank");

    setTimeout(async () => {
      if (chosenTask?.completed) return;
      if (!chosenTask?.resource) return;

      const tasksCopy = tasks ? [...tasks] : []

      if (chosenTaskCategory?.categoryId) {
        const selectedPartnerId = selectPartner(chosenTaskCategory?.categoryId)

        let auxArr: any[] = []

        if (chosenTaskCategory?.categoryId === 'bearfi') {
          auxArr = [...completedBearfi]
        }

        if (chosenTaskCategory?.categoryId === 'tap-gear') {
          auxArr = [...completedTapGear]
        }

        if (chosenTaskCategory?.categoryId === 'frogs') {
          auxArr = [...completedFrogs]
        }

        if (chosenTaskCategory?.categoryId === 'cognixphere') {
          auxArr = [...completedCognixphere]
        }

        if (selectedPartnerId.toString().includes('6')) {
          auxArr.push(true)
          setCompletedBearfi(auxArr)

          if (chosenTask?.taskId === 'bearfi_task-1') {
            tasksCopy[7].tasks[0].completed = true
          } else if (chosenTask?.taskId === 'bearfi_task-2') {
            tasksCopy[7].tasks[1].completed = true
          } else {
            tasksCopy[7].tasks[2].completed = true
          }

          if (auxArr.length < 3) return
        }

        if (selectedPartnerId.toString().includes('7')) {
          auxArr.push(true)
          setCompletedTapGear(auxArr)

          if (chosenTask?.taskId === 'tap-gear_task-1') {
            tasksCopy[8].tasks[0].completed = true
          } else if (chosenTask?.taskId === 'tap-gear_task-2') {
            tasksCopy[8].tasks[1].completed = true
          } else {
            tasksCopy[8].tasks[2].completed = true
          }

          if (auxArr.length < 3) return
        }

        if (selectedPartnerId.toString().includes('10')) {
          auxArr.push(true)
          setCompletedFrogs(auxArr)

          if (chosenTask?.taskId === 'frogs_task-1') {
            tasksCopy[11].tasks[0].completed = true
          } else {
            tasksCopy[11].tasks[1].completed = true
          }

          if (auxArr.length < 2) return
        }

        if (selectedPartnerId.toString().includes('11')) {
          auxArr.push(true)
          setCompletedCognixphere(auxArr)

          if (chosenTask?.taskId === 'cognixphere_task-1') {
            tasksCopy[12].tasks[0].completed = true
          } else if (chosenTask?.taskId === 'cognixphere_task-2') {
            tasksCopy[12].tasks[1].completed = true
          } else {
            tasksCopy[12].tasks[2].completed = true
          }

          if (auxArr.length < 3) return
        }

        const res = await fetchCheckPartner(profile?.keyID, selectedPartnerId.toString())

        if (!res.error) {
          if (selectedPartnerId.toString().includes('6')) {
            tasksCopy[7].tasks[0].completed = true
            tasksCopy[7].tasks[1].completed = true
            tasksCopy[7].tasks[2].completed = true
          }

          if (selectedPartnerId.toString().includes('7')) {
            tasksCopy[8].tasks[0].completed = true
            tasksCopy[8].tasks[1].completed = true
            tasksCopy[8].tasks[2].completed = true
          }

          if (selectedPartnerId.toString().includes('8')) {
            tasksCopy[9].tasks[0].completed = true
          }

          if (selectedPartnerId.toString().includes('9')) {
            tasksCopy[10].tasks[0].completed = true
          }

          if (selectedPartnerId.toString().includes('10')) {
            tasksCopy[11].tasks[0].completed = true
            tasksCopy[11].tasks[1].completed = true
          }

          if (selectedPartnerId.toString().includes('11')) {
            tasksCopy[12].tasks[0].completed = true
            tasksCopy[12].tasks[1].completed = true
            tasksCopy[12].tasks[2].completed = true
          }

          setTasks?.(tasksCopy)

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
      const tasksCopy = [...tasks]
      tasksCopy[1].tasks[0].completed = true
      setTasks(tasksCopy)

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
      <PageWrapper margin="32px 16px 160px 16px">
        <BackButton text="Earn" />

        <FlexDiv $direction="column" $gap="8px">
          <CurrentBalance inline asset="cntp" />
          <CurrentBalance inline asset="ticket" />
        </FlexDiv>

        <GuardianCard />
        {
          tasks.filter((category) => !!category.tasks.find((task) => task.active)).map((category) => (
            <FlexDiv $direction="column" key={category.title} $gap="12px" className="task-category">
              <FlexDiv $direction="column" $gap="8px">
                <FlexDiv $gap="5px" $align="center">
                  {category.icon && <Image alt={category.title} width={24} height={24} src={category.icon} />}
                  <P $fontSize="24px">{category.title}</P>
                </FlexDiv>
                {(category.reward && !category.completed) && (<P $fontSize="14px">Complete all tasks and receive {category.reward} {category.rewardAsset}</P>)}
              </FlexDiv>

              {
                category.tasks.filter((task) => task.active).map((task) => (
                  task.comingSoon ? (
                    <div key={task.title} style={{ position: 'relative', width: '100%', height: '104px', cursor: 'not-allowed', display: 'flex', border: '1px solid #535254', alignItems: 'center', borderRadius: '16px', backgroundColor: '#262527', justifyContent: 'space-between', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '14px' }}>
                        <Image src={task?.logo?.uri || ''} alt="Coming Soon" width={50} height={50} />
                        <div>
                          <p style={{ color: '#ADAAAD', fontSize: '24px', lineHeight: '28px' }}>{task.title}</p>
                          <p style={{ color: '#ADAAAD', fontSize: '12px', lineHeight: '20px' }}>Coming soon</p>
                        </div>
                      </div>
                      <Image src={Img.Lock} alt='lock' width={30} height={30} />
                    </div>
                  ) :
                    (
                      <FlexDiv key={task.title} $gap="16px" $padding="16px" $border="1px solid #FFFFFF1A" $radius="16px" $align="center" $height="95px" className={`task ${task.completed && !task.claim ? 'completed' : ''}`} onClick={() => chooseTask(task, category)}>
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
                    )
                ))
              }
            </FlexDiv>
          ))
        }
        {
          chosenTask && (
            <Modal align="flex-end" close={closeTask}>
              <FlexDiv $background="#111113E5" $width="100%" $maxHeight='100vh' $padding="24px" className="modal-content" $direction="column" $align="center" $position="relative" $overflowY='auto' $gap="16px">
                <Button className="close" onClick={closeTask}>X</Button>
                <P $fontSize="20px">{chosenTask.title}</P>
                {
                  chosenTask.claim ? (
                    <DailyClaim chosenTask={chosenTask} />
                  ) : chosenTask.quiz ? (
                    <DailyQuiz />
                  ) : (
                    <CommonTask
                      chosenTask={chosenTask}
                      categoryId={chosenTaskCategory?.categoryId}
                      handlePartnerCheckButton={handlePartnerCheckButton}
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
                      ) :
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

                {chosenTask.claim && !chosenTask.completed && dailyClaimInfo?.todayDayOfWeek.toString() && (
                  isTodayRewardTaken || !(tasks[2].tasks[0].completed || tasks[2].tasks[1].completed) ?
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