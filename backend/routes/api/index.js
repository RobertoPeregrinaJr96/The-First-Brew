const router = require('express').Router();
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
// my routes
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const coffeeRouter = require('./coffee.js')
const itemRouter = require('./item.js')
const menuRouter = require('./menu.js')
const reviewRouter = require('./reviews.js')
const cartRouter = require('./shoppingCart.js')
// my active routes
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/coffee', coffeeRouter)

router.use('/items', itemRouter)

router.use('/menu', menuRouter)

router.use('/reviews', reviewRouter)

router.use('/cart', cartRouter)



// POST /api/test
router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

// GET /api/test
router.get('/test', async (req, res) => {
    let message = req.body
    res.json({ message: 'this is a gnarly message' })
})

// GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
});


// GET /api/restore-user
router.get('/restore-user', (req, res) => {
    return res.json(req.user);
}
);


// GET /api/require-auth
router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);
module.exports = router;
