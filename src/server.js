import path from 'path';
import express from 'express';
import compression from 'compression';

const app = express();
const currentFilePath = new URL(import.meta.url).pathname;
const DIST_DIR = path.dirname(currentFilePath);
const PORT = process.env.PORT || 8082;

app.use(
  express.static(DIST_DIR, {
    index: false, // Evitar que Express intente servir index.html automáticamente
  })
);
app.use(
  compression({
    level: 6,
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});