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
  setStartPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  startPopUp: boolean;
  setIsActiveTimer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StartPopup: React.FC<Props> = ({
  setStartPopUp,
  startPopUp,
  setIsActiveTimer,
}) => {
  return (
    <Container style={{ display: startPopUp ? "blok" : "none" }}>
      <ButtonContainer>
        <button
          onClick={() => {
            setStartPopUp(!startPopUp);
            setIsActiveTimer((old) => !old);
          }}
        >
          ZACZYNAMY
        </button>
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
        <p>
          Cena ciasteczka to 5$, jeżeli sprzedajemy na raz więcej jak 5
          ciasteczek, to cena wynosi 4$
        </p>
        <p>Za zarobione $$$ możemy kupić mąkę</p>
        <p>Gdy już mamy świeżą mąkę to możemy lepić kule ....</p>
        <p>
          Po jednym punkcie dostajemy za: ulepienie kuli ciasta, ulepienie
          ciasteczka, włożenie ciasteczka do piekarnika oraz wyjęcie gotowego
          ciasteczka. Za każdą sprzedaż dostajemy tyle punktów ile zarobiliśmy
          $. Zakup mąki to 10 punktów.{" "}
        </p>
        <p>Miłej zabawy!</p>
      </TextArea>
    </Container>
  );
};
