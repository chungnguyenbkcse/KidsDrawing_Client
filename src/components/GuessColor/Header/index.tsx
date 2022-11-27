import React from "react";
import styled from "styled-components";

type Props = {
  correct: Boolean;
  pickedColor: string;
};

const ContentHeader = styled.header<Props>`
  display: flex;
  justify-content: center;
  text-align: center;
  letter-spacing: 4px;
  padding-bottom: 24px;
  background: ${(props) =>
    props.correct ? props.pickedColor : "rgb(68, 120, 197)"};
  color: white;
  font-family: "Dosis", sans-serif;

  h1 {
    -webkit-text-stroke-width: 0.1px;
    -webkit-text-stroke-color: black;
    font-size: 3em;
  }
`;

/* const PickedColor = styled.span`
  font-size: 18px;
  text-decoration: underline;
`; */

const Header: React.FC<Props> = ({ correct, pickedColor }: Props) => {
  return (
    <ContentHeader correct={correct} pickedColor={pickedColor}>
      <div>
        <h1>Color Guessing Game</h1>
        <p>
          {/* Guess which block below is: <PickedColor>{pickedColor}</PickedColor> */}
          Guess which block below is:
        </p>
      </div>
    </ContentHeader>
  );
};

export default Header;
