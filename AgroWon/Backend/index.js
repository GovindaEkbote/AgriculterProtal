const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OkQrsSEom12v3h9utDiq2sdPq6xyh8xV4IFNgJu55L1CSdhu0LSE8SiUYepP36FGFQCJ7TkEAlKRPbkM9hOBHCs002qI8a8Kv"
);
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Agriculture_Portal")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Create upload endpoint for image
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
  });
});

// Schema for creating products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  old_price: {
    type: String,
    required: true,
  },
  new_price: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
      id: id,
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    console.log("Product saved");
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// Display all Products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Product fetched");
  res.send(products);
});
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    sucess: true,
    name: req.body.name,
  });
});

// creat User table
const users = mongoose.model("users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// User Register
// User Register
app.post("/signup", async (req, res) => {
  try {
    let check = await users.findOne({ email: req.body.email });
    if (check) {
      return res
        .status(409)
        .json({
          success: false,
          errors: "existing user found with same email id",
        });
    }

    let cart = {};
    for (let index = 0; index < 300; index++) {
      cart[index] = 0;
    }

    const user = new users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });
    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login user
app.post("/login", async (req, res) => {
  let user = await users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong email and password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong email and password" });
  }
});
// New Collection Data
app.get("/newcollections", async (req, res) => {
  try {
    let products = await Product.find({});
    let newCollection = products.slice(-8);
    res.json(newCollection);
  } catch (error) {
    console.error("Error fetching new collections:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Popular Products
app.get("/popularproducts", async (req, res) => {
  try {
    let products = await Product.find({ category: "Fatilizer" });
    let popularproducts = products.slice(0, 4);
    res.send(popularproducts);
  } catch (error) {
    console.error("Error fetching new collections:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// middlware to fetch user

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please verify using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please verify using a valid token" });
    }
  }
};

// addTocart
app.post("/addtocart", fetchUser, async (req, res) => {
  // console.log(req.body, req.user);
  console.log("Added", req.body.itemID);

  let userData = await users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemID] += 1;
  await users.findByIdAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});

// remove product from car data

app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemID);
  let userData = await users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemID] > 0)
    userData.cartData[req.body.itemID] -= 1;
  await users.findByIdAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});
// get car data
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});
app.post("/payment", async (req, res) => {
  const { products, customerDetails } = req.body; // Destructure to get products and customer details
  console.log(products);

  // Check if products is an array
  if (!Array.isArray(products)) {
    return res.status(400).json({ error: "Products should be an array" });
  }

  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: parseInt(product.price) * 100, // Convert price to an integer
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session", error);
    res
      .status(500)
      .json({ error: "Something went wrong while creating the session" });
  }
});

// // Payment Database

// const PaymentDetails = mongoose.model("paymentDetails", {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     mobile: {
//       type: Number,
//       required: true,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     pincode: {
//       type: Number,
//       required: true,
//     },
//     paymentMethod: {
//       type: String,
//       enum: ["COD", "Online"],
//       required: true,
//     },
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//   });
  
//   app.post("/paymentmethod", async (req, res) => {
//     const { name, email, mobile, address, pincode, paymentMethod } = req.body;
  
//     try {
//       // Create a new payment detail document
//       const paymentDetail = new PaymentDetails({
//         name,
//         email,
//         mobile,
//         address,
//         pincode,
//         paymentMethod,
//       });
  
//       // Save the payment details to the database
//       const savedPaymentDetail = await paymentDetail.save();
  
//       // Respond with a success message
//       res.status(200).json({
//         message: "Payment details saved successfully",
//         data: savedPaymentDetail,
//       });
//     } catch (error) {
//       // Catch any errors that occur and respond with a 400 status
//       res.status(400).json({
//         error: "Error saving payment details",
//         details: error.message,
//       });
//     }
//   });
  

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on port ${PORT}`);
  } else {
    console.log("Server is not running" + error);
  }
});
