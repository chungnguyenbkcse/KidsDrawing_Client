import React from "react";
import ColorBlock from "./components/ColorBlock";
import styled from "styled-components";

type Props = {
  colors: Array<string>;
  correct: Boolean;
  difficulty: number;
  pickedColor: string;
  handleCorrect: Function;
  handleGameColors: Function;
  handleMessage: Function;
  handleButtonMessage: Function;
};

const GameSection = styled.section`
  padding: 64px 0px;
  padding-bottom: 120px;
  display: flex;
  justify-content: center;
  background: rgb(22, 20, 68);
  background: linear-gradient(
    90deg,
    rgba(22, 20, 68, 1) 0%,
    rgba(32, 32, 72, 1) 100%
  );

  @media (max-width: 767px) {
    padding: 32px 0px;
    padding-bottom: 80px;
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 30%;
`;

const Game: React.FC<Props> = ({
  colors,
  correct,
  difficulty,
  pickedColor,
  handleCorrect,
  handleGameColors,
  handleMessage,
  handleButtonMessage,
}: Props) => {
  const changeColors = (color: string) => {
    colors = [];
    for (let i = 0; i < difficulty; i++) {
      colors.push(color);
    }
    handleGameColors(colors);
  };

  const checkColor = (divColor: string, correctColor: string) => {
    if (divColor === correctColor) {
      changeColors(correctColor);
      handleCorrect(true);
      handleMessage("CHÍNH XÁC!");
      handleButtonMessage("CHƠI LẠI?");

      let gamesWonArr: string[] = [];
      var id_x = localStorage.getItem("gamesWon");

      if (id_x !== null) {
        gamesWonArr = id_x.split(",")!;
        gamesWonArr.push("1");
      }
      localStorage.setItem("gamesWon", gamesWonArr.toString());

      let averageDifficultyArr: string[] = [];
      var id_y = localStorage.getItem("averageDifficulty");

      if ( id_y !== null) {
        averageDifficultyArr = id_y.split(",")!;
        averageDifficultyArr.push(difficulty.toString());
      }
      localStorage.setItem(
        "averageDifficulty",
        averageDifficultyArr.toString()
      );

      return "visible";
    } else {
      handleMessage("THỬ LẠI NÀO!");
      return "hidden";
    }
  };

  return (
    <GameSection>
      <ColorGrid>
        {colors.map((color: string, index: number) => {
          return (
            <ColorBlock
              key={index}
              color={color}
              correct={correct}
              pickedColor={pickedColor}
              checkColor={checkColor}
              visible={"visible"}
            />
          );
        })}
      </ColorGrid>
    </GameSection>
  );
};

export default Game;
