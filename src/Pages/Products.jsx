import { useState, useEffect } from "react";
import axios from "axios";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productId, setProductId] = useState("");

  const getAllProducts = async () => {
    let { data } = await axios.get("/products");
    setProducts(data);
  };

  const deleteProductFunc = async (id) => {
    let { data } = await axios.delete(`/products/${id}`);
    getAllProducts();
  };

  const createProductFunc = async (e) => {
    e.preventDefault();
    const form = e.target;
    let name = form[0].value;
    let price = form[1].value;
    let color = form[2].value;
    let category = form[3].value;
    let img = form[4].value;

    let product = {
      name,
      price,
      color,
      category,
      img,
    };
    console.log(product);
    let { data } = await axios.post("/products", product);
    getAllProducts();
    setShowCreateModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { data } = await axios.get(`/products/?q=${e.target[0].value}`);
    console.log(data);
    setProducts(data);
  };

  const updateProductFunc = async (e) => {
    e.preventDefault();
    const form = e.target;
    let name = form[0].value;
    let price = form[1].value;
    let color = form[2].value;
    let category = form[3].value;
    let img = form[4].value;

    let product = {
      name,
      price,
      color,
      category,
      img,
    };
    console.log(product);
    let { data } = await axios.put(`/products/${productId}`, product);
    getAllProducts();
    setShowUpdateForm(false);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-around my-10">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-black text-white p-2 px-5 rounded-lg"
        >
          Create{" "}
        </button>
        <form className="flex" onSubmit={handleSubmit}>
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
      </div>
      <div className="flex justify-around container mx-auto flex-wrap my-5">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="border p-3 mx-5 w-[300px] flex items-center flex-col justify-around my-3 rounded-lg"
            >
              <img src={product.img} alt="" />
              <div className="flex gap-2 flex-wrap justify-around ">
                <p>
                  Price : <span className="font-semibold">{product.price}</span>
                </p>
                <p>
                  Color : <span className="font-semibold">{product.color}</span>
                </p>{" "}
              </div>
              <p className="text-center my-4">
                Category :{" "}
                <span className="font-semibold">{product.category}</span>
              </p>
              <div className="flex justify-around ">
                <button
                  onClick={() => {
                    setShowUpdateForm(true), setProductId(product.id);
                  }}
                  className="bg-black text-white p-2 px-5 rounded-lg"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteProductFunc(product.id)}
                  className="bg-[#EF4444] text-white ml-3 p-2 px-5 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showCreateModal ? (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          onClick={() => setShowCreateModal(false)}
          className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
        >
          <form
            onSubmit={createProductFunc}
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
            <label htmlFor="price">Price</label>
            <input
              type="text"
              placeholder="Enter price"
              required
              className="border p-1 w-full px-2 rounded-lg my-1 "
            />
            <label htmlFor="color">Color</label>
            <input
              type="text"
              placeholder="Enter color"
              className="border p-1 w-full px-2 rounded-lg my-1 "
            />
            <label htmlFor="category">Category</label>
            <input
              type="text"
              placeholder="Enter category"
              required
              className="border p-1 w-full px-2 rounded-lg my-1 "
            />
            <label htmlFor="image">Image</label>
            <input
              type="url"
              placeholder="Enter image"
              required
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

      {showUpdateForm ? (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          onClick={() => setShowUpdateForm(false)}
          className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
        >
          <form
            onSubmit={updateProductFunc}
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
            <label htmlFor="price">Price</label>
            <input
              type="text"
              placeholder="Enter price"
              required
              className="border p-1 w-full px-2 rounded-lg my-1 "
            />
            <label htmlFor="color">Color</label>
            <input
              type="text"
              placeholder="Enter color"
              className="border p-1 w-full px-2 rounded-lg my-1 "
            />
            <label htmlFor="category">Category</label>
            <input
              type="text"
              placeholder="Enter category"
              required
              className="border p-1 w-full px-2 rounded-lg my-1 "
            />
            <label htmlFor="image">Image</label>
            <input
              type="url"
              placeholder="Enter image"
              required
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

export default Products;
