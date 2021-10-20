import React, { useState, useEffect } from 'react';
import * as ChessJS from 'chess.js';

import { Container } from '../../components/Layout/Container';
import { TemplateBoard } from '../../components/Board/TemplateBoard';

const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;

const StartPage: React.FC = () => {
  const [isRotate, setIsRotate] = useState(false);
  const [stateChess, setStateChess] = useState<ChessJS.ChessInstance>();

  useEffect(() => {
    const chess = new Chess();
    setStateChess(chess);
  }, []);

  if (!stateChess) {
    return null;
  }

  return (
    <Container>
      <button onClick={() => setIsRotate(!isRotate)}>Rotate</button>
      <TemplateBoard stateChess={stateChess} isRotate={isRotate} myColor="w" />
    </Container>
  );
};

export { StartPage };
