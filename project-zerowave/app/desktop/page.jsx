'use client';
import { useState, useRef, useEffect } from "react";
import styles from '../../styles/main3.css';
import Link from 'next/link';
import axios from "axios";  // Import axios for making requests

export default function Login() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [openApps, setOpenApps] = useState({});
  const [minimizedApps, setMinimizedApps] = useState({});
  const dragRefs = useRef({});
  const [ask, setAsk] = useState(""); // State for input data
  const [response, setResponse] = useState(""); // State for the API response

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  
  const handleSendClick = () => {
    // Send the data to Flask backend using Axios
    axios.post('http://localhost:5000/api/users', { ask })  // <-- Update the URL here
      .then((response) => {
        // Handle success, store the answer in state
        console.log(response.data);
        setResponse(response.data.answer);  // Display the answer from the API
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

  const handleInputChange = (e) => {
    setAsk(e.target.value); // Update ask state on input change
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
      document.removeEventListener('mousemove', null);
    };
  }, []);
  
  const appContent = {
    BioBuddy:
    <div id="side-panel">
      <img src="/img/biobuddy.png" alt="biobuddy" id="ll" /><img src="img/bio.png" alt="" id="ll2"/>
      <input type="text" placeholder="Search Chats" id="search" /><img src="img/search.svg" id="srch" />
      <button id="new">New Chat</button>
      <p id="hstry">History</p>
      <div id="center-panel">
  <input 
    type="text" 
    placeholder="Ask Anything................" 
    id="ask" 
    value={ask} 
    onChange={handleInputChange} // Update state on input change
  />
  <img 
    src="/img/send.svg" 
    id="send" 
    onClick={handleSendClick} // Trigger the send request when clicked
  />
  <img src="/img/voice.svg" id="voice"></img>
    
  {/* Display the response below the input field */}
  {response && <div id="response">{response}</div>} {/* This will show the response if it's available */}
</div>

      
    
    </div>
    
    
    ,
    ClimaScope: <div><h3>ClimaScope</h3><p>ClimaScope helps you track global climate trends. View and analyze climate change data to understand the impact on our planet.</p></div>,
    ZeroWaste: <div><h3>ZeroWaste</h3><p>ZeroWaste offers solutions for managing waste effectively. Learn how to reduce, reuse, and recycle to help minimize environmental impact.</p></div>,
    ZeroWave: <div><h3>ZeroWave</h3><p>ZeroWave is your gateway to sustainable technologies and initiatives aimed at climate action. Join us in making a change!</p></div>
  };

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
                {appContent[app]}
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
