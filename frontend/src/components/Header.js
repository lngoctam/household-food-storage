import React from "react";
import note from "../data/note";

function Header(props) {
  return (
    <header className="text-center">
      <h1>{props.header}</h1>
    </header>
  );
}

export default Header;
