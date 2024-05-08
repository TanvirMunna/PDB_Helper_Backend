module.exports.getAllUsers = (req, res, next) => {
    const { ip, query, params, body, headers } = req;
    // console.log(ip, query, params, body, headers);
    // res.download(__dirname+"/users.controller.js");
    // res.send("all users")
    next();
};

module.exports.postAllUsers = (req, res) => {
    res.send("User created");
}

// module.exports = {
//     getAllUsers
// }