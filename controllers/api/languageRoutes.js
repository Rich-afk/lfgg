const router = require('express').Router();
const { Note, User, Comment, Language } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const dbNotePostData = await Language.findAll({
      include: [
        coding_lang
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

    const posts = dbNotePostData.map((notePost) =>
      notePost.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/notes/:id', async (req, res) => {
  try {
    const dbNotePostData = await Note.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['name']
          }
        }

      ],
    });


    const notes = dbNotePostData.get({ plain: true });

    res.render('individual-note', {
      notes,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Note }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;