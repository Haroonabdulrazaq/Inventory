import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Expresser' });
});

export default router;
