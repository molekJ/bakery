import React, { useState } from "react";
import styled from "styled-components";

const Ball = styled.div`
  background: yellow;
  border-radius: 50%;
`;

interface Props {
  setState: React.Dispatch<React.SetStateAction<any>>;
  state: number;
}

export const DoughShelf: React.FC<Props> = ({ setState, state }) => {
  const [size, setSize] = useState(100);
  return (
    <div>
      <Ball
        onClick={(e) => {
          setSize(size - 10);
          setState(state + 1);
        }}
        style={{
          width: size,
          height: size,
          background: size > 60 ? "green" : "red",
        }}
      ></Ball>
    </div>
  );
};
