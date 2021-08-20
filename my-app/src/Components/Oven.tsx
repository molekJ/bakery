import React from "react";
import styled from "styled-components";

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

export const Oven = () => {
  return (
    <Container>
      <CakePlace></CakePlace>
      <CakePlace></CakePlace>
      <CakePlace></CakePlace>
      <CakePlace></CakePlace>
      <CakePlace></CakePlace>
      <CakePlace></CakePlace>
      <CakePlace></CakePlace>
      <CakePlace></CakePlace>
      <CakePlace></CakePlace>
    </Container>
  );
};
