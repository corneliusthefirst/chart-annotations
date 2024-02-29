import React from "react";
import { IconPropsType } from "../utils/types";

const Icon: React.FC<IconPropsType> = ({ id, ...props }) =>{
  return (
    <svg {...props}>
      <use href={`../assets/icons/sprite.svg#${id}`} />
    </svg>
  );
}

export default Icon
