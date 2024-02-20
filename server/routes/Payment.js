const express = require("express");
const router = express.Router();
const {auth, IsStudent, IsInstructor, IsAdmin} = require("../Middleware/auth");
const {capturePayment,verifySignature} = require("../Controllers/Payment");
const { verify } = require("jsonwebtoken");

router.post("/capturePayment",auth,IsStudent,capturePayment);
router.post("/verifySignature",verifySignature);

module.exports = router