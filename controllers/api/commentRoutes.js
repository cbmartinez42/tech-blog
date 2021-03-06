const router = require('express').Router();
const Comments = require('../../models/Comments');

// post a new comment
router.post('/', async (req, res) => {
  try {
    const commentData = await Comments.create({
    post_id: req.body.id,
    comment_text: req.body.comment_text,
    created_by: req.session.user_id,
    })
    
    res.status(200).json(commentData) 
  } catch (err) {
    res.status(400).json(err);
  }
})


module.exports = router;