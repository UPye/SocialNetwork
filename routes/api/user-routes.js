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

// /API route to add a thought by user id
router.route('/:userId').post(addThought);

// API route to render all thoughts
router
  .route('/')
  .get(getAllThoughts);

// API route to render and/or update thoughts by id
router
  .route('/:userId/:thoughtId')
  .get(getThoughtById)
  .put(updateThought);

// /api/thoughts/<thoughId>
router
  .route('/:thoughtId')
  .delete(removeThought);

// API route to add a reaction to a thought
router
  .route('/:thoughtId/reactions/')
  .post(addReaction);
  
// API route to remove a reaction by id
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);


module.exports = router;