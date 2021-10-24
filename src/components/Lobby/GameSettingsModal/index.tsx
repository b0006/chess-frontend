import React from 'react';

import { ModalLayout } from '../../Common/ModalLayout';
import { Switcher } from '../../Common/Switcher';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const GameSettingsModal: React.FC<Props> = ({ isVisible, onClose }) => {
  return (
    <ModalLayout isVisible={isVisible} onClose={onClose} overlayClickClose>
      <form>
        <Switcher />
      </form>
    </ModalLayout>
  );
};

export { GameSettingsModal };
