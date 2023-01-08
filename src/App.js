import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

function App(props) {
  return (
    <div className="container">
      <Routes>
        <Route path="/" {...props} exact element={<Login />} />
        <Route path="/home" {...props} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
