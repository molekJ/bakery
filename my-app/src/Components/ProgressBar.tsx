import React from "react";
import { LinearProgress } from "@material-ui/core";
import styled from "styled-components";

interface Props {
  progressValue: number;
}

const Container = styled.div`
  width: 90%;
  margin: 5px;
`;

export const ProgressBar: React.FC<Props> = ({ progressValue }) => {
  return (
    <Container>
      <LinearProgress variant="determinate" value={progressValue} />
      <LinearProgress variant="determinate" value={progressValue} />
      <LinearProgress variant="determinate" value={progressValue} />
    </Container>
  );
};
