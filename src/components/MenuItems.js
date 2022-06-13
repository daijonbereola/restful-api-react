import Dropdown from "./Dropdown";
import { useState, useEffect, useRef } from "react";

const MenuItems = ({ items, depthLevel }) => {
const [dropdown, setDropdown] = useState(false);

/*
const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
};
   
const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
};
*/

let ref = useRef();

useEffect(() => {
    const handler = (event) => {
     if (dropdown && ref.current && !ref.current.contains(event.target)) {
      setDropdown(false);
     }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
     // Cleanup the event listener
     document.removeEventListener("mousedown", handler);
     document.removeEventListener("touchstart", handler);
    };
}, [dropdown]); 

return (
  <li className="menu-items" ref={ref}>
   {items.submenu ? (
    <>
     <button 
        type="button" 
        aria-haspopup="menu"
        aria-expanded={dropdown ? "true" : "false"}
        onClick={() => setDropdown((prev) => !prev)}
        /*
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        */
        >
      {items.title}{" "}
      {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
     </button>
     <Dropdown 
        submenus={items.submenu}
        dropdown={dropdown}
        depthLevel={depthLevel}
     />
    </>
   ) : (
    <a href="/#">{items.title}</a>
   )}
  </li>
 );
};

export default MenuItems;