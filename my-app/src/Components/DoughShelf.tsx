import { stat } from "fs";
import React, { useState } from "react";
import styled from "styled-components";

const Ball = styled.div`
  background: yellow;
  border-radius: 50%;
`;

interface Props {
  setState: React.Dispatch<React.SetStateAction<any>>;
  rowCookie: number;
  setDoughtArray: React.Dispatch<React.SetStateAction<any>>;
  doughtArray: number[];
  index: number;
}

interface ArrayProps {
  index: number;
  setDoughtArray: React.Dispatch<React.SetStateAction<any>>;
  doughtArray: number[];
  size: number;
}

export const DoughShelf: React.FC<Props> = ({
  setState,
  rowCookie,
  setDoughtArray,
  doughtArray,
  index,
}) => {
  const [size, setSize] = useState(100);

  function deleteItem(props: ArrayProps) {
    if (size === 10) {
      return setDoughtArray(doughtArray.splice(index, 1));
    } else return;
  }

  return (
    <div>
      <Ball
        onClick={(e) => {
          setSize(size - 10);
          setState(rowCookie + 1);
          deleteItem({ index, doughtArray, size, setDoughtArray });
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
