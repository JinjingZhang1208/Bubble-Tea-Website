const express = require('express');
const { PrismaClient } = require('@prisma/client');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
dotenv.config();

app.get('/api/menuItems', async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany();
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the HTTP server
app.listen(8000, () => {
  console.log('Server running on http://localhost:8000 🎉 🚀');
});
