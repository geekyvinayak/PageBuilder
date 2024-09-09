import React, { useState } from "react";

function Image() {
  const [content, setcontent] = useState("edit text");
  const [url, seturl] = useState(null);
  const [height, setheight] = useState();
  const [Width, setWidth] = useState();
  const [showSettings, setshowSettings] = useState(false);

  const handleContentChange = (e) => {
    seturl(e.target.value);
  };

  const handleHeightChange = (e) => {
    setheight(e.target.value);
  };
  const handleWidthChange = (e) => {
    setWidth(e.target.value);
  };
  return (
    <div className="m-5 border border-gray-500 relative min-h-[30px]">
        {url?<img className="ComponentMarcup" src={url} height={height} width={Width} />:<p>edit url for image to have preview</p>}
      <button className="absolute top-0 right-2" onClick={() => setshowSettings(!showSettings)}>
        showsettings
      </button>
      {showSettings && (
        <>
          <div className="border-pink-500 border p-5 flex gap-5 ml-10 mt-5">
            <div>Url</div>
            <input className='border-gray-500 border' onChange={(e) => handleContentChange(e)} />
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

export default Image;
