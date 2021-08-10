import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/catalog')
});

export default router;
