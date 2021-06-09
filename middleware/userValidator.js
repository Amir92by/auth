const { check, validationResult } = require('express-validator');

exports.singInValidation = ()=>[

    check('email','email is required').not().isEmpty(),
    check('email','invalid email').isEmail(),
    check('password','enter a valid password').isLength({min:6}),
]

exports.singUpValidation = ()=>[
    check('name','name is required').not().isEmpty(),
    check('email','email is required').not().isEmpty(),
    check('email','invalid email').isEmail(),
    check('password','enter a valid password').isLength({min:6}),
]

exports.validation= (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}