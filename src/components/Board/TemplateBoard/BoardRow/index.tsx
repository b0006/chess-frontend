import React from 'react';
import cn from 'classnames';
import * as ChessJS from 'chess.js';

import { Board, ChessColor, LegalMoves } from '../types';
import { ICONS_DEFAULT } from '../icons';

import styles from './BoardRow.module.scss';

interface Props {
  verticalList: string[];
  horizontalList: string[];
  isRandom: boolean;
  isColoredMoves: boolean;
  legalMoves: LegalMoves | Record<string, never>;
  squareActive: ChessJS.Square | null;
  rowIndex: number;
  board: Board;
  onClickCell: (square: ChessJS.Square, color?: ChessColor, piece?: ChessJS.PieceType) => () => void;
}

const BoardRow: React.FC<Props> = ({
  isRandom,
  isColoredMoves,
  legalMoves,
  squareActive,
  verticalList,
  horizontalList,
  rowIndex,
  board,
  onClickCell,
}) => {
  return (
    <div className={styles.row}>
      {verticalList.map((_, digitindex) => {
        const id = `${horizontalList[digitindex]}${verticalList[rowIndex]}` as ChessJS.Square;
        const cellItem = board[rowIndex] ? board[rowIndex][digitindex] : null;

        const Icon = cellItem ? ICONS_DEFAULT[cellItem.color][cellItem.type] : null;

        return (
          <div
            tabIndex={0}
            onKeyDown={onClickCell(id, cellItem?.color, cellItem?.type)}
            onClick={onClickCell(id, cellItem?.color, cellItem?.type)}
            key={id}
            id={id}
            className={cn(styles.cell, {
              [styles['cell--no-events']]: isRandom,
              [styles['cell--move']]: isColoredMoves && legalMoves[id],
              [styles['cell--active']]: squareActive === id,
              [styles['cell--light']]: (rowIndex + digitindex) % 2 === 0,
              [styles['cell--dark']]: (rowIndex + digitindex) % 2 !== 0,
            })}
          >
            {Icon && <Icon className={styles.icon} />}
          </div>
        );
      })}
    </div>
  );
};

export { BoardRow };
