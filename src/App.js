import DragDropBoard from "./components/DragDropBoard";
import "./App.css";

function App() {
  const list = [
    { type: "todo", label: "grocery shopping" },
    { type: "todo", label: "costco shopping" },
    { type: "In Progress", label: "santa cruz drive" },
    { type: "In Progress", label: "school project" },
    { type: "Completed", label: "interview prep" },
  ];
  return (
    <div className="App">
      <DragDropBoard list={list} name={"Monthly Tasks list"} />
    </div>
  );
}

export default App;
