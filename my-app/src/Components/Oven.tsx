import React from "react";
import styled from "styled-components";
import { Cookie } from "./Cookie";
const Container = styled.div`
  width: 150px;
  height: 150px;
  display: grid;
  background: #27da21;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

const CakePlace = styled.div`
  height: 30px;
  width: 45px;
  background: yellow;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: 1px orange solid;
  display: flex;
  justify-self: center;
  align-self: center;
  cursor: pointer;
`;

interface Props {
  cookiesInOvenArray: { id: number; color: string; place: string }[];
  setCookiesReadyToSell: React.Dispatch<React.SetStateAction<number>>;
  cookiesReadyToSell: number;
  setCookiesInOvenArray: React.Dispatch<React.SetStateAction<Cookie[]>>;
}

export const Oven: React.FC<Props> = ({
  cookiesInOvenArray,
  setCookiesReadyToSell,
  cookiesReadyToSell,
  setCookiesInOvenArray,
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
