import React, { useState, useCallback, useEffect } from 'react';
import * as ChessJS from 'chess.js';

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
import { Props, ChessColor, LegalMoves, Board, PromotionPieceType } from './types';
import { useAiParty } from './useAiParty.hook';
import { useMoves } from './useMoves.hook';
import { BoardRow } from './BoardRow';

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
  const [legalMoves, setLegalMoves] = useState<LegalMoves | Record<string, never>>({});
  const [board, setBoard] = useState<Board>([]);
  const [squareActive, setSquareActive] = useState<ChessJS.Square | null>(null);
  const [squareTo, setSquareTo] = useState<{ from: ChessJS.Square | null; to: ChessJS.Square | null }>({
    from: null,
    to: null,
  });

  const resetCell = useCallback(() => {
    setSquareActive(null);
    setLegalMoves({});
  }, []);

  const _isRotate = myColor === 'b' ? !isRotate : isRotate;

  const computedNewBoard = useCallback(() => {
    const newBoard = stateChess.board();

    setBoard(() => (_isRotate ? [...newBoard].reverse().map((row) => [...row].reverse()) : newBoard));
  }, [_isRotate, stateChess]);

  useEffect(() => {
    computedNewBoard();
  }, [computedNewBoard]);

  const { staticMove, animationMove, boardRef } = useMoves({ stateChess, computedNewBoard, resetCell });
  useRandomGame({ isRandom, stateChess, staticMove, animationMove, withAnimation });
  useAiParty({ stateChess, difficult, myColor, versusAi, staticMove, animationMove, withAnimation });

  const setActiveCell = (square: ChessJS.Square) => {
    if (squareActive === square) {
      resetCell();
      return;
    }

    setSquareActive(square);

    const moves = stateChess.moves({ square, verbose: true });
    const legalMovesData = moves.reduce((result, move) => ({ ...result, [move.to]: move }), {});
    setLegalMoves(legalMovesData);
  };

  const onClickCell = (square: ChessJS.Square, color?: ChessColor, piece?: ChessJS.PieceType) => () => {
    if (isRandom) {
      return;
    }

    const actualTurn = stateChess.turn();
    if (myColor !== actualTurn) {
      return;
    }

    if ((!legalMoves[square] && !piece) || (!legalMoves[square] && piece && color !== myColor)) {
      resetCell();
      return;
    }

    if (legalMoves[square] && squareActive) {
      const isPromotion = Boolean(legalMoves[square].promotion);

      if (isPromotion) {
        setIsVisiblePromotion(true);
        setSquareTo({ from: squareActive, to: square });
      }

      withAnimation ? animationMove(squareActive, square) : staticMove(squareActive, square);
      return;
    }

    if (myColor === color && piece) {
      setActiveCell(square);
    }
  };

  const onChooseFigure = (pieceType: PromotionPieceType) => {
    if (squareTo.from && squareTo.to) {
      stateChess.move({ from: squareTo.from, to: squareTo.to, promotion: pieceType });
      setSquareTo({ from: null, to: null });
      computedNewBoard();
    }
  };

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
