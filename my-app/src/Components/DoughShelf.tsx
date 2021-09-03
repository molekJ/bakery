import React from "react";
import styled from "styled-components";

const Ball = styled.div`
  border-radius: 50%;
  cursor: pointer;
  margin: 5px;
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
          background: size > 30 ? "var(--tinkerbell)" : "var(--basilica)",
        }}
      ></Ball>
    </div>
  );
};
