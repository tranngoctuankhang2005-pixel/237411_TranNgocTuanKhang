require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(' Ket noi MongoDB thanh cong!'))
    .catch(err => console.error(' Loi ket noi MongoDB:', err));

// Routes
app.use('/api/employees', require('./routes/employeeRoutes'));

// Kiểm tra trạng thái hệ thống
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server dang chay tren port ${PORT}`));