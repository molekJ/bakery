import React from "react";
import styled from "styled-components";

interface Props {
  nameAmount: string;
  amount: number;
  type?: "kg" | "szt" | "$";
}

const Container = styled.div`
  padding: 10px 10px;
  border-radius: 5px;
  font-weight: 600;
  letter-spacing: 1px;
`;

export const DisplayAmount: React.FC<Props> = ({
  nameAmount,
  amount,
  type,
}) => {
  return (
    <Container>
      <p>
        {nameAmount} : {amount}
        {type && type}
      </p>
    </Container>
  );
};
