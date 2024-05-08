const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dbConnect = require("./utils/dbConnect");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const userRout = require("./routes/v1/users.rout");
const viewCount = require("./middleware/view_count");

// middleware
app.use(cors());
app.use(express.json());

app.use(viewCount);
dbConnect();
app.use("/api//v1/users", userRout);

// jwt token function

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Unauthorized");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "Forbidden access " });
    }
    req.decoded = decoded;
    next();
  });
}

async function run() {
  try {
    // collections
    // const productCollections = client.db('SmartResaleStall').collection('ProductCollections');

    // const addedProductsCollection = client.db('SmartResaleStall').collection('AllProducts');

    // const brandsCollection = client.db('SmartResaleStall').collection('brands');

    // const usersCollection = client.db('SmartResaleStall').collection('users');

    // const orderCollection = client.db('SmartResaleStall').collection('buyers');

    // Post operation
    app.post("/addedProducts", async (req, res) => {
      const products = req.body;
      const result = await addedProductsCollection.insertOne(products);
      res.send(result);
    });

    app.post("/ordered", async (req, res) => {
      const orders = req.body;
      const result = await orderCollection.insertOne(orders);
      res.send(result);
    });

    app.get("/jwt", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user) {
        const token = jwt.sign({ email }, process.env.JWT_TOKEN, {
          expiresIn: "7d",
        });
        return res.send({ accessToken: token });
      }

      res.status(403).send({ accessToken: "" });
    });

    // app.post('/users', async (req, res) => {
    //     const user = req.body;
    //     const result = await usersCollection.insertOne(user);
    //     res.send(result);
    // });

    // get operation

    // app.get('/users', async (req, res) => {
    //     const query = {};
    //     const users = await usersCollection.find(query).toArray();
    //     res.send(users);

    // })

    app.get("/addedProducts", async (req, res) => {
      const query = {};
      const products = await addedProductsCollection.find(query).toArray();
      res.send(products);
    });

    app.get("/filterPost/:level", async (req, res) => {
      const query = {};
      const level = req.params.level;
      console.log(level);
      if (level) {
        query.level = level;
      }
      const products = await AllProducts.find(query).toArray();
      res.send(products);
      console.log(products);
    });

    //not yet used
    app.put("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const option = { upsert: true };
      const updateDoc = {
        $set: {
          userType: "admin",
        },
      };
      const user = await usersCollection.updateOne(filter, updateDoc, option);
      res.send(user);
    });

    app.put("/addedProducts/verified/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const option = { upsert: true };
      const updateDoc = {
        $set: {
          role: "verified",
        },
      };
      const result = await addedProductsCollection.updateOne(
        filter,
        updateDoc,
        option
      );
      res.send(result);
    });

    app.get("/allBrandsProducts", async (req, res) => {
      const query = {};
      const allBrandsProducts = await productCollections.find(query).toArray();
      res.send(allBrandsProducts);
    });

    app.get("/allBrandsProducts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const selectedBrandById = await productCollections.findOne(query);
      res.send(selectedBrandById);
    });

    app.get("/addedProductsAll", verifyJWT, async (req, res) => {
      const email = req.query.email;

      const decodedEmail = req.decoded.email;

      if (email !== decodedEmail) {
        return res.status(403).send({ message: "Forbidden access" });
      }
      const query = { sellerEmail: email };
      const addedProducts = await addedProductsCollection.find(query).toArray();
      res.send(addedProducts);
    });

    app.get("/specificAddedProduct", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const products = await addedProductsCollection.find(query).toArray();
      res.send(products);
    });

    app.get("/orderedProducts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await addedProductsCollection.findOne(query);
      res.send(result);
    });

    app.get("/brands", async (req, res) => {
      const query = {};
      const brands = await brandsCollection.find(query).toArray();
      res.send(brands);
    });

    app.get("/selectedBrand/:brand", async (req, res) => {
      const brandName = req.query.brand;
      const query = { brand: brandName };
      const brands = await addedProductsCollection.find(query).toArray();
      res.send(brands);
    });

    // allUser for admin
    app.get("/allBuyers", async (req, res) => {
      const query = {};
      const allBuyers = await orderCollection.find(query).toArray();
      res.send(allBuyers);
    });

    // all buyers for admin
    app.get("/allBuyers", async (req, res) => {
      const query = {};
      const allBuyers = await orderCollection.find(query).toArray();
      res.send(allBuyers);
    });

    // specific buyers
    app.get("/specificBuyer", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const allBuyers = await orderCollection.find(query).toArray();
      res.send(allBuyers);
    });

    // Delete operation
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const deletedProduct = await addedProductsCollection.deleteOne(query);
      res.send(deletedProduct);
    });

    app.delete("/sellers/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const deletedSeller = await addedProductsCollection.deleteOne(query);
      res.send(deletedSeller);
    });

    app.delete("/buyers/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const deletedBuyer = await orderCollection.deleteOne(query);
      res.send(deletedBuyer);
    });
  } finally {
  }
}

run().catch((error) => console.error(error));

// basic run structure on server side

app.get("/", async (req, res) => {
  res.send(`The smart sale stall is running on ${port} port`);
});

app.all("*", (req, res) => {
  res.send("No rout created");
});

app.listen(port, () => {
  console.log(`It is running on ${port} port`);
});
