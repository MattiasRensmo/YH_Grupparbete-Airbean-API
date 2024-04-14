// konfigurerar och startar express-servern samt sätter upp rutter och the middlewareszzzzzzz (aka JSON-skiten)

const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const db = require('./db/db');

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
