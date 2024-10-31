import { Wheel as OriginalWheel } from 'react-custom-roulette';
import React, { memo } from 'react';

export const MemoizedWheel = memo(OriginalWheel, (prevProps, nextProps) => {
  return (
    prevProps.mustStartSpinning === nextProps.mustStartSpinning &&
    prevProps.prizeNumber === nextProps.prizeNumber &&
    prevProps.data === nextProps.data
  );
});
