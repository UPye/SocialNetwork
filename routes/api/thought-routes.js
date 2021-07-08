const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// GET and POST request to get and add thoughts
router.route('/')
    .get(getAllThoughts)
    .post(addThought);

// GET, PUT, and DELETE request to render, update, and remove thoughts
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// POST route to add reactions
router.route('/:thoughtId/reactions')
    .post(addReaction);

// DELETE route to remove reactions
router.route('/:thoughtId/:reactionId')
    .delete(removeReaction);


module.exports = router;