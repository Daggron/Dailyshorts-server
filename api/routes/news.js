const router = require('express').Router();
const controller = require('../controllers/news');

router.route('/news').get(controller.getdata);

module.exports = router;