'use client';
import { useState, useRef, useEffect } from "react";
import styles from '../../styles/main3.css';
import Link from 'next/link';
import image from "next/image";

import axios from "axios";  // Import axios for making requests

export default function Login() {
  const [filePreview, setFilePreview] = useState(null); // State to store the file data
  const [filePreviewVisible, setFilePreviewVisible] = useState(false); // State to control visibility
  const [popupVisible, setPopupVisible] = useState(false);
  const [openApps, setOpenApps] = useState({});
  const [minimizedApps, setMinimizedApps] = useState({});
  const dragRefs = useRef({});
  const [ask, setAsk] = useState(""); // State for input data
  const [response, setResponse] = useState(""); // State for the API response


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFilePreview(event.target.result); // Set the file's data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  
  // Show the preview only after clicking the button
  const handleShowPreview = () => {
    if (filePreview) {
      setFilePreviewVisible(true);
    } else {
      alert("Please select a file first!");
    }
  };

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
  const handleInputChange2 = (e) => {
    setAsk2(e.target.value); // Update ask state on input change
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
    ClimaScope: 
    <div>
        <img src="/img/line_graph3.png" id="g1" />
        <img src="/img/line_graph2.png" id="g2" />
        <img src="/img/line_graph1.png" id="g3" />
    </div>,
    ZeroWaste: 
<div>
  <img src="/img/test.jpg" id="test"/>
  <p>To recycle a plastic bottle, you can: 
Empty and rinse: Remove any food, liquid, or residue. Leftover liquids can contaminate other recyclables and damage machinery. 
Leave on labels: The labels will be removed during the recycling process. 
Squash bottles: This saves space at the processing facility. 
Replace lids and tops: If the lid stays on, it will be recycled along with the bottle. 
Find a recycling center: You can use Earth 911 to find a recycling center or community drop-off program in your area. Your city or municipality should also provide a list of recycling options. 
Recycling plastic is important because it can: Conserve fossil fuels, Reduce energy consumption, Reduce landfill waste, and Reduce carbon dioxide emissions. </p>
  {/* File Input */}
  <input type="text" placeholder="Enter Path of File:"  id="image" />
 

  {/* Send SVG Button */}
  <button> <img src="/img/for.svg" id="fo" /></button>

  {/* Display the file preview only after clicking the button */}
  {filePreviewVisible && (
    <div id="file-preview">
      <img src={filePreview} alt="Preview" id="preview-img" />
    </div>
  )}
</div>,

    ZeroWave: 
    <div>
      <img src="/img/zoom.png" id="lulu" /><h2 id="lulu2">ZeroWave</h2>
      <section id="sec1"><img src="/img/biobuddy.png" id="bb" /><p id="bb2">BIOBUDDY</p><p id="bb3">an AI chatbot designed to educate, guide users towards climate actions and its changes. It offers personalized recommendations, tips, and insights on giving knowledge about climate and its changes on environment.</p></section>
      <section id="sec2"><img src="/img/climascope.png" id="cc" /><p id="cc2">CLIMASCOPE</p><p id="cc3">ClimaScope uses open-source environmental data to visualize and analyze climate change and pollution nation wide . This provides localized data about the climate change and pollution among the nation.</p></section>
      <section id="sec3"><img src="/img/zerowaste.png" id="zz" /><p id="zz2">ZEROWASTE</p><p id="zz3">ZeroWaste uses AI to identify recyclable materials and provide recycling instructions. Users can upload images of waste materials, and the system will guide them in sustainable waste disposal methods.</p></section>
    </div>
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
