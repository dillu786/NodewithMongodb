const { MongoClient } = require('mongodb');

const password = encodeURIComponent("v5gewzvDTPEF04dW");
const url = 'mongodb+srv://azamdilshad:v5gewzvDTPEF04dW@cluster0.nlem5op.mongodb.net/products?retryWrites=true&w=majority';
//const url="mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true"
let client;

const connectDB = async () => {
    try {
        client = new MongoClient(url);
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
};

connectDB();

const createProduct = async (req, res, next) => {
    try {
        const newProduct = {
            name: req.body.name,
            price: req.body.price
        };
        console.log(newProduct);
        const db = client.db('products');
        const result = await db.collection('products').insertOne(newProduct);
        res.json(newProduct);
    } catch (error) {
        console.error('Error creating product', error);
        return res.json({ message: 'Could not store data.' });
    }
};

const getProducts = async (req, res, next) => {
    try {
        const db = client.db('school');
        const products = await db.collection('students').find().toArray();
        res.json(products);
    } catch (error) {
        console.error('Error retrieving products', error);
        return res.json({ message: 'Could not retrieve data.' });
    }
};

process.on('SIGINT', async () => {
    try {
        await client.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error closing MongoDB connection', error);
        process.exit(1);
    }
});

exports.createProduct = createProduct;
exports.getProducts = getProducts;
// const { MongoClient } = require('mongodb');

// // Connection URI for the MongoDB database
// const uri = 'mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true';

// // Create a new MongoClient
// const client = new MongoClient(uri);

// // Connect to the MongoDB database
// async function connectDB() {
//   try {
//     // Connect to the MongoDB server
//     await client.connect();
//     console.log('Connected to the MongoDB database');
//   } catch (error) {
//     console.error('Error connecting to the MongoDB database', error);
//   }
// }

// connectDB();
// const createProduct = async (req, res, next) => {
//     try {
//         const newProduct = {
//             name: req.body.name,
//             price: req.body.price
//         };
//         console.log(newProduct);
//         const db = client.db('products');
//         const result = await db.collection('products').insertOne(newProduct);
//         res.json(newProduct);
//     } catch (error) {
//         console.error('Error creating product', error);
//         return res.json({ message: 'Could not store data.' });
//     }
// };

// const getProducts = async (req, res, next) => {
//     try {
//         const db = client.db('school');
//         const products = await db.collection('students').find().toArray();
//         res.json(products);
//     } catch (error) {
//         console.error('Error retrieving products', error);
//         return res.json({ message: 'Could not retrieve data.' });
//     }
// };

// process.on('SIGINT', async () => {
//     try {
//         await client.close();
//         console.log('MongoDB connection closed');
//         process.exit(0);
//     } catch (error) {
//         console.error('Error closing MongoDB connection', error);
//         process.exit(1);
//     }
// });

// exports.createProduct = createProduct;
// exports.getProducts = getProducts;

