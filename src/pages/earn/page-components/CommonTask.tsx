import { Button } from '@/components/button';
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { Img } from '@/utilitiy/images';
import Image from 'next/image';
import { Task } from '../../../shared/earnTasks';
import { useTranslation } from 'react-i18next';

interface Props {
  chosenTask: Task;
  categoryId?: string;
  handleActionButton: () => Promise<void>;
}

export default function CommonTask({ chosenTask, categoryId, handleActionButton }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <FlexDiv $gap="12px" $align="center">
        {
          chosenTask?.logo && (
            <FlexDiv $width="100px" $height="100px" $background={chosenTask?.logo?.color || "transparent"} $radius="8px" $justify="center" $align="center">
              {chosenTask?.logo?.uri && (
                <Image src={chosenTask?.logo?.uri} alt="Task" width={chosenTask?.logo?.size || 100} height={chosenTask?.logo?.size || 100} style={{ "borderRadius": "8px" }} />
              )}
            </FlexDiv>
          )
        }

        <FlexDiv $flex={1} $direction="column" $gap="12px">
          <P $fontSize="14px">{chosenTask?.caption}</P>

          {chosenTask?.extraInstruction && <P $fontSize="10px" $color="#ADAAAD">{chosenTask?.extraInstruction}</P>}

          {chosenTask?.reward ?
            <FlexDiv $gap="5px" $align="center">
              <Image src={Img.Tickets} alt={t("components.supplies.tickets")} width={32} height={32} />
              <P $fontSize="14px">+ {chosenTask?.reward} {t("components.supplies.tickets")}</P>
            </FlexDiv> : ""
          }
        </FlexDiv>
      </FlexDiv>

      {(chosenTask?.type === 'partner' || chosenTask?.type === 'video-task') && (
        <FlexDiv $width='100%' $justify="center" $align="center" $gap="12px">
          <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" onClick={handleActionButton} $padding="18px">
            <FlexDiv $align="center" $gap="8px">
              <Image src={Img.OpenExternal} alt="Open External" width={24} height={24} />
              <P>{chosenTask.cta}</P>
            </FlexDiv>
          </Button>
        </FlexDiv>
      )}
    </>
  )
}