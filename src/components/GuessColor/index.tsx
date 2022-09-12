import React, { useCallback, useState, useEffect, Dispatch } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Header from "./Header";
import Game from "./Game";
import Scoreboard from "./Scoreboard";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { useDispatch } from "react-redux";

type ButtonTypes = {
  buttonDifficulty: number;
  gameDifficulty: number;
};

const MenuBar = styled.section`
  display: flex;
  justify-content: center;
  background: rgb(22, 20, 68);
  background: linear-gradient(
    90deg,
    rgba(22, 20, 68, 1) 0%,
    rgba(32, 32, 72, 1) 100%
  );
  height: 40px;
  font-family: "Dosis", sans-serif;
`;

const MenuButton = styled(motion.button)`
  font-family: "Dosis", sans-serif;
  border: 0px;
  padding-top: 8px;
  padding-bottom: 8px;
  letter-spacing: 1.5px;
  background: rgba(0, 0, 0, 0);
  color: white;
  outline: none;
  font-weight: 600;

  transition: background 0.3s, color 0.3s;
  :hover {
    color: rgb(22, 20, 68);
    background: white;
    cursor: pointer;
  }
`;

const DifficultyButton = styled(MenuButton)<ButtonTypes>`
  margin: 0px 4px;

  background: ${(props) =>
    props.buttonDifficulty === props.gameDifficulty && "white"};

  color: ${(props) =>
    props.buttonDifficulty === props.gameDifficulty
      ? "rgb(22, 20, 68)"
      : "white"};
`;

const Message = styled.span`
  width: 30%;
  padding: 8px 0px;
  text-align: center;
  letter-spacing: 1.5px;
  color: white;
`;

const GuessColor = () => {
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Trò chơi", ""));
  const [difficulty, setDifficulty] = useState(6);
  const [gameColors, setGameColors] = useState([
    "rgb(91, 99, 77)",
    "rgb(200, 88, 111)",
    "rgb(90, 90, 88)",
    "rgb(100, 110, 120)",
    "rgb(91, 200, 105)",
    "rgb(8, 38, 240)",
  ]);
  const [pickedColor, setPickedColor] = useState("rgb(200, 88, 111)");
  const [correct, setCorrect] = useState(false);
  const [message, setMessage] = useState("");
  const [playButtonMessage, setPlayButtonMessage] = useState("NEW COLORS");

  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const generateRandomColors = useCallback((num: number) => {
    let colors = [];
    for (let i = 0; i < num; i++) {
      colors.push(randomColor());
    }

    const randomIndex = Math.floor(Math.random() * colors.length);
    setPickedColor(colors[randomIndex]);

    return colors;
  }, []);

  const resetGame = useCallback(() => {
    setCorrect(false);
    setGameColors(generateRandomColors(difficulty));
    setPlayButtonMessage("NEW COLORS");
    setMessage("");
  }, [generateRandomColors, difficulty]);

  const setupLocalStorage = () => {
    let gamesWon: string[] = [];
    var id_x = localStorage.getItem("gamesWon");
    if (id_x !== null) {
      gamesWon = id_x.split(",")!;
    }
    localStorage.setItem("gamesWon", gamesWon.toString());

    let averageDifficulty: string[] = [];
    var id_y = localStorage.getItem("averageDifficulty");
    if ( id_y !== null) {
      averageDifficulty = id_y.split(",")!;
    }
    localStorage.setItem("averageDifficulty", averageDifficulty.toString());
  };

  const init = useCallback(() => {
    setGameColors(generateRandomColors(difficulty));
    setupLocalStorage();
  }, [generateRandomColors, difficulty]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    resetGame();
  }, [resetGame, difficulty]);

  const difficultyButtons = [
    {
      difficulty: 3,
      text: "EASY",
    },
    {
      difficulty: 6,
      text: "MEDIUM",
    },
    {
      difficulty: 9,
      text: "HARD",
    },
  ];

  return (
    <>
      <Header pickedColor={pickedColor} correct={correct} />
      <div className="row pick-color mb-2 mt-2 mr-2 ml-2 text-center justify-content-md-center justify-content-center">
        <div className="col-xl-2 col-md-12 col-xs-12" style={{backgroundColor: pickedColor, height: "160px", width: '100px', border: 'border: 4px solid white', borderRadius: '30px'}}>
        </div>
      </div>
      
      <MenuBar>
        <MenuButton
          onClick={() => resetGame()}
          whileHover={{ scale: 1.1, transition: { duration: 0.75 } }}
          whileTap={{ scale: 1 }}
        >
          {playButtonMessage}
        </MenuButton>
        <Message>{message}</Message>
        {difficultyButtons.map((button) => {
          return (
            <DifficultyButton
              key={button.difficulty}
              onClick={() => setDifficulty(button.difficulty)}
              buttonDifficulty={button.difficulty}
              gameDifficulty={difficulty}
              whileHover={{ scale: 1.1, transition: { duration: 0.75 } }}
              whileTap={{ scale: 1 }}
            >
              {button.text}
            </DifficultyButton>
          );
        })}
      </MenuBar>
      <Game
        pickedColor={pickedColor}
        colors={gameColors}
        difficulty={difficulty}
        correct={correct}
        handleGameColors={setGameColors}
        handleCorrect={setCorrect}
        handleMessage={setMessage}
        handleButtonMessage={setPlayButtonMessage}
      />
      <Scoreboard correct={correct} />
    </>
  );
};

export default GuessColor;
