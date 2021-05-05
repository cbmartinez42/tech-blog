const router = require('express').Router();
const {Posts, Comments, Users} = require('../../models');


router.get('/', async (req, res) => {
  try {
  const postsData = await Posts.findAll({
    limit: 20, 
    order: [['updated_at', 'DESC']],
    include: [
      {
        model: Users, 
        attributes: ['username']
      },
      {
        model: Comments,
        include: [{model: Users}],
        attributes: ['comment_text', 'created_by']
      }
    ]
  })

  const posts = postsData.map((posts) =>
  posts.get({plain:true})
 
  );
  res.render('home', {posts});
} catch (err) {
  res.status(500).json(err)
}
});
  

router.get('/post/:id', async (req, res)=> {
  try {
    const postsData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: Users, 
          attributes: ['username']
        },
        {
          model: Comments,
          include: [{model: Users}],
          attributes: ['comment_text', 'created_by']
        }
      ]
    });

    const post = postsData.get({ plain: true });

    res.render('post-view', {
      ...post,
    })
  } catch (err) {
    res.status(500).json(err)
  }
});


router.get('/login', (req, res) => res.render('login'));

router.get('/new', (req, res) => res.render('new-post'));

router.get('/dashboard',  (req, res) => res.render('dashboard'));

router.get('/logout', (req, res) => res.render('logout'));

module.exports = router;