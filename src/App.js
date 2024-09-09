import React, { useState } from "react";
import "./App.css";
import Div from "./Div";
import { useLocation } from "react-router-dom";
import Image from "./Image";

function App() {
  const [components, setComponents] = useState([]);
  const [routename, setReoutename] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);
  const location = useLocation();

  // Function to handle dropping of the component
  const handleDrop = (event) => {
    event.preventDefault();
    const componentType = event.dataTransfer.getData("componentType");

    if (componentType) {
      setComponents((prevComponents) => [
        ...prevComponents,
        { type: componentType, id: Date.now() },
      ]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDropReorder = (event, index) => {
    event.preventDefault();

    if (draggedIndex === null || draggedIndex === index) return; // Prevent invalid reordering

    const updatedComponents = [...components];
    const [draggedItem] = updatedComponents.splice(draggedIndex, 1); // Remove dragged item
    updatedComponents.splice(index, 0, draggedItem); // Insert dragged item at new index
    setComponents(updatedComponents);
    setDraggedIndex(null); // Reset dragged index after drop
  };

  const handleDeleteComponent = (index) => {
    setComponents((prevComponents) =>
      prevComponents.filter((_, i) => i !== index)
    );
  };

  const handleChangeRouteName = (e) => {
    setReoutename(e.target.value);
  };

  const handleSavePage = (value) => {
    if (routename === "") {
      alert("Route name can't be null");
      return;
    }
    const components = document.querySelectorAll(
      "#mainContentContainer .ComponentMarcup"
    );
    let content = "";

    components.forEach((component) => {
      content += component.outerHTML; // Combine the outerHTML of each element
    });
    localStorage.setItem("/" + routename, content);
    if (!!value) {
      window.location.href = `/${routename}`;
    }
  };

  const renderComponent = (component, index) => {
    let Comp = null;
    switch (component.type) {
      case "Div":
        Comp = <Div key={component.id} />;
        break;
      case "Image":
        Comp = <Image key={component.id} />;
        break;
      default:
        Comp = null;
    }

    return (
      <div
        key={component.id}
        draggable
        onDragStart={() => handleDragStart(index)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDropReorder(e, index)}
        className="flex"
      >
        <div className="flex-grow">
        {Comp}
        </div>
        <button
          className="bg-red-500 text-white  w-[100px] m-5"
          onClick={() => handleDeleteComponent(index)}
        >
          Delete
        </button>
      </div>
    );
  };

  if (location.pathname !== "/") {
    let savedContent = localStorage.getItem(location.pathname);
    return (
      <>
        <h2>Current Route: {location.pathname}</h2>{" "}
        <div dangerouslySetInnerHTML={{ __html: savedContent }} />
      </>
    );
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
        <div className="flex justify-between items-center">
          <div className="flex gap-5">
            <h4>Enter route name</h4>
            <input
              className="border border-red-500"
              type="text"
              onChange={handleChangeRouteName}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="border border-teal-500 border-r-2 p-2"
              onClick={() => handleSavePage(false)}
            >
              SAVE
            </button>
            <button
              className="border border-teal-500 border-r-2 p-2"
              onClick={() => handleSavePage(true)}
            >
              SAVE AND PREVIEW
            </button>
          </div>
        </div>
        <div className="border border-gray-800 pt-5 pb-5 mt-5">
          {components.length === 0 ? (
            <>
              <h2 className="m-5">Drop here to render component</h2>
              <div className="text-gray-500">No components added yet.</div>
            </>
          ) : (
            components.map((component, index) =>
              renderComponent(component, index)
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
