import React, { useEffect, useState, useRef } from "react";
import "./DragDropBoard.css";
const DragDropBoard = (props) => {
  const [listsData, setListDetails] = useState({});
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const handleOnDragStart = (event) => {
    setDragging(true);

    dragItem.current = event.target;
    setTimeout(() => dragItem.current.classList.add("dragging"), 0);
  };
  const handleOnDragOver = (event) => {
    dragOverItem.current = event.target;
    dragOverItem.current.classList.add("over");

    event.preventDefault();
  };
  const handleOnDrop = (event, listName) => {
    event.preventDefault();
    event.stopPropagation();

    if (dragOverItem.current.closest("li")) {
      dragOverItem.current.parentElement.insertBefore(
        dragItem.current,
        dragOverItem.current
      );
    } else {
      //get list named ul
      let ulElem = document.getElementById(listName);
      ulElem.appendChild(dragItem.current);
    }
    dragItem.current.classList.remove("dragging");
    dragOverItem.current = null;
    dragItem.current = null;

    if (dragging) {
      setDragging(false);
    }
  };
  useEffect(() => {
    //segragate the number of lists to prepare.

    let listDataTemp = {};
    props.list.map(({ label, type }) => {
      if (Array.isArray(listDataTemp[type])) {
        listDataTemp[type].push(label);
      } else {
        listDataTemp[type] = [label];
      }
    });

    setListDetails(listDataTemp);
  }, []);

  return (
    <div className="boardContainer">
      <div id="title">
        <h1> {props.name}</h1>
      </div>
      <div className="listContainer">
        {Object.keys(listsData).map((listName) => (
          <div className="typeContainer">
            <div className="typeName">{listName} </div>
            <ul
              className="list"
              id={`${listName}`}
              onDragOver={(e) => handleOnDragOver(e, listName)}
              onDrop={(e) => handleOnDrop(e, listName)}
            >
              {listsData[listName].map((label) => (
                <li
                  key={label}
                  className={`${listName} label`}
                  draggable
                  onDragStart={(e) => handleOnDragStart(e, { listName, label })}
                  onDragOver={(e) => handleOnDragOver(e, listName)}
                  onDrop={(e) => handleOnDrop(e, listName)}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragDropBoard;
