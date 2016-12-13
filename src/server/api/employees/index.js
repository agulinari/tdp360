// Import extensions
var express = require('express'),
	controller = require('./employee.controller');
// Define router
var router = express.Router();
// Define routes
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/search/:text', controller.filtrar);
router.get('/:id/subs', controller.subs);
router.get('/area/:area', controller.area);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

// Export module
module.exports = router;
