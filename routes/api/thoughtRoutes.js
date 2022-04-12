const router = require('express').Router();
const {
  getThoughts,
  singleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/videos
router.route('/').get(getThoughts).post(createThought);

// /api/videos/:videoId
router
  .route('/:thoughtId')
  .get(singleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/videos/:videoId/responses
router.route('/:thoughtId/reactions').post(addReaction);

// /api/videos/:videoId/responses/:responseId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;