import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const getData = async () => {
    let { data: users } = await axios.get("/users");
    setUserCount(users.length);
    let { data: products } = await axios.get("/products");
    setProductCount(products.length);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="container mt-10 flex mx-auto justify-around text-white">
        <Link to="/users">
          <div className="border rounded-lg bg-blue-600  w-[300px] h-[250px] p-5 ">
            <h1 className="text-3xl font-bold text-center mb-2">
              Users count: {userCount}{" "}
            </h1>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85_ozJvM04kMWx0v9O82ZU36bIKazG7Q-5g&usqp=CAU"
              alt=""
              className="rounded-lg"
            />
          </div>
        </Link>
        <Link to="/products">
          <div className="border rounded-lg bg-blue-600  w-[300px] h-[250px] p-5">
            <h1 className="text-3xl font-bold mb-2">
              Products count: {productCount}{" "}
            </h1>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tmbPPpCURwGmVQJLL_6M4vx6XhVJ-MJ68A&usqp=CAU"
              alt=""
              className="rounded-lg w-full h-[170px]"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
