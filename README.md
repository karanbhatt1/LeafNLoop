# LeafNLoop
E-commerce website for plants and pot selling business.
npm install express-session
const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',  // change this to a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }   // true if using HTTPS; false for local dev
}));
