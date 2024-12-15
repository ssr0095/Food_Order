import foodModel from "../models/foodModel.js";
import fs from "fs";

// ADD food
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
    console.log("error: " + error);
  }
};

// list foods
const listFoods = async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.json({ success: true, data: foods });
  } catch (error) {
    res.json({ success: false, message: "Error" });
    console.log("error: " + error);
  }
};

// Remove food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food deleted" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
    console.log("error: " + error);
  }
};

export { addFood, listFoods, removeFood };
