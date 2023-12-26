import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useId } from "react";

import axios from "axios";

const UserDatails = () => {
  const [user, setUSer] = useState({});
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef();
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userId;

  const getUser = async () => {
    let { data } = await axios.get(`/users/${userId}`);
    setUSer(data);
  };

  const showEditFormFunc = () => {
    setShowModal(true);
    console.log(formRef);
  };

  const deleteUserByIdFunc = async () => {
    console.log("ok");
    let { data } = await axios.delete(`/users/${userId}`);
    navigate("/users");
  };

  const editUSerFunc = async (e) => {
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
    let { data } = await axios.patch(`/users/${userId}`, user);
    setUSer(data);
    setShowModal(false);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <div className="ml-10 w-[300px] my-10">
        <p className="text-xl my-3">
          {" "}
          Name : <span className="font-semibold">{user.name}</span>
        </p>
        <p className="text-xl my-3">
          {" "}
          Username : <span className="font-semibold">{user.username}</span>
        </p>
        <p className="text-xl my-3">
          {" "}
          Email : <span className="font-semibold">{user.email}</span>
        </p>
        <p className="text-xl my-3">
          {" "}
          Address : <span className="font-semibold">{user.address}</span>
        </p>
        <p className="text-xl my-3">
          {" "}
          Contact : <span className="font-semibold">{user.contact}</span>
        </p>
        <p className="text-xl my-3">
          {" "}
          Role : <span className="font-semibold">{user.role}</span>
        </p>
        <button
          onClick={showEditFormFunc}
          className="border p-2 px-5 rounded-lg w-[120px] mt-3"
        >
          Edit
        </button>
        <button
          onClick={deleteUserByIdFunc}
          className="border p-2 px-5 rounded-lg w-[120px] mt-3 bg-[#EF4444] ml-3 text-white"
        >
          Delete
        </button>
      </div>

      {showModal ? (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
          onClick={() => setShowModal(false)}
          className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            ref={formRef}
            onSubmit={editUSerFunc}
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
            <div className="flex justify-around">
              <button
                type="submit"
                className="p-2 w-[200px] bg-black my-3 rounded-lg text-white text-xl "
              >
                Edit
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-[200px] p-2 bg-[#EF4444] my-3 rounded-lg text-white text-xl"
              >
                Cansel
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserDatails;
