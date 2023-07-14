const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singleFileUpload, singleMulterUpload } = require('../../awsS3')

const router = express.Router();

const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Last Name is required'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


// GET current User
router.get('/', requireAuth, async (req, res) => {

    const { user } = req
    console.log(user)

    if (!user) {
        res.status(404);
        res.json({
            message: null
        })
    }

    const { id, username, email, firstName, lastName } = user

    res.status(200);
    res.json({
        user: {
            id,
            firstName,
            lastName,
            email,
            username,

        }
    })
})


// GET all users
router.get('/', requireAuth, async (req, res) => {

    const users = await User.findAll()

    if (!users) {
        res.status(401);
        res.json({
            message: 'Authentication required'
        })
    }
    res.status(200);
    res.json(users)
})

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId
    const user = await User.findByPk(userId)
    res.status(200).json(user)
})

// Sign up /api/users        <error handling done?>
router.post('/', singleMulterUpload("image"), validateSignup, async (req, res) => {
    let { email, password, username, firstName, lastName, image, phone, } = req.body;

    console.log("<------------------------------->")
    console.log("1", email)
    console.log("1", password)
    console.log("1", username)
    console.log("1", firstName)
    console.log("1", lastName)
    console.log("1", image)
    console.log("1", typeof image)
    const profileImageUrl = req.file ?
        await singleFileUpload({ file: req.file, public: true }) :
        null;
    console.log("1", profileImageUrl)
    console.log("1", phone)
    if (phone === "null") phone = null
    console.log("1", typeof phone)
    console.log("<------------------------------->")

    const hashedPassword = bcrypt.hashSync(password);

    const usersEmail = await User.findOne({
        where: {
            email
        }
    })
    const usersUsername = await User.findOne({
        where: {
            username
        }
    })

    if (usersEmail) {
        res.status(500);
        res.json({
            "message": "User already exists",
            "errors": {
                "email": "User with that email already exists"
            }
        })
    }
    if (usersUsername) {
        res.status(500);
        res.json({
            "message": "User already exists",
            "errors": {
                "email": "User with that username already exists"
            }
        })
    }

    const user = await User.create({
        email,
        username,
        hashedPassword,
        firstName,
        lastName,
        profileImageUrl,
        phoneNumber: phone,
    });

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        profileImageUrl: user.profileImageUrl,
        phoneNumber: user.phoneNumber,

    };


    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
}
);

// Update User
router.put('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const [firstName, lastName, phone, username, email, profileImageUrl] = req.body
})


// Delete User
router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId
    const user = await User.findByPk(userId)

    await user.destroy();

    return res.status(200).json({ "message": "Delete Successful" })
})

module.exports = router;
