// Import extensions
var express = require('express'),
	controller = require('./instance.controller');
// Define router
var router = express.Router();
// Define routes
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/search/:id', controller.search);
router.get('/stats/:id', controller.stats);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

// Export module
module.exports = router;
