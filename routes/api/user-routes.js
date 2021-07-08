const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/user-controller');

// GET and POST route to render all users by id and create new user
router.route("/")
  .get(getAllUsers)
  .post(createUser);

// GET, PUT and DELETE route to render user by id, update user by id, and delete user by id
router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// POST and DELETE route to add and delete friend by id
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);


module.exports = router;