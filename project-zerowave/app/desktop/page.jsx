'use client';
import { useState } from "react";
import styles from '../../styles/main3.css';
import Link from 'next/link';


export default function Login() {
  const [popupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <>
    
      <div id="top-desc">
       
       
      </div>
      < div id="top-panel"> 
      <p id="first">ZeroWave OS</p> <p id="second">Jan 12 , 2025 , 04:27 PM</p>
      <img src="/img/wifi.svg" id="wifi"/>
      <img src="/img/sound.svg" id="sound"/>
      <img src="/img/battery.svg" id="battery"/>
      <div className="app-container">
        <img src="/img/biobuddy.png" id="biobuddy" alt="BioBuddy" />
        <p id="btext">BioBuddy</p>
      </div>
      <div className="app-container2">
        <img src="/img/climascope.png" id="climascope" alt="Climascope" />
        <p id="ctext">ClimaScope</p>
      </div>
      <div className="app-container3">
        <img src="/img/zerowaste.png" id="zerowaste" alt="ZeroWaste" />
        <p id="ztext">ZeroWaste</p>
      </div>
      <div className="app-container4">
        <img src="/img/zoom.png" id="zerowave" alt="ZeroWave" />
        <p id="zetext">ZeroWave</p>
      </div>

      </div>
      

      <br />

      <section id="bottom-panel">
        <div id="menu-container">
          <img 
            src="/img/zoom.png" 
            alt="startmenu" 
            id="menu" 
            onClick={togglePopup} 
          />
          {popupVisible && (
            <div id="popup-menu">
              <a href="/login"><button id="logout-btn">Logout</button></a>
              <a href="/black"><button id="shutdown-btn">Shut Down</button></a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
