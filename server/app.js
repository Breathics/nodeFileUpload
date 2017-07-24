const express     = require('express');
const formidable  = require('formidable');
const fs          = require('fs');

const app = express();

app.get('/fileupload', (req, res, next) => {
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendFile('index.html', options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log('Sent: File upload page');
    }
  });
});

app.post('/fileupload', (req, res) =>{
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      res.write('File uploaded');
      res.end();
    }); 
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.sendFile('/public/index.html')
    res.end();
  }
});



app.set('port', 8000);
const server = app.listen(app.get('port'), () => {
  console.log(`Check it out, we're running Express! PORT ${server.address().port}`);
})