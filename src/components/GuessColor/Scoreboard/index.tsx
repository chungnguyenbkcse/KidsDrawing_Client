import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

type Props = {
  correct: Boolean;
};

const PageBase = styled.section`
  display: flex;
  justify-content: center;
  background: rgb(22, 20, 68);
  background: linear-gradient(
    90deg,
    rgba(22, 20, 68, 1) 0%,
    rgba(32, 32, 72, 1) 100%
  );
`;

const ScoreboardContainer = styled.div`
  font-family: "Dosis", sans-serif;
  background: white;
  border-radius: 12px;
  padding: 20px;
  padding-bottom: 50px;
  margin-bottom: 100px;
  width: 60%;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const ScoreboardTitle = styled.h1`
  font-size: 40px;
  letter-spacing: 4px;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 12px;
  padding-bottom: 24px;
  background-image: linear-gradient(
    90deg,
    rgba(199, 0, 205, 1) 0%,
    rgba(91, 12, 121, 1) 100%,
    rgba(22, 20, 68, 1) 100%
  );
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatTitle = styled.p`
  width: 70%;
  font-size: 40px;
  letter-spacing: 4px;
  color: rgba(199, 0, 205, 1);
  padding-left: 20px;
  padding-bottom: 12px;
  border-bottom: 4px solid black;
  @media (max-width: 768px) {
    font-weight: 600;
    font-size: 24px;
  }
`;

const StatValue = styled.p`
  width: 30%;
  font-size: 40px;
  letter-spacing: 4px;
  color: rgba(199, 0, 205, 1);
  text-align: center;
  border-left: 4px solid black;
  border-bottom: 4px solid black;
  @media (max-width: 768px) {
    font-weight: 600;
    font-size: 24px;
  }
`;

const Scoreboard = ({ correct }: Props) => {
  const [gamesWon, setGamesWon] = useState(0);
  const [averageDifficulty, setAverageDifficulty] = useState("6");

  useEffect(() => {
    if (correct === true) {
      let wins: string[] = [];
      var id_x = localStorage.getItem("gamesWon");
      if (id_x !== null) {
        wins = id_x.split(",")!;
      }
      setGamesWon(wins.length - 1);

      let avgDifficulty: string[] = [];
      var id_y = localStorage.getItem("averageDifficulty");
      if (id_y !== null) {
        avgDifficulty = id_y.split(",")!;
        const difficultyMode = mode(avgDifficulty);
        if (difficultyMode) {
          setAverageDifficulty(difficultyMode);
        }
      }
    }
  }, [correct]);

  const mode = (arr: string[]) => {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  };

  const init = () => {
    let wins: string[] = [];
    var id_x = localStorage.getItem("gamesWon");
    if ( id_x !== null) {
      wins = id_x.split(",")!;
    }
    setGamesWon(wins.length === 0 ? 0 : wins.length - 1);

    let avgDifficulty: string[] = [];
    var id_y = localStorage.getItem("averageDifficulty");
    if (id_y != null) {
      avgDifficulty = id_y.split(",")!;
      const difficultyMode = mode(avgDifficulty);
      if (difficultyMode) {
        setAverageDifficulty(difficultyMode);
      }
    } else {
      setAverageDifficulty(avgDifficulty.length.toString());
    }
  };

  useEffect(() => {
    init();
  });

  const difficultyMap = useMemo(() => {
    if (averageDifficulty === "3") {
      return "Easy";
    } else if (averageDifficulty === "6") {
      return "Medium";
    } else if (averageDifficulty === "9") {
      return "Hard";
    }
  }, [averageDifficulty]);

  const scoreBoardStats: object[] = [
    {
      title: "Games Won",
      value: gamesWon,
    },
    {
      title: "Favorite Difficulty",
      value: difficultyMap ? difficultyMap : "Medium",
    },
  ];

  return (
    <PageBase>
      <ScoreboardContainer>
        <ScoreboardTitle>SCOREBOARD</ScoreboardTitle>
        {scoreBoardStats.map((stat: any) => {
          return (
            <FlexWrap>
              <StatTitle>{stat.title}</StatTitle>
              <StatValue>{stat.value}</StatValue>
            </FlexWrap>
          );
        })}
      </ScoreboardContainer>
    </PageBase>
  );
};

export default Scoreboard;
