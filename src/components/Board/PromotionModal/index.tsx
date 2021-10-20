import React from 'react';

import { ModalLayout } from '../../Common/ModalLayout';
import { ChessColor, PromotionPieceType } from '../TemplateBoard';
import { ICONS_DEFAULT } from '../TemplateBoard/icons';

import styles from './PromotionModal.module.scss';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onChooseFigure: (pieceType: PromotionPieceType) => void;
  color: ChessColor;
}

const PromotionModal: React.FC<IProps> = ({ color, onChooseFigure, isVisible, onClose }) => {
  const KnightIcon = ICONS_DEFAULT[color]['n'];
  const BishopIcon = ICONS_DEFAULT[color]['b'];
  const RookIcon = ICONS_DEFAULT[color]['r'];
  const QueenIcon = ICONS_DEFAULT[color]['q'];

  const onClickFigure = (pieceType: PromotionPieceType) => {
    onChooseFigure(pieceType);
    onClose();
  };

  return (
    <ModalLayout classNameContent={styles.modal} overlayClickClose={false} isVisible={isVisible} onClose={onClose}>
      <header>Выберите фигуру</header>
      <div className={styles.figures}>
        <button className={styles.figure} onClick={() => onClickFigure('n')}>
          <KnightIcon className={styles.icon} />
        </button>
        <button className={styles.figure} onClick={() => onClickFigure('b')}>
          <BishopIcon className={styles.icon} />
        </button>
        <button className={styles.figure} onClick={() => onClickFigure('r')}>
          <RookIcon className={styles.icon} />
        </button>
        <button className={styles.figure} onClick={() => onClickFigure('q')}>
          <QueenIcon className={styles.icon} />
        </button>
      </div>
    </ModalLayout>
  );
};

export { PromotionModal };
