import React, { useState } from "react";

function Div() {
  const [content, setcontent] = useState("edit text");
  const [backgroundColor, setbackgroundColor] = useState("white");
  const [height, setheight] = useState();
  const [Width, setWidth] = useState();
  const [showSettings, setshowSettings] = useState(false);

  const handleContentChange = (e) => {
    setcontent(e.target.value);
  };

  const handleBackgroundChange = (e) => {
    setbackgroundColor(e.target.value);
  };

  const handleHeightChange = (e) => {
    setheight(e.target.value);
  };
  const handleWidthChange = (e) => {
    setWidth(e.target.value);
  };
  return (
    <div className="m-5 border border-gray-500 relative">
        <div className="ComponentMarcup" style={{ backgroundColor: backgroundColor ,height:`${height}`,width:`${Width}`}}>{content}</div>
      <button className="absolute top-0 right-2" onClick={() => setshowSettings(!showSettings)}>
        showsettings
      </button>
      {showSettings && (
        <>
          <div className="border-pink-500 border p-5 flex gap-5 ml-10">
            <div>content</div>
            <textarea className='border-gray-500 border' onChange={(e) => handleContentChange(e)} />
          </div>
          <div className="border-pink-500 border p-5 flex gap-5 ml-10 mt-5">
            <div>backgroundcolor</div>
            <input className='border-gray-500 border' onChange={(e) => handleBackgroundChange(e)} />
          </div>
          <div className="border-pink-500 border p-5 flex gap-5 ml-10 mt-5">
            <div>height</div>
            <input className='border-gray-500 border'  onChange={(e) => handleHeightChange(e)} />
          </div>
          <div className="border-pink-500 border p-5 flex gap-5 ml-10 mt-5">
            <div>width</div>
            <input className='border-gray-500 border'  onChange={(e) => handleWidthChange(e)} />
          </div>
        </>
      )}
    </div>
  );
}

export default Div;
