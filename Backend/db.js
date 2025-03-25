import mysql from 'mysql2';

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: 8889,
    password: 'root',
    database: 'Clavier',
});

db.connect((err) => {
    if (err) {
        console.error('❌ Erreur de connexion à la base de données:', err);
        process.exit(1);
    } else {
        console.log('✅ Connecté à la base de données MySQL');
    }
});

export default db;
