import { ChessEngine } from './components/Board/TemplateBoard/types';

declare global {
  interface Window {
    STOCKFISH: () => ChessEngine;
  }
}

let STOCKFISH = window.STOCKFISH; 
