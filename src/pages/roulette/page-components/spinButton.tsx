import { Button } from "@/components/button";

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

  if (isUnlockingTicket) {
    return <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" disabled $background={"gray"}>
      Unlocking Ticket
    </Button>
  }

  if (!isTicketUnlocked) {
    return <Button $width="196px" $height="45px" $index={30} $radius="8px" $border="1px solid #04DAE8" onClick={handleTicketUnlock}>
      Unlock Ticket Use
    </Button>
  }

  if (ticketBalance === '0') {
    return <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" disabled $background={"gray"}>
      {pageState === 1 ? "Spin" : "Spin Again"}
    </Button>
  }

  if (isSpinning) {
    return <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" disabled $background={"gray"}>
      Spinning...
    </Button>
  }

  if (spinningCounter && spinningCounter > 0) {
    return <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" disabled $background={"gray"}>
      Wait {spinningCounter} more seconds
    </Button>
  }

  return <Button $width="196px" $height="45px" $index={30} $radius="8px" $border="1px solid #04DAE8" onClick={handleSpin}>
    {pageState === 1 ? "Spin" : "Spin Again"}
  </Button>
}

export default SpinButton;