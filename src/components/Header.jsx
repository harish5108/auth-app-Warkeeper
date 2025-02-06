import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import Logout from "./Logout";


function Header() {
  
  return (
    <header>
      <h1>
        <HighlightIcon />
        Warkeeper
        <Logout />
      </h1>
      
    </header>
  );
}

export default Header;
