// Import Express
import express from 'express';

// Instantiate an Express application
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set the view engine for our application to EJS and point to the 'views' folder
app.set('view engine', 'ejs');
app.set('views', 'views');

// In-memory array to store guestbook entries
const guestbookEntries = [];

// Home route: Display the guestbook form
app.get('/', (req, res) => {
  res.render('guestbook.ejs');
});

// Handle form submissions
app.post('/submit', (req, res) => {
  // Validate required fields: "first-name", "last-name", and "email" must be provided
  if (!req.body['first-name'] || !req.body['last-name'] || !req.body.email) {
    return res.send('Invalid Input: First Name, Last Name, and Email are required.');
  }

  // Create a guestbook entry object using the field names as provided in the HTML
  const entry = {
    firstName: req.body['first-name'],
    lastName: req.body['last-name'],
    email: req.body.email,
    jobTitle: req.body['job-title'],
    company: req.body.company,
    linkedin: req.body.linkedin,
    meet: req.body.meet,
    other: req.body.other,
    message: req.body.message,
    mailingList: req.body['mailing-list'] ? true : false,
    emailFormat: req.body['email-format'],
    timestamp: new Date().toLocaleString()
  };

  // Add the entry to our guestbookEntries array
  guestbookEntries.push(entry);
  console.log('New guestbook entry:', entry);

  // Render the confirmation page and pass the submitted entry data
  res.render('confirmation.ejs', { entry });
});

// Admin route: Display a summary of all guestbook entries
app.get('/admin', (req, res) => {
  res.render('summary.ejs', { guestbookEntries });
});

// Tell the server to listen on our specified port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
