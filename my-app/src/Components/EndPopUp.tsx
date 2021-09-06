import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1000px;
  height: 500px;
  background: var(--yellow-transparent);
  z-index: 999;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
`;

const TextArea = styled.div`
  height: 80%;
  width: 90%;
  background: var(--tinkerbell);
`;

interface Props {
  setEndPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  endPopUp: boolean;
  secounds: number;
  score: number;
  clearScoreAndSecounds: () => void;
}

export const EndPopUp: React.FC<Props> = ({
  setEndPopUp,
  endPopUp,
  secounds,
  score,
  clearScoreAndSecounds,
}) => {
  return (
    <Container style={{ display: endPopUp ? "block" : "none" }}>
      <ButtonContainer>
        <button
          onClick={() => {
            setEndPopUp((endPopUp) => !endPopUp);
            clearScoreAndSecounds();
          }}
        >
          Zacznij od nowa
        </button>
      </ButtonContainer>
      <TextArea>
        <h1>Twój wynik:</h1>
        <p>
          Zdobyłeś: {score} punktów w {secounds} sekundy
        </p>

        <h1>Najlepszy wynik:</h1>
        <p>...wynik...</p>
        <p>..czas...</p>
      </TextArea>
    </Container>
  );
};
