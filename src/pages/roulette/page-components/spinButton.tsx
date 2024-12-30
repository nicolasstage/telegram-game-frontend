import { Button } from "@/components/button";
import { useTranslation } from 'react-i18next';

interface SpinButtonProps {
  ticketBalance: string;
  spinningCounter: number | undefined;
  pageState: 1 | 2 | 3 | 4 | 5;
  isTicketUnlocked: boolean;
  isUnlockingTicket: boolean;
  isSpinning: boolean;
  handleSpin: () => void;
  handleTicketUnlock: () => void;
}

const SpinButton = ({ ticketBalance, spinningCounter, pageState, isTicketUnlocked, isUnlockingTicket, isSpinning, handleSpin, handleTicketUnlock }: SpinButtonProps) => {
  const { t } = useTranslation();

  if (isUnlockingTicket) {
    return (
      <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" disabled $background={"gray"}>
        {t("components.spinButton.unlockingTicket")}
      </Button>
    );
  }

  if (!isTicketUnlocked) {
    return (
      <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" onClick={handleTicketUnlock}>
        {t("components.spinButton.unlockTicketUse")}
      </Button>
    );
  }

  if (ticketBalance === '0') {
    return (
      <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" disabled $background={"gray"}>
        {pageState === 1 ? t("components.spinButton.spin") : t("components.spinButton.spinAgain")}
      </Button>
    );
  }

  if (isSpinning) {
    return (
      <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" disabled $background={"gray"}>
        {t("components.spinButton.spinning")}
      </Button>
    );
  }

  if (spinningCounter && spinningCounter > 0) {
    return (
      <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" disabled $background={"gray"}>
        {t("components.spinButton.wait", { seconds: spinningCounter })}
      </Button>
    );
  }

  return (
    <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" onClick={handleSpin}>
      {pageState === 1 ? t("components.spinButton.spin") : t("components.spinButton.spinAgain")}
    </Button>
  );
};

export default SpinButton;
