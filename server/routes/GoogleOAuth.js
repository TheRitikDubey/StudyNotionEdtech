const express = require("express");
const router = express.Router();
const {RedirectsToGoogleOAuth,HandleAuthCallbackForGoogleOAuth} = require("../Controllers/auth")

router.get('/google',RedirectsToGoogleOAuth);
router.get('/google/callback', HandleAuthCallbackForGoogleOAuth)

module.exports = router