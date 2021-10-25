import React, { useState, useCallback, useEffect } from 'react';

import {
  HORIZONTAL_SYMBOLS,
  HORIZONTAL_SYMBOLS_REVERSE,
  VERTICAL_SYMBOLS,
  VERTICAL_SYMBOLS_REVERSE,
} from '../constants';
import { PromotionModal } from '../PromotionModal';
import { Popup } from '../../Common/Popup';

import { HorizontalSymbols } from './HorizontalSymbols';
import { VerticalSymbols } from './VerticalSymbols';
import styles from './TemplateBoard.module.scss';
import { useRandomGame } from './useRandomGame.hook';
import { Props, Board } from './types';
import { useAiParty } from './useAiParty.hook';
import { BoardRow } from './BoardRow';
import { useUserActions } from './useUserActions.hook';

const TemplateBoard: React.FC<Props> = ({
  stateChess,
  isRotate,
  withAnimation = true,
  isColoredMoves = true,
  isRandom = false,
  myColor = 'w',
  versusAi = false,
  difficult = 3,
}) => {
  const [isVisibleGameOver, setIsVisibleGameOver] = useState(false);
  const [isVisiblePromotion, setIsVisiblePromotion] = useState(false);
  const [board, setBoard] = useState<Board>([]);

  const _isRotate = myColor === 'b' ? !isRotate : isRotate;

  const computedNewBoard = useCallback(() => {
    const newBoard = stateChess.board();

    setBoard(() => (_isRotate ? [...newBoard].reverse().map((row) => [...row].reverse()) : newBoard));
  }, [_isRotate, stateChess]);

  useEffect(() => {
    computedNewBoard();
  }, [computedNewBoard]);

  const { legalMoves, squareActive, staticMove, animationMove, onChooseFigure, onClickCell, boardRef } = useUserActions(
    {
      stateChess,
      setIsVisiblePromotion,
      isRandom,
      myColor,
      withAnimation,
      computedNewBoard,
    }
  );
  useRandomGame({ isRandom, stateChess, staticMove, animationMove, withAnimation });
  useAiParty({ stateChess, difficult, myColor, versusAi, staticMove, animationMove, withAnimation });

  useEffect(() => {
    if (stateChess.game_over() && !isRandom) {
      setIsVisibleGameOver(true);
    }
  }, [board, stateChess, isRandom]);

  const horList = _isRotate ? HORIZONTAL_SYMBOLS_REVERSE : HORIZONTAL_SYMBOLS;
  const verList = _isRotate ? VERTICAL_SYMBOLS : VERTICAL_SYMBOLS_REVERSE;

  return (
    <React.Fragment>
      <div className={styles.chessboard}>
        <div className={styles.inner}>
          <HorizontalSymbols isRotate={_isRotate} />
          <div className={styles.game}>
            <VerticalSymbols isRotate={_isRotate} />
            <div className={styles.board} ref={boardRef}>
              {horList.map((sym, symIndex) => (
                <BoardRow
                  key={sym}
                  rowIndex={symIndex}
                  onClickCell={onClickCell}
                  isRandom={isRandom}
                  isColoredMoves={isColoredMoves}
                  board={board}
                  horizontalList={horList}
                  verticalList={verList}
                  legalMoves={legalMoves}
                  squareActive={squareActive}
                />
              ))}
            </div>
            <VerticalSymbols isRotate={_isRotate} />
          </div>
          <HorizontalSymbols isRotate={_isRotate} />
        </div>
      </div>
      <PromotionModal
        isVisible={isVisiblePromotion}
        onChooseFigure={onChooseFigure}
        color={myColor}
        onClose={() => setIsVisiblePromotion(false)}
      />
      <Popup
        title="Game over"
        description="kurwa"
        isVisible={isVisibleGameOver}
        onClose={() => setIsVisibleGameOver(false)}
      />
    </React.Fragment>
  );
};

export { TemplateBoard };
