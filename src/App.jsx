import Home from "./Pages/Home.jsx";
import User from "./Pages/User.jsx";
import Header from "./Components/Header.jsx";
import Products from "./Pages/Products.jsx";
import UserDatails from "./Pages/UserDatails.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/users" element={<User />}></Route>
        <Route path="/users/:userId" element={<UserDatails />}></Route>
        <Route path="/products" element={<Products />}></Route>
      </Routes>
    </>
  );
}

export default App;
