const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scanController');

router.post('/scan', scanController.createScan);
router.get('/scans', scanController.getScans);
router.get('/scans/:id', scanController.getScanById);
router.delete('/scans/:id', scanController.deleteScan);

module.exports = router;
