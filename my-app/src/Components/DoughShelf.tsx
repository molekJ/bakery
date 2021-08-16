import React, { useState } from "react";
import styled from "styled-components";
import { NamedTupleMember } from "typescript";

const Ball = styled.div`
  background: yellow;
  border-radius: 50%;
`;

interface Props {
  arrayDough: number[];
}

export const DoughShelf: React.FC = () => {
  const [size, setSize] = useState(100);
  return (
    <div>
      <Ball
        onClick={(e) => {
          setSize(size - 10);
        }}
        style={{ width: size, height: size }}
      ></Ball>
    </div>
  );
};
