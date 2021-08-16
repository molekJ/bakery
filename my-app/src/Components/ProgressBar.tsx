import React from "react";
import { LinearProgress } from "@material-ui/core";

interface Props {
  progressValue: number;
}

export const ProgressBar: React.FC<Props> = ({ progressValue }) => {
  return (
    <div>
      <LinearProgress variant="determinate" value={progressValue} />
    </div>
  );
};
