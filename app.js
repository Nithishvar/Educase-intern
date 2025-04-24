const express = require('express');
const app = express();
const schoolRoute = require('./Routes/schoolroute');
const path = require('path');


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', schoolRoute);

app.get('/', (req, res) => {
    const success = req.query.success;
    res.render('Main', { success });
  });

  app.get('/listSchools', (req, res) => {
    res.render('list');
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
