const {Router} = require('express');
const {createActivity} = require('../controllers/activity');


const router = Router();


router.post('/', createActivity);


module.exports = router;

