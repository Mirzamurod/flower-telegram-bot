import expressAsyncHandler from 'express-async-handler'
import User from './../models/userModel.js'

const user = {
  /**
   * @desc    Delete User
   * @route   DELETE /api/users/delete
   * @access  Private
   */
  delete: expressAsyncHandler(async (req, res) => {
    if (req.user) {
      await User.findByIdAndDelete(req.user.id)
      res.status(200).json({ success: true, message: 'user_deleted' })
    } else res.status(400).json({ success: false, message: 'user_not_found' })
  }),

  /**
   * @desc    Get Clients by Admin
   * @route   GET /api/client
   * @access  Private
   */
  getClientsByAdmin: expressAsyncHandler(async (req, res) => {
    const { limit = 20, page = 1, sortName, sortValue } = req.query

    const filter = { userId: req.user._id, role: 'client' }

    try {
      const totalCount = await User.countDocuments(filter)

      const clients = await User.find(filter, { password: 0 })
        .sort(sortValue ? { [sortName]: sortValue } : sortName)
        .limit(+limit)
        .skip(+limit * (+page - 1))

      res.status(200).json({
        page,
        data: clients,
        pageLists: Math.ceil(totalCount / limit) || 1,
        count: totalCount,
      })
    } catch (error) {
      res.status(400).json({ message: error.message, success: false })
    }
  }),
}

export default user
