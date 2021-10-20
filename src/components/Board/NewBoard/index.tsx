import React, { useState, useEffect } from 'react';
import * as ChessJS from 'chess.js';
import cn from 'classnames';

import { HorizontalSymbols } from '../HorizontalSymbols';
import { TemplateBoard } from '../TemplateBoard';
import { VerticalSymbols } from '../VerticalSymbols';
// import { TChessBoard } from '../Wrapper/types';

import styles from './NewBoard.module.scss';

const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;

const NewBoard: React.FC = () => {
  const [isRotate, setIsRotate] = useState(false);
  const [stateChess, setStateChess] = useState<ChessJS.ChessInstance>();
  // const [boardState, setBoardState] = useState<TChessBoard>([]);

  useEffect(() => {
    const chess = new Chess();
    setStateChess(chess);
    // setBoardState(chess.board());
  }, []);

  // const onClickCell = () => {
  //   console.log('click cell');
  // };

  // const onClickPiece = () => {
  //   console.log('onClickPiece');
  // };

  if (!stateChess) {
    return null;
  }

  return (
    <div>
      <button onClick={() => setIsRotate(!isRotate)}>Rotate</button>
      <div className={styles.chessboard}>
        <div className={cn(styles.inner, { [styles['inner--rotate']]: isRotate })}>
          <HorizontalSymbols isRotate={isRotate} />
          <div className={styles.game}>
            <VerticalSymbols isRotate={isRotate} />
            <TemplateBoard stateChess={stateChess} isRotate={isRotate} myColor="w" />
            <VerticalSymbols isRotate={isRotate} />
          </div>
          <HorizontalSymbols isRotate={isRotate} />
        </div>
      </div>
    </div>
  );
};

export { NewBoard };
