const express = require('express');
const router = express.Router();
const accessoriesController = require('../controllers/accessoriesController');
const { authMiddleware, adminMiddleware } = require('../controllers/userController');   
// Public routes  
router.get('/', accessoriesController.getAllAccessories);  
router.get('/:id', accessoriesController.getAccessoriesByOne);  


// Admin routes (require authentication and admin role)
router.use(authMiddleware, adminMiddleware);  
router.post('/', accessoriesController.AddAccessories);
router.put('/:id', accessoriesController.UpdateAccessories);  
router.delete('/:id', accessoriesController.DeleteAccessories);  


module.exports = router;  //exporting the router