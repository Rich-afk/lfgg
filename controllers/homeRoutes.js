const router = require('express').Router();
const { Language, Note } = require('../models');
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
    const dbLanguageData = await Language.findByPk(req.params.id, {
      include: [
        {
          model: Note,
          attributes: [
            'id',
            'title',
            'content',
            'date_created',
            'user_id',
          ],
        },
      ],
    });

    const language = dbLanguageData.get({ plain: true });
    res.render('language-posts', { language, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/note/:id', withAuth, async (req, res) => {
  try {
    const dbNoteData = await Note.findByPk(req.params.id);

    const note = dbNoteData.get({ plain: true });

    res.render('note', { note, loggedIn: req.session.loggedIn });
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
