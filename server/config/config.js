// ================================
// Puerto
// ================================
process.env.PORT = process.env.PORT || 3000;

// ================================
// Vencimiento del Token
// ================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días

process.env.CADUCIDAD_TOKEN = '48h';

// ================================
// SEED de autenticacion
// ================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


// ================================
// Entorno
// ================================


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ================================
// Base de datos
// ================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}


//ongodb://localhost:27017/cafe
//mongodb+srv://strider:2v3tQJuzsrm9qloV@cluster0-tyauv.mongodb.net/cafe

process.env.URLDB = urlDB;

// ================================
// Google client ID
// ================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '209991538742-21uhjq1qbmjk6hpqm2dcjd3sjfhbgp50.apps.googleusercontent.com';