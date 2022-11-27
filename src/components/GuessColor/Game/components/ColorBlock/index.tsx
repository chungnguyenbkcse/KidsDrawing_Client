import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

type Props = {
  color: string;
  correct: Boolean;
  pickedColor: string;
  checkColor: Function;
  visible: string;
};

const MotionBlock = styled(motion.div)<{ visible: string }>`
  border: 4px solid white;
  width: 175px;
  height: 175px;
  border-radius: 30px;
  margin: 40px;
  background: ${(props) => props.color};
  visibility: ${(props) => props.visible};

  transition: border 0.5s;
  :hover {
    border: 3px solid black;
    cursor: pointer;
  }

  @media (max-width: 767px) {
    width: 100px;
    height: 100px;
    margin: 16px;
  }
`;

const ColorBlock: React.FC<Props> = ({
  color,
  correct,
  pickedColor,
  checkColor,
}: Props) => {
  const [visible, setVisibility] = useState("visible");

  useEffect(() => {
    setVisibility("visible");
  }, [color]);

  return (
    <MotionBlock
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.2, rotate: 90, y: -13 }}
      whileTap={{ scale: 0.8, rotate: -90, borderRadius: "100%" }}
      color={color}
      visible={visible}
      onClick={() => !correct && setVisibility(checkColor(color, pickedColor))}
    />
  );
};

export default ColorBlock;
