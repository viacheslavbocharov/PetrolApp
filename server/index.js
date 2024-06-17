const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const branchRoutes = require('./routes/branch');
const purchRoutes = require('./routes/purch');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // Настройка CORS для разрешения запросов с клиента
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', branchRoutes);
app.use('/api', purchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
