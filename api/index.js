import express from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from 'express-oauth2-jwt-bearer';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: 'RS256'
});

app.get('/api/menuItems', async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany();
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/cart', async (req, res) => {
  try {
    const { menuItemId } = req.body;

    // Update or create the Cart entry for the user (user might be authenticated or not)
    const updatedCart = await prisma.cart.upsert({
      where: { id: menuItemId }, // Use menuItemId as the id in the where condition
      update: { quantity: { increment: 1 } },
      create: { menuItemId, quantity: 1 },
    });

    res.status(200).json({ message: 'Item added to cart successfully', cart: updatedCart });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await prisma.cart.findMany({
      include: {
        menuItem: true,
      },
    });

    console.log('Cart Items:', cartItems);

    res.json({ cart: cartItems });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(8000, () => {
  console.log('Server running on http://localhost:8000 🎉 🚀');
});
