import express from 'express'
import { PrismaClient } from '@prisma/client'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import { auth } from 'express-oauth2-jwt-bearer'
import jwt from 'jsonwebtoken'

dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: 'https://dev-5zuj6fq234xqqqwm.us.auth0.com',
  tokenSigningAlg: 'RS256'
})

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, 'https://dev-5zuj6fq234xqqqwm.us.auth0.com')
    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ error: 'Forbidden' })
  }
}

app.patch('/api/updateProfile', requireAuth, async (req, res) => {
  const { name } = req.body
  const userId = req.user.id

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name }
    })

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/menuItems', async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany()
    res.json(menuItems)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await prisma.cart.findMany({
      include: {
        menuItem: true
      }
    })
    const cartWithDetails = cartItems.map((cartItem) => {
      return {
        id: cartItem.id,
        userId: cartItem.userId,
        menuItem: cartItem.menuItem,
        quantity: cartItem.quantity,
        createdAt: cartItem.createdAt
      }
    })
    res.json(cartWithDetails)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/menuItems/:id', async (req, res) => {
  try {
    const { id } = req.params
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: parseInt(id, 10) }
    })
    if (!menuItem) {
      res.status(404).json({ error: 'Menu item not found' })
      return
    }
    res.json(menuItem)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/menuItems/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params
    const reviews = await prisma.review.findMany({
      where: { menuItemId: parseInt(id, 10) }
    })
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/api/cart', async (req, res) => {
  try {
    const { menuItemId } = req.body
    const updatedCart = await prisma.cart.upsert({
      where: { id: menuItemId },
      update: { quantity: { increment: 1 } },
      create: { menuItemId, quantity: 1 }
    })
    res.status(200).json({ message: 'Item added to cart successfully', cart: updatedCart })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.patch('/api/cart/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10)
  const { quantity } = req.body

  try {
    // Update the quantity in the database
    const updatedCartItem = await prisma.cart.update({
      where: { id: itemId },
      data: { quantity: parseInt(quantity, 10) }
    })

    res.json(updatedCartItem)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/api/menuItems/:id/reviews', authenticateJWT, async (req, res) => {
  const menuItemId = parseInt(req.params.id, 10)
  const { content } = req.body
  const userId = req.user.id

  try {
    const review = await prisma.review.create({
      data: {
        content,
        menuItemId,
        userId
      }
    })

    res.status(201).json(review)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

app.get('/api/menuItems/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params
    const reviews = await prisma.review.findMany({
      where: { menuItemId: parseInt(id, 10) }
    })
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/api/cart/clear', async (req, res) => {
  try {
    await prisma.cart.updateMany({
      data: { quantity: 0 }
    })

    res.status(200).json({ message: 'All carts cleared successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000 🎉 🚀')
})