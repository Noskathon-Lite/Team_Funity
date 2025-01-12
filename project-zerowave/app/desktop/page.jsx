'use client';
import { useState, useRef, useEffect } from "react";
import styles from '../../styles/main3.css';
import Link from 'next/link';

export default function Login() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [openApps, setOpenApps] = useState({});
  const [minimizedApps, setMinimizedApps] = useState({});
  const dragRefs = useRef({});

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleDoubleClick = (appName) => {
    setOpenApps((prev) => ({ ...prev, [appName]: true }));
    setMinimizedApps((prev) => ({ ...prev, [appName]: false }));
  };

  const handleMinimize = (appName) => {
    setMinimizedApps((prev) => ({ ...prev, [appName]: true }));
  };

  const handleClose = (appName) => {
    setOpenApps((prev) => ({ ...prev, [appName]: false }));
  };

  const handleDrag = (e, appName) => {
    const dragElement = dragRefs.current[appName];
    if (!dragElement) return;

    let shiftX = e.clientX - dragElement.getBoundingClientRect().left;
    let shiftY = e.clientY - dragElement.getBoundingClientRect().top;

    const moveAt = (pageX, pageY) => {
      dragElement.style.left = pageX - shiftX + 'px';
      dragElement.style.top = pageY - shiftY + 'px';
    };

    const onMouseMove = (event) => {
      moveAt(event.pageX, event.pageY);
    };

    document.addEventListener('mousemove', onMouseMove);

    dragElement.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      dragElement.onmouseup = null;
    };
  };

  useEffect(() => {
    return () => {
      // Clean up any mousemove event listeners when the component unmounts
      document.removeEventListener('mousemove', null);
    };
  }, []);

  return (
    <>
      <div id="top-desc"></div>
      <div id="top-panel"> 
        <p id="first">ZeroWave OS</p> 
        <p id="second">Jan 12, 2025, 04:27 PM</p>
        <img src="/img/wifi.svg" id="wifi" />
        <img src="/img/sound.svg" id="sound" />
        <img src="/img/battery.svg" id="battery" />
        <div
          className="app-container"
          onDoubleClick={() => handleDoubleClick("BioBuddy")}
        >
          <img src="/img/biobuddy.png" id="biobuddy" alt="BioBuddy" />
          <p id="btext">BioBuddy</p>
        </div>
        <div
          className="app-container2"
          onDoubleClick={() => handleDoubleClick("ClimaScope")}
        >
          <img src="/img/climascope.png" id="climascope" alt="ClimaScope" />
          <p id="ctext">ClimaScope</p>
        </div>
        <div
          className="app-container3"
          onDoubleClick={() => handleDoubleClick("ZeroWaste")}
        >
          <img src="/img/zerowaste.png" id="zerowaste" alt="ZeroWaste" />
          <p id="ztext">ZeroWaste</p>
        </div>
        <div
          className="app-container4"
          onDoubleClick={() => handleDoubleClick("ZeroWave")}
        >
          <img src="/img/zoom.png" id="zerowave" alt="ZeroWave" />
          <p id="zetext">ZeroWave</p>
        </div>
      </div>

      <br />

      {Object.keys(openApps).map(
        (app) =>
          openApps[app] &&
          !minimizedApps[app] && (
            <div
              key={app}
              className="app-window"
              ref={(el) => (dragRefs.current[app] = el)}
              onMouseDown={(e) => handleDrag(e, app)}
            >
              <div className="app-header">
                <button onClick={() => handleMinimize(app)} id="x1">-</button>
                <button onClick={() => handleClose(app)} id="x2">X</button>
              </div>
              <div className="app-content">
                <p>Welcome to {app}!</p>
              </div>
            </div>
          )
      )}

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
        
        {Object.keys(openApps).map(
          (app) =>
            openApps[app] && (
              <div key={app} className="taskbar-item">
                <img src={`/img/${app.toLowerCase()}.png`} alt={app} />
                <span>{app}</span>
              </div>
            )
        )}
      </section>
    </>
  );
}
