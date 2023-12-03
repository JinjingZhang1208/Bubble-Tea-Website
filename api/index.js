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

// User registration endpoint
app.post('/api/register', async (req, res) => {
  const { auth0Id, name, email, emailVerified, picture } = req.body;

  try {
    await prisma.user.create({
      data: { auth0Id, name, email, emailVerified, picture },
    });

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

// Fetch user information endpoint
app.get('/api/user/:id', async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user information');
  }
});

// Start the HTTP server
app.listen(8000, () => {
  console.log('Server running on http://localhost:8000 🎉 🚀');
});