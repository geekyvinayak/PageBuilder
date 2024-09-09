import React, { useState } from "react";
import "./App.css";
import Div from "./Div";
import { useLocation } from "react-router-dom";
import Image from "./Image";
function App() {
  const [components, setComponents] = useState([]);
  const [marcup, setMarcup] = useState(<div></div>)
  const [routename,setReoutename] = useState(null)
  const location = useLocation();


  // Function to handle dropping of the component
  const handleDrop = (event) => {
    event.preventDefault();
    const componentType = event.dataTransfer.getData("componentType");

    // Dynamically render components based on the dropped component type
    setComponents((prevComponents) => [
      ...prevComponents,
      { type: componentType, id: Date.now() },
    ]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleChangeRouteName = (e) => {
    setReoutename(e.target.value);
  };

  const handleSavePage = (value) => {
    const components = document
      .querySelectorAll("#mainContentContainer .ComponentMarcup");
    let content = '';

    // Loop through selected elements and get their outerHTML
    components.forEach((component) => {
      content += component.outerHTML; // Combine the outerHTML of each element
    });
    localStorage.setItem("/"+routename, content);
    if(!!value){
      window.location.href = `/${routename}`;
    }
  };
  

  const renderComponent = (component) => {
    switch (component.type) {
      case "Div":
        return <Div key={component.id} />;
      case "Image":
        return <Image key={component.id} />;
      default:
        return null;
    }
  };

  if(location.pathname !== '/'){
    let savedContent = localStorage.getItem(location.pathname);
   return <><h2>Current Route: {location.pathname}</h2> <div dangerouslySetInnerHTML={{ __html: savedContent }} /></>;
  }

  return (
    <div className="bg-gray-100 h-[100vh] flex">
      {/* Sidebar menu */}
     
      <div className="w-1/4 bg-blue-200 p-5">
        <h2 className="mb-5">Drag Components</h2>
        <div
          draggable
          onDragStart={(e) => e.dataTransfer.setData("componentType", "Div")}
          className="p-3 bg-green-300 mb-3 cursor-pointer"
        >
          Div Component
        </div>
        <div
          draggable
          onDragStart={(e) => e.dataTransfer.setData("componentType", "Image")}
          className="p-3 bg-green-300 mb-3 cursor-pointer"
        >
          Image Component
        </div>
      </div>

      {/* Drop zone */}
      <div
        className="w-3/4 bg-white p-5 border-dashed border-4 border-gray-500 relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        id="mainContentContainer"
      > 
        <div className="flex gap-5"><h4>Enter route name</h4><input className='border border-red-500' type="text" onChange={(e)=>handleChangeRouteName(e)}/></div>
        <div className="border border-gray-800 pt-5 pb-5 mt-5">
        <h2 className="m-5">Drop here to render component</h2>
        {components.length === 0 ? (
          <div className="text-gray-500">No components added yet.</div>
        ) : (
          components.map((component) => renderComponent(component))
        )}
        </div>
        <div className='absolute right-5 top-5  flex gap-2'>
        <button className='border border-teal-500 border-r-2 p-2' onClick={()=>handleSavePage(false)} >SAVE</button>
        <button className='border border-teal-500 border-r-2 p-2' onClick={()=>handleSavePage(true)} >SAVE AND PREVIEW</button>
        </div>
      </div>
    </div>
  );
}

export default App;
