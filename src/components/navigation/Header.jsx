import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

function Header() {
  const { activeNavPage, setActiveNavPage, tourItems } = useContext(AppContext);
  const items = tourItems.length;

  const handleClick = () => {
    if (activeNavPage === 0) {
      setActiveNavPage(1);
    } else {
      setActiveNavPage(2);
    }
  };

  return (
    <header className="aic-ct-header" aria-label="Custom tours builder">
      <div className="aic-ct__item-count" aria-live="polite">
        <span className="pill-box">{items}</span> artworks added{" "}
        <em>(of max 6)</em>
      </div>
      <button
        className="aic-ct-header__button"
        type="button"
        onClick={handleClick}
      >
        {activeNavPage === 0 && "Preview"}
        {activeNavPage > 0 && "Finish"}
      </button>
    </header>
  );
}

export default Header;