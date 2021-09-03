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
`;

const ButtonContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const TextArea = styled.div`
  height: 80%;
  width: 90%;
  background: var(--tinkerbell);
`;

interface Props {
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  popUp: boolean;
}

export const Popup: React.FC<Props> = ({ setPopUp, popUp }) => {
  return (
    <Container style={{ display: popUp ? "none" : "blok" }}>
      <ButtonContainer>
        <button>ZASADY</button>

        <button onClick={() => setPopUp(!popUp)}>ZACZYNAMY</button>
      </ButtonContainer>
      <TextArea>
        <h1>ZASADY GRY</h1>
        <p>Witamy Prezesa nowo powstałej piekarni! Zaczynamy biznes!</p>
        <p>Zasady są proste:</p>
        <p>100 kg mąki na start</p>
        <p>Z mąki lepimy kule ciasta</p>
        <p>Z kul ciasta lepimy surowe ciasteczka</p>
        <p>Surowe ciasteczka wkładamy do piekarnika</p>
        <p>Ciasteczka w piekraniku zmieniają kolor w zależności od czasu</p>
        <p>
          Tylko kliknięcie w brązowe ciasteczko spowoduje wyjęcie ciasteczka
          gotowego do sprzedaży! W innym wypadku tracimy ciasteczko
        </p>
        <p>Gdy ciasteczko przebywa zbyt długo w piekarniku - wyparowuje</p>
        <p>
          Co losowy okres czasu przychodzi klient i kupuje losowo wybraną ilość
          ciastek
        </p>
        <p>Za zarobione $$$ możemy kupić mąkę</p>
        <p>Gdy już mamy świeżą mąkę to możemy lepić kule ....</p>
        <p>Miłej zabawy!</p>
      </TextArea>
    </Container>
  );
};
