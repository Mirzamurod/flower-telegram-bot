import expressAsyncHandler from 'express-async-handler'
import Customer from './../models/customerModel.js'
import { validationResult } from 'express-validator'

const customer = {
  /**
   * @desc    Get Customers
   * @route   GET /api/customers
   * @access  Private
   */
  getCustomers: expressAsyncHandler(async (req, res) => {
    const { limit = 20, page = 1, sortName, sortValue } = req.query

    const filter = { userId: req.user._id }

    try {
      const totalCount = await Customer.countDocuments(filter)

      const customers = await Customer.find(filter)
        .sort(sortValue ? { [sortName]: sortValue } : sortName)
        .limit(+limit)
        .skip(+limit * (+page - 1))

      res.status(200).json({
        page,
        data: customers,
        pageLists: Math.ceil(totalCount / limit) || 1,
        count: totalCount,
      })
    } catch (error) {
      res.status(400).json({ message: error.message, success: false })
    }
  }),

  /**
   * @desc    Add Customer
   * @route   POST /api/customers
   * @access  Private
   */
  addCustomer: expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ messages: errors.array(), success: false })
    }
  }),
}

export default customer
