const router = require('express').Router();
const {
  getUsers,
  singleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(singleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);
module.exports = router;