import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const getUsers = async () => {
    let { data } = await axios.get("/users");
    setUsers(data);
  };
  const showUserFunc = (id, e) => {
    console.log(e.target.id);
    if (e.target.id !== `button-${id}`) {
      navigate(`/users/${id}`);
    }
  };

  const deleteUserByIdFunc = async (id) => {
    let { data } = await axios.delete(`/users/${id}`);
    getUsers();
  };

  const searchUserfunc = async (e) => {
    e.preventDefault();
    let { data } = await axios.get(`/users/?q=${e.target[0].value}`);
    console.log(data);
    setUsers(data);
  };

  const createUserFunc = async (e) => {
    e.preventDefault();
    const form = e.target;
    let name = form[0].value;
    let email = form[1].value;
    let username = form[2].value;
    let address = form[3].value;
    let contact = form[4].value;
    let role = form[5].value;

    let user = {
      name,
      email,
      username,
      address,
      contact,
      role,
    };
    console.log(user);
    let { data } = await axios.post("/users", user);
    getUsers();
    setShowModal(false);
  };

  const handleChangeFunc = async (e) => {
    console.log(e.target.value);
    if (e.target.value === "all") {
      getUsers();
      return;
    }
    let { data } = await axios.get(`/users/?role=${e.target.value}`);
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="container mx-auto  justify-center">
      <div className="flex my-5 justify-around">
        <button
          onClick={() => setShowModal(true)}
          className="bg-black font-semibold text-white p-3 px-5 rounded-lg"
        >
          Create User
        </button>
        <form className="flex" onSubmit={searchUserfunc}>
          <input
            type="text"
            placeholder="Search by name..."
            className="border rounded-lg outline-none p-1 px-3"
          />
          <button
            type="submit"
            className="ml-4 p-1 px-5 rounded-lg bg-gray-300"
          >
            Search
          </button>
        </form>
        <select className="px-3" onChange={handleChangeFunc}>
          <option value="all">All</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <table className="text-center mx-auto">
        <thead>
          <tr>
            <th className="p-2 mx-5 w-[100px]">N/</th>
            <th className="p-2 mx-5 w-[200px]">Name</th>
            <th className="p-2 mx-5 w-[200px]">Email</th>
            <th className="p-2 mx-5 w-[200px] ">Contact</th>
            <th className="p-2 mx-5 w-[200px]">Address</th>
            <th className="p-2 mx-5 w-[200px]">Role</th>
            <th className="p-2 mx-5 w-[200px] ">N</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr
                key={index + 1}
                className="hover:cursor-pointer hover:bg-gray-200"
                onClick={(e) => showUserFunc(user.id, e)}
              >
                <td className="p-2 mx-3">{index + 1}</td>
                <td className="p-2 mx-3">{user.name}</td>
                <td className="p-2 mx-3">{user.email}</td>
                <td className="p-2 mx-3">{user.contact}</td>
                <td className="p-2 mx-3">{user.address}</td>
                <td className="p-2 mx-3">{user.role}</td>

                <td className="p-2 mx-3">
                  <button
                    id={`button-${user.id}`}
                    onClick={() => deleteUserByIdFunc(user.id)}
                    className="bg-[#EF4444]  p-2 rounded-lg text-white px-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal ? (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          onClick={() => setShowModal(false)}
          className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
        >
          <form
            onSubmit={createUserFunc}
            onClick={(e) => e.stopPropagation()}
            className="w-[500px] flex flex-col p-4 rounded-lg bg-white"
          >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              required
              className="border p-1 w-full px-2 rounded-lg my-1 "
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              required
              className="border p-1 w-full px-2 rounded-lg my-1 "
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="border p-1 w-full px-2 rounded-lg my-1 "
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              placeholder="Enter address"
              required
              className="border p-1 w-full px-2 rounded-lg my-1 "
            />
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              placeholder="Enter contact"
              required
              className="border p-1 w-full px-2 rounded-lg my-1 "
            />
            <label htmlFor="role">Role</label>
            <input
              type="text"
              placeholder="Enter role"
              className="border p-1 w-full px-2 rounded-lg my-1 "
            />
            <button className="p-1 w-full bg-blue-500 my-3 rounded-lg text-white text-xl ">
              Save
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default User;
