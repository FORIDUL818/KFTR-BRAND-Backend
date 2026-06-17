const app = require('./src/app');
let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});