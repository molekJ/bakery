import React from "react";

interface Props {
  nameAmount: string;
  amount: number;
  type?: "kg" | "szt" | "$";
}

export const DisplayAmount: React.FC<Props> = ({
  nameAmount,
  amount,
  type,
}) => {
  return (
    <div>
      <p>
        {nameAmount} : {amount}
        {type && type}
      </p>
    </div>
  );
};
