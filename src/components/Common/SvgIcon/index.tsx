import React from 'react';

import { ReactComponent as CrossIcon } from '../../../assets/common-icons/cross.svg';
import { ReactComponent as LoaderIcon } from '../../../assets/common-icons/loader.svg';
import { ReactComponent as CheckedIcon } from '../../../assets/common-icons/checked.svg';
import { ReactComponent as InfoIcon } from '../../../assets/common-icons/info.svg';
import { ReactComponent as WarningIcon } from '../../../assets/common-icons/warning.svg';
import { ReactComponent as GoogleIcon } from '../../../assets/common-icons/google.svg';
import { ReactComponent as VkIcon } from '../../../assets/common-icons/vk.svg';

const Empty: React.FC = () => null;

export const ICON_LIST = {
  undefined: Empty,
  cross: CrossIcon,
  loader: LoaderIcon,
  checked: CheckedIcon,
  info: InfoIcon,
  warning: WarningIcon,
  google: GoogleIcon,
  vk: VkIcon,
};

export interface IProps extends React.SVGAttributes<SVGElement> {
  /** Название иконки */
  kind?: keyof typeof ICON_LIST;
}

const SvgIcon: React.FC<IProps> = ({ kind, ...rest }) => {
  if (!kind) {
    return null;
  }

  const Icon = ICON_LIST[kind];
  return <Icon {...rest} />;
};

export { SvgIcon };
