import React from "react";
type Props = {
  classSet: string;
};
const Pokeball = ({ classSet }: Props): JSX.Element => {
  return (
    <div className={`pokecontainer ${classSet}`}>
      <div className={`pokeball ${classSet}`}>
        <div className="halftop"></div>
        <div className="halfbottom"></div>
      </div>
      <div className={`centerball ${classSet}`}></div>
    </div>
  );
};

export default Pokeball;
