const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
  Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Comment.create({
    description: req.body.description,
    user_id: req.session.user_id,
    note_id: req.body.post_id
  })
    .then(commentData => res.json(commentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put('/:id', withAuth, async (req, res) => {
  console.log(req.body)
  try {
    const commentData = await Comment.update(
      req.body,
      {
        where: {
          id: req.params.id,
        },
      });

    if (!commentData) {
      res.status(404).json({ message: 'No Comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;