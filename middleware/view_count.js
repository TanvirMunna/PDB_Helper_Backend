let count = 0;
const viewCount = (req, res, next) => {
    count++;
    console.log(count);
    // res.send("respond send");
    next();
};

module.exports = viewCount;