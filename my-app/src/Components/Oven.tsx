import React from "react";
import styled from "styled-components";
import { Cookie } from "./Cookie";
const Container = styled.div`
  width: 60vh;
  height: 60vh;
  display: grid;
  background: var(--tinkerbell);
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);

  @media screen and (max-width: 768px) {
    width: 400px;
    height: 400px;
  }
  @media screen and (max-width: 576px) {
    width: 200px;
    height: 400px;
  }
`;

const CakePlace = styled.div`
  height: 50%;
  width: 80%;
  background: yellow;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  justify-self: center;
  align-self: center;
  cursor: pointer;

  @media screen and (max-width: 576px) {
    height: 80%;
    width: 90%;
  }
`;

interface Props {
  cookiesInOvenArray: { id: number; color: string; place: string }[];
  setCookiesReadyToSell: React.Dispatch<React.SetStateAction<number>>;
  setCookiesInOvenArray: React.Dispatch<React.SetStateAction<Cookie[]>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export const Oven: React.FC<Props> = ({
  cookiesInOvenArray,
  setCookiesReadyToSell,
  setCookiesInOvenArray,
  setScore,
}) => {
  const pullOutCookie = (color: string, ID: number) => {
    setCookiesInOvenArray((old) =>
      old.map((cookie) =>
        cookie.id !== ID ? cookie : { ...cookie, place: "fridge" }
      )
    );
    setCookiesInOvenArray((old) =>
      old.filter((cookie) => cookie.place === "oven")
    );

    if (color === "brown") {
      setCookiesReadyToSell((cookiesReadyToSell) => cookiesReadyToSell + 1);
      setScore((score) => score + 1);
    }
  };
  return (
    <Container>
      {cookiesInOvenArray.map((element) => {
        return (
          <CakePlace
            onClick={() => {
              pullOutCookie(element.color, element.id);
            }}
            key={element.id}
            style={{
              background: element.color,
            }}
          />
        );
      })}
    </Container>
  );
};
