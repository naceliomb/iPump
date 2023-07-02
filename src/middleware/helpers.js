const shortid = require("shortid");

function generateUniqueId() {
    const id = shortid.generate();
    return id;
}

module.exports = { generateUniqueId };
