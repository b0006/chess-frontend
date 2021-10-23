import React from 'react';

import { ReactComponent as CrossIcon } from '../../../assets/common-icons/cross.svg';
import { ReactComponent as LoaderIcon } from '../../../assets/common-icons/loader.svg';
import { ReactComponent as CheckedIcon } from '../../../assets/common-icons/checked.svg';
import { ReactComponent as InfoIcon } from '../../../assets/common-icons/info.svg';
import { ReactComponent as WarningIcon } from '../../../assets/common-icons/warning.svg';
import { ReactComponent as GoogleIcon } from '../../../assets/common-icons/google.svg';
import { ReactComponent as VkIcon } from '../../../assets/common-icons/vk.svg';
import { ReactComponent as LogoutIcon } from '../../../assets/common-icons/logout.svg';
import { ReactComponent as ProfileIcon } from '../../../assets/common-icons/profile.svg';

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
  logout: LogoutIcon,
  profile: ProfileIcon,
};

export interface Props extends React.SVGAttributes<SVGElement> {
  /** Название иконки */
  kind?: keyof typeof ICON_LIST;
}

const SvgIcon: React.FC<Props> = ({ kind, ...rest }) => {
  if (!kind) {
    return null;
  }

  const Icon = ICON_LIST[kind];
  return <Icon {...rest} />;
};

export { SvgIcon };
