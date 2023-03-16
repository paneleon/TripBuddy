process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureDB = require('./config/db.config');
const configureApp = require('./config/app.config');

configureDB();
const app = configureApp();

app.listen(process.env.PORT || 5000);

module.exports = app;

console.log(`Express server is running at ${process.env.URL} on port ${process.env.PORT}`);