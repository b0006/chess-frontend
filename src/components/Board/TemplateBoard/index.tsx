import React from 'react';
import cn from 'classnames';
import * as ChessJS from 'chess.js';

import { HORIZONTAL_SYMBOLS, VERTICAL_SYMBOLS_REVERSE } from '../constants';
import { ICONS_DEFAULT, SvgIcon } from '../GameBoard/icons';
import { TChessBoard, TChessColor } from '../Wrapper/types';

import styles from './TemplateBoard.module.scss';

interface IProps {
  isRotate?: boolean;
  legalMoves?: any;
  squareActive?: ChessJS.Square;
  board?: TChessBoard;
  onClickPiece?: any;
  onClickCell?: any;
  isNoEvents?: boolean;
}

const TemplateBoard: React.FC<IProps> = ({
  onClickPiece,
  onClickCell,
  board = [],
  isRotate,
  squareActive,
  legalMoves = {},
  isNoEvents = false,
}) => {
  return (
    <div className={styles.board}>
      {HORIZONTAL_SYMBOLS.map((sym, symIndex) => {
        return (
          <div key={sym} className={styles.row}>
            {VERTICAL_SYMBOLS_REVERSE.map((_, digitindex) => {
              const id = `${HORIZONTAL_SYMBOLS[digitindex]}${VERTICAL_SYMBOLS_REVERSE[symIndex]}` as ChessJS.Square;
              const cellItem = board[symIndex] ? board[symIndex][digitindex] : null;

              const Icon: SvgIcon = cellItem ? ICONS_DEFAULT[cellItem.color][cellItem.type] : null;

              const _onClickCell = (
                event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>
              ) => {
                if (typeof onClickCell === 'function' && !isNoEvents) {
                  onClickCell(event, id, !Icon);
                }
              };

              const _onClickPiece = (square: ChessJS.Square, color: TChessColor) => () => {
                if (typeof onClickPiece === 'function' && !isNoEvents) {
                  onClickPiece(square, color);
                }
              };

              return (
                <div
                  tabIndex={0}
                  onKeyDown={_onClickCell}
                  onClick={_onClickCell}
                  key={id}
                  id={id}
                  className={cn(styles.cell, {
                    [styles['cell--no-events']]: isNoEvents,
                    [styles['cell--move']]: legalMoves[id],
                    [styles['cell--active']]: squareActive === id,
                    [styles['cell--rotate']]: isRotate,
                    [styles['cell--light']]: (symIndex + digitindex) % 2 === 0,
                    [styles['cell--dark']]: (symIndex + digitindex) % 2 !== 0,
                  })}
                >
                  {Icon && cellItem && (
                    <button className={styles.button} type="button" onClick={_onClickPiece(id, cellItem.color)}>
                      <Icon className={styles.icon} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export { TemplateBoard };
