const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());



// jwt token function

// database connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cnhrqkg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        // collections
        const addedProductsCollection = client.db('SmartResaleStall').collection('AllProducts');

        const brandsCollection = client.db('SmartResaleStall').collection('brands');
        const usersCollection = client.db('SmartResaleStall').collection('users');

        // Post operation
        app.post('/addedProducts', async (req, res) => {
            const products = req.body;
            const result = await addedProductsCollection.insertOne(products);
            res.send(result);
        });
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        // get operation
        
        app.get('/addedProducts', async (req, res) => {
            const query = {};
            const products = await addedProductsCollection.find(query).toArray();
            res.send(products);
        });
        app.get('/addedProducts', async (req, res) => {
            const email = req.query.email;
            const query = { sellerEmail: email };
            const addedProducts = await addedProductsCollection.find(query).toArray();
            res.send(addedProducts);
        })
        app.get('/brands', async (req, res) => {
            const query = {};
            const brands = await brandsCollection.find(query).toArray();
            res.send(brands);
        });
    
        app.get('/selectedBrand', async (req, res) => {
            console.log(req.query.email);
            let query = {};
            if (req.query.email) {
                query = {
                    brand: req.query.email
                }
            }
            const selectedBrand = await addedProductsCollection.find(query).toArray();
            res.send(selectedBrand);
        });

        // Put operation

    }
    finally {
        
    }
}

run().catch(error => console.error(error));



// basic run structure on server side

app.get('/', async (req, res) => {
    res.send(`The smart sale stall is running on ${port} port`);
});

app.listen(port, () => {
    console.log(`It is running on ${port} port`);
})