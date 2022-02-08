import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MessagengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

function App() {
  return (
    <Navbar>
      {/* <NavItem icon="😂">Home</NavItem>
      <NavItem icon="👋">Profile</NavItem>
      <NavItem icon="🤔">Friends</NavItem>
      <NavItem icon="💀">Settings</NavItem> */}

      <NavItem icon={<PlusIcon />}>Home</NavItem>
      <NavItem icon={<BellIcon />}>Profile</NavItem>
      <NavItem icon={<MessagengerIcon />}>Friends</NavItem>
      <NavItem icon={<CaretIcon />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");

  const [menuHeight, setMenuHeight] = useState(null);
  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      {/* in: renders animated children in if true */}
      {/* unmountOnExit: removes children when elaving */}
      {/* timeout: duration of animation */}
      {/* CSS transition looks for the first child element, when 'in', 
      it will add/removed css classes based on animation */}
      {/* onEnter: CSS transition lifecycle hook */}
      <CSSTransition
        classNames="menu-primary"
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="profiles">My Profile</DropdownItem>
          <DropdownItem goToMenu="settings" leftIcon={<CogIcon />}>
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        classNames="menu-secondary"
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
      >
        <div className="menu">
          <DropdownItem goToMenu="main">Main</DropdownItem>
          <DropdownItem goToMenu="profiles">My Profile</DropdownItem>
          <DropdownItem rightIcon={<ChevronIcon />}>idk</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
