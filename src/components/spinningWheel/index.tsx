import React, { memo } from 'react';
import dynamic from 'next/dynamic';

const OriginalWheel = dynamic<any>(() =>
  import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

export const MemoizedWheel = memo(OriginalWheel, (prevProps, nextProps) => {
  return (
    prevProps.mustStartSpinning === nextProps.mustStartSpinning &&
    prevProps.prizeNumber === nextProps.prizeNumber &&
    prevProps.data === nextProps.data
  );
});
