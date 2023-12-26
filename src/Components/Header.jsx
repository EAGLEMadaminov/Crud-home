import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-blue-400 text-white py-5">
      <div className="container mx-auto flex justify-between">
        <h2 className="text-2xl">Logo</h2>
        <ul className="flex gap-4">
          <li className="text-xl">
            <Link to="/">Home</Link>
          </li>
          <li className="text-xl">
            <Link to="/users">Users</Link>
          </li>
          <li className="text-xl">
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
