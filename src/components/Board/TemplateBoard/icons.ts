import * as ChessJS from 'chess.js';

import { ReactComponent as BishopDark } from '../../../assets/chess-icons/bishop-dark.svg';
import { ReactComponent as BishopLight } from '../../../assets/chess-icons/bishop-light.svg';
import { ReactComponent as KingDark } from '../../../assets/chess-icons/king-dark.svg';
import { ReactComponent as KingLight } from '../../../assets/chess-icons/king-light.svg';
import { ReactComponent as KnightDark } from '../../../assets/chess-icons/knight-dark.svg';
import { ReactComponent as KnightLight } from '../../../assets/chess-icons/knight-light.svg';
import { ReactComponent as PawnDark } from '../../../assets/chess-icons/pawn-dark.svg';
import { ReactComponent as PawnLight } from '../../../assets/chess-icons/pawn-light.svg';
import { ReactComponent as QueenDark } from '../../../assets/chess-icons/queen-dark.svg';
import { ReactComponent as QueenLight } from '../../../assets/chess-icons/queen-light.svg';
import { ReactComponent as RookDark } from '../../../assets/chess-icons/rook-dark.svg';
import { ReactComponent as RookLight } from '../../../assets/chess-icons/rook-light.svg';

import { ChessColor } from '.';

type IChessType = {
  [key in ChessJS.PieceType]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

type IIcons = {
  [key in ChessColor]: IChessType;
};

export const ICONS_DEFAULT: IIcons = {
  b: {
    q: QueenDark,
    b: BishopDark,
    r: RookDark,
    p: PawnDark,
    n: KnightDark,
    k: KingDark,
  },
  w: {
    q: QueenLight,
    b: BishopLight,
    r: RookLight,
    p: PawnLight,
    n: KnightLight,
    k: KingLight,
  },
};

export type SvgIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null;
