import express from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
const prisma = new PrismaClient();

app.get('/api/menuItems', async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany();
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint for user registration
app.post('/api/register', async (req, res) => {
  try {
    // Extract user data from the request body
    const { auth0Id, name, email, emailVerified, picture } = req.body;

    // Insert user data into the Prisma database
    const newUser = await prisma.user.create({
      data: {
        auth0Id,
        name,
        email,
        emailVerified,
        picture,
      },
    });

    // Send a success response
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint for fetching user information by Auth0 ID
app.get('/api/user/:auth0Id', async (req, res) => {
  try {
    const auth0Id = req.params.auth0Id;

    // Fetch user data based on Auth0 ID
    const user = await prisma.user.findUnique({
      where: { auth0Id },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the HTTP server
app.listen(8000, () => {
  console.log('Server running on http://localhost:8000 🎉 🚀');
});