const express = require("express")

const studentcontroller = require("../controller/studentcontroller");

const router = express.Router();

router.post('/create',studentcontroller.CreateStudent);
router.get('/read',studentcontroller.ReadStudent);
router.patch('/update/:id',studentcontroller.UpdateStudent);
router.delete('/delete/:id',studentcontroller.DeleteStudent);

module.exports = router;