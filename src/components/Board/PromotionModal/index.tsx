import React from 'react';

import { ModalLayout } from '../../Common/ModalLayout';
import { ChessColor, PromotionPieceType } from '../TemplateBoard/types';
import { ICONS_DEFAULT } from '../TemplateBoard/icons';

import styles from './PromotionModal.module.scss';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onChooseFigure: (pieceType: PromotionPieceType) => void;
  color: ChessColor;
}

const PromotionModal: React.FC<Props> = ({ color, onChooseFigure, isVisible, onClose }) => {
  const onClickFigure = (pieceType: PromotionPieceType) => {
    onChooseFigure(pieceType);
    onClose();
  };

  const renderIcon = (pieceType: PromotionPieceType) => {
    const Icon = ICONS_DEFAULT[color][pieceType];
    return (
      <button className={styles.figure} onClick={() => onClickFigure(pieceType)}>
        <Icon className={styles.icon} />
      </button>
    );
  };

  return (
    <ModalLayout
      classNameContent={styles.modal}
      overlayClickClose={false}
      isVisible={isVisible}
      showCloseButton={false}
      onClose={onClose}
    >
      <header>Выберите фигуру</header>
      <div className={styles.figures}>
        {renderIcon('n')}
        {renderIcon('b')}
        {renderIcon('r')}
        {renderIcon('q')}
      </div>
    </ModalLayout>
  );
};

export { PromotionModal };
