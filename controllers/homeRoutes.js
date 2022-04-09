const router = require('express').Router();
const { Language, Note, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const dbLanguageData = await Language.findAll({
      include: [
        {
          model: Note,
          attributes: ['filename', 'content'],
        },
      ],
    });

    const languages = dbLanguageData.map((language) =>
      language.get({ plain: true })
    );

    res.render('homepage', {
      languages,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/language/:id', withAuth, async (req, res) => {
  try {
    const dbLanguagesData = await Language.findAll({
      include: [
        {
          model: Note,
          attributes: ['title', 'original_poster'],
        },
      ],
    });
    const languages = dbLanguagesData.map((language) =>
      language.get({ plain: true })
    );
    const dbLanguageData = await Language.findByPk(req.params.id, {
      include: [
        {
          model: Note,
          attributes: [
            'id',
            'title',
            'original_poster',
            'content',
            'date_created',
            'user_id',
          ],
        },
      ],
    });

    const language = dbLanguageData.get({ plain: true });
    res.render('language-posts', { language, languages, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
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

router.get('/profile/:id', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id);

    const user = dbUserData.get({ plain: true });

    res.render('profile', { user, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/notes/:id', withAuth, async (req, res) => {
  try {
    const dbNoteData = await Note.findByPk(req.params.id);

    const note = dbNoteData.get({ plain: true });

    res.render('individual-note', { note, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
