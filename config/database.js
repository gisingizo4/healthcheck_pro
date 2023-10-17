const sqlite = require('sqlite3').verbose();

exports.dbConnection = async () => {
    try {
        const db = new sqlite.Database(process.env.DB_SOURCE, (err) => {
            if (err) {
                console.log({ Failure: err });
            } else {
                console.log({ Database_Connection: "Successful" });
            }
        })
        return db;
    } catch (error) {
        console.log(error);
    }
}
