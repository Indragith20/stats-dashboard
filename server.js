const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('./dist/stats-screen'));
app.get('/*', function(req, res) {
  res.sendFile(path.join('./dist/stats-screen/index.html'));
});
app.listen(process.env.PORT || 8080,() => {
    console.log('lsitst');
});