import React from 'react';
import { MoveCoins } from './StyledComponents';

function Movecoins({ fontSize, coins }) {
  return (
    <div className="flex h-fit flex-row items-center justify-center gap-1">
      <img
        src={'/assets/otm-logo-marketplace.svg'}
        alt="otm logo"
        style={{ height: fontSize, width: fontSize }}
      />
      <MoveCoins fontSize={fontSize}>{coins}</MoveCoins>
    </div>
  );
}

export default Movecoins;
