function dbConnect() {

    // database connection

    // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cnhrqkg.mongodb.net/?retryWrites=true&w=majority`;
    // const client = new MongoClient(uri,
    //     {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //         serverApi: ServerApiVersion.v1
    //     });
    console.log("db Connected");
}
module.exports = dbConnect