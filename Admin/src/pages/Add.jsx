import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        setData((data) => ({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        }));
        setImage(false);
      }
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error");
      console.log("Error: " + error);
    }
  };

  return (
    <div className="no-scrollbar flex h-full w-4/5 items-start justify-center bg-gray-100 pb-20 pt-12">
      <form
        className="no-scrollbar flex h-full w-full flex-col gap-5 overflow-scroll rounded-xl bg-white p-6 shadow-xl shadow-slate-200 md:w-3/5"
        onSubmit={onSubmitHandler}
      >
        <div className="size-full space-y-2 md:size-3/5">
          <p className="text-base font-semibold text-gray-500">Upload Image</p>
          <label
            htmlFor="dropzone-file"
            className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-1 hover:bg-gray-100"
          >
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-3">
              {image ? (
                <div className="absolute flex size-full items-center justify-center rounded-lg bg-contain">
                  <img
                    src={URL.createObjectURL(image)}
                    className="rounded-lg bg-contain"
                  />
                </div>
              ) : (
                <>
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-center text-[0.9rem] text-gray-500">
                    Drag & Drop or{" "}
                    <span className="font-semibold text-tomato">
                      Choose to upload
                    </span>
                  </p>
                  <p className="text-center text-[0.7rem] font-semibold text-gray-400">
                    SVG, PNG, JPG, GIF
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              id="dropzone-file"
              required
              className="hidden"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </label>
        </div>

        <div className="space-y-2">
          <p className="text-base font-semibold text-gray-500">Product Name</p>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Name"
            required
            className="input"
          />
        </div>
        <div className="space-y-2">
          <p className="text-base font-semibold text-gray-500">Description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write here..."
            value={data.description}
            onChange={onChangeHandler}
            required
            className="input no-scrollbar"
          />
        </div>
        <div className="space-y-2">
          <p className="text-base font-semibold text-gray-500">Category</p>
          <select
            name="category"
            onChange={onChangeHandler}
            required
            className="input text-gray-400"
          >
            <option value="Salad">Salad</option>
            <option value="Salad">Salad</option>
            <option value="Salad">Salad</option>
            <option value="Salad">Salad</option>
            <option value="Salad">Salad</option>
            <option value="Salad">Salad</option>
            <option value="Salad">Salad</option>
            <option value="Salad">Salad</option>
          </select>
        </div>
        <div className="space-y-2">
          <p className="text-base font-semibold text-gray-500">Price</p>
          <input
            type="Number"
            name="price"
            placeholder="$"
            value={data.price}
            onChange={onChangeHandler}
            required
            className="input"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full rounded-lg bg-tomato px-4 py-2 text-base font-semibold text-white hover:bg-tomato-hov"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
