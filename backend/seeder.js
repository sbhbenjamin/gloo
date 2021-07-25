import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Cert from './models/certModel.js'
import Conversation from './models/conversationModel.js'
import Message from './models/messageModel.js'
import Offer from './models/offerModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Cert.deleteMany()
    await Conversation.deleteMany()
    await Message.deleteMany()
    await Offer.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    const userZeroProducts = products
      .filter((p, i) => i % 3 === 0)
      .map((product) => {
        return { ...product, user: createdUsers[0]._id }
      })
    const userOneProducts = products
      .filter((p, i) => i % 3 === 1)
      .map((product) => {
        return { ...product, user: createdUsers[1]._id }
      })
    const userTwoProducts = products
      .filter((p, i) => i % 3 === 2)
      .map((product) => {
        return { ...product, user: createdUsers[2]._id }
      })

    await Product.insertMany(userZeroProducts)
    await Product.insertMany(userOneProducts)
    await Product.insertMany(userTwoProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
