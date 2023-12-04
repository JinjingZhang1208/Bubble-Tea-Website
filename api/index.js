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

app.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await prisma.cart.findMany({
      include: {
        menuItem: true,
      },
    });
    const cartWithDetails = cartItems.map((cartItem) => {
      return {
        id: cartItem.id,
        userId: cartItem.userId,
        menuItem: cartItem.menuItem, 
        quantity: cartItem.quantity,
        createdAt: cartItem.createdAt,
      };
    });
    res.json(cartWithDetails);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/menuItems/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!menuItem) {
      res.status(404).json({ error: 'Menu item not found' });
      return;
    }
    res.json(menuItem);
  } catch (error) {
    console.error('Error fetching menu item details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/menuItems/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await prisma.review.findMany({
      where: { menuItemId: parseInt(id, 10) },
    });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000 🎉 🚀');
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


app.patch('/api/cart/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const { quantity } = req.body;

  try {
    // Update the quantity in the database
    const updatedCartItem = await prisma.cart.update({
      where: { id: itemId },
      data: { quantity: parseInt(quantity, 10) },
    });

    res.json(updatedCartItem);
  } catch (error) {
    console.error('Error updating quantity in the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});