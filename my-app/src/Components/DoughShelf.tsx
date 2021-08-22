import React from "react";
import styled from "styled-components";

const Ball = styled.div`
  background: yellow;
  border-radius: 50%;
`;

interface Props {
  onDoughClick: () => void;
  size: number;
}

export const DoughShelf: React.FC<Props> = ({ onDoughClick, size }) => {
  return (
    <div>
      <Ball
        onClick={onDoughClick}
        style={{
          width: size,
          height: size,
          background: size > 60 ? "green" : "red",
        }}
      ></Ball>
    </div>
  );
};
