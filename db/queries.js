const pool = require("./pool");

async function getAllMessages() {
    const {rows} = await pool.query("SELECT * FROM messages ORDER BY added DESC, id DESC");

    return rows;

}

async function insertMessage(author,text) { 
    await pool.query(
        "INSERT INTO messages (author,text) VALUES ($1, $2)", 
        [author,text]
    );
    
}

async function getMessage(id) { 
const {rows} = await pool.query("SELECT * FROM messages WHERE ID = $1",[id]);

return rows[0];
}

module.exports = {
    getAllMessages,
    insertMessage,
    getMessage,
}