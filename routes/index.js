const router = require('express').Router();
// // by targeting the folder instead of a file it will look for an index in that folder
const apiRoutes = require('./api');

// // if a request comes into http:localhost:PORT/api come here
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;