import cssObj from "./Header.module.css";

import { styled } from "styled-components";

const My_li = styled.li`
  list-style: none;
  display: inline;
  margin-right: 60px;
  font-size: 20px;
  padding: 18px;
  transition: all 0.2s ease;
  border: 2px solid transparent;
`;

export default function Header() {
  return (
    <nav>
      <ul>
        <My_li className={cssObj.mast}>Home</My_li>
        <My_li className={cssObj.mast}>About</My_li>
        <My_li className={cssObj.mast}>Contact</My_li>
      </ul>
      <ul>
        <li className={cssObj.mast}>
          <span className={cssObj.red}>Get In Touch</span>
        </li>
      </ul>
    </nav>
  );
}
