const express = require("express");
const app = express();
const crypto = require("crypto");
const cors = require("cors");
const Nodemailer = require("nodemailer"); // Corrected nodemailer import
const mongoose = require("mongoose");
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb://taimourkhan836:khan@ac-imfmba8-shard-00-00.yexdxhl.mongodb.net:27017,ac-imfmba8-shard-00-01.yexdxhl.mongodb.net:27017,ac-imfmba8-shard-00-02.yexdxhl.mongodb.net:27017/?ssl=true&replicaSet=atlas-12hz7i-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

const User = require("./models/user");
const Order = require("./models/order");

const sendEmailVerification = async (email, verificationToken) => {
  const transporter = Nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "taimourkhan836@gmail.com",
      pass: "alox dkml rjxf rwzt",
    },
  });

  const mailOptions = {
    from: "Amazon.com",
    to: email,
    subject: "Email verification",
    text: `Please verify your email: http://192.168.43.109:5000/verify/${verificationToken}`, // Corrected URL and added missing slash
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending email verification:", error); // Log error for debugging
    throw error; // Rethrow the error so the caller knows there was an issue
  }
};

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already existed" });
    }

    const newUser = new User({
      name: name,
      email: email,
      password, // Remember to hash the password before saving it in production
    });

    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    await newUser.save();

    await sendEmailVerification(newUser.email, newUser.verificationToken); // Await sending email
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "succesfully verified" });
  } catch (error) {
    res.status(500).json({ message: "Error email verification " });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
//Login
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
const secretKey = generateSecretKey();
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid email and password" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    console.log({ token });
    const decoded=jwt.decode(token)
    console.log('decoded:',decoded)
    res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: "failed to login" });
  }
});
app.post("/addresses", async (req, res) => {
  try {
    const {userId,email } =await User.findById(userId);
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new address object
    
    // Push the new address to the user's addresses array
    user.addresses.push(newAddress);

    // Save the user document with the new address
    await user.save();

    res.status(200).json({ message: "Address added successfully" });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Error adding address" });
  }
});

app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(400).json({ message: "error retriecing addresses" });
  }
});
