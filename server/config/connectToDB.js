const mongoose = require("mongoose").default; // added .default as a solution I found on stackoverflow to .connect() not being found
async function connectToDB()  {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}

module.exports = connectToDB;
