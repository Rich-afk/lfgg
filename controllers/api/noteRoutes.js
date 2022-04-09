const router = require('express').Router();
const { Note } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const LanguagePostData = await Note.findAll({
      include: [
        title,
        content,
        // {
        //   model: User,
        //   attributes: ['name'],
        // },
        // {
        //   model: Comment,
        //   include: {
        //     model: User,
        //     attributes: ['name'],
        //   }
        // },
      ],
    });

    const posts = LanguagePostData.map((langPost) =>
      langPost.get({ plain: true })
    );

    res.render('notes', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/notes/:id', withAuth, async (req, res) => {
  try {
    const dbNoteData = await User.findByPk(req.params.id);

    const note = dbNoteData.get({ plain: true });

    res.render('note', { note, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newNotePost = await Note.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newNotePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const noteData = await Note.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!noteData) {
      res.status(404).json({ message: 'No notes found with this id!' });
      return;
    }

    res.status(200).json(noteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
