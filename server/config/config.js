// ================================
// Puerto
// ================================
process.env.PORT = process.env.PORT || 3000;


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
    urlDB = 'mongodb+srv://strider:2v3tQJuzsrm9qloV@cluster0-tyauv.mongodb.net/cafe';
}


//ongodb://localhost:27017/cafe
//mongodb+srv://strider:2v3tQJuzsrm9qloV@cluster0-tyauv.mongodb.net/cafe

process.env.URLDB = urlDB;