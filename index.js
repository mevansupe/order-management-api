const orders = require("./mock_data/orders");
const items = require("./mock_data/items");
const swaggerOptions = require("./util/swagger_options");
const express = require("express");

const app = express();

//SWAGGER
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup((swaggerDocs)));

/**
 * @swagger
 * definition:
 *  Order:
 *      type: object
 *      properties:
 *          id:
 *              type: integer
 *              description: unique id for an order
 *              example: 1
 *          item:
 *              type: string
 *              description: Item name
 *              example: 'Chicken'
 *  Item:
 *      type: object
 *      properties:
 *          id:
 *              type: integer
 *              description: unique id for an order
 *              example: 1
 *          name:
 *              type: string
 *              description: Item name
 *              example: 'Chicken'
 *          unit_price:
 *              type: double
 *              description: Item unit price
 *              example: 500.00
 */
//SWAGGER

app.use(express.json());

/**
 * @swagger
 * /api/orders:
 *  get:
 *      summary: Get all orders
 *      requestBody:
 *          description: Retrieve all the placed orders
 *      responses:
 *          200:
 *              description: All orders retrieved successfully
 *          500:
 *              description: Failure while retrieving orders
 */
app.get('/api/orders', (req, res) => {
    res.status(200).send(orders);
});

/**
 * @swagger
 * /api/items:
 *  get:
 *      summary: Get all Items
 *      requestBody:
 *          description: Retrieve all the items
 *      responses:
 *          200:
 *              description: All items retrieved successfully
 *          500:
 *              description: Failure while retrieving items
 */
app.get('/api/items', (req, res) => {
    res.status(200).send(items);
});

/**
 * @swagger
 * /api/orders:
 *  post:
 *      summary: Place an order
 *      requestBody:
 *          description: Placing an order in the system
 *          content:
 *              application/json:
 *                  schema:
 *                   type: object
 *                   properties:
 *                          item:
 *                              type: integer
 *                              description: 'Item ID of an item in the items list'
 *                              example: 1
 *                          qty:
 *                              type: integer
 *                              description: 'Item quantity to order'
 *                              example: 10
 *      responses:
 *          200:
 *              description: Order placed successfully
 *          500:
 *              description: Failure while placing the order
 *          400:
 *              description: Something went wrong in client side
 */
app.post('/api/orders', (req, res) => {
    const body = req.body;
    if (body.item === undefined) {
        res.status(400).send({
            timestamp: Date.now(),
            message: "Item is required"
        });
    }
    if (body.qty === undefined) {
        res.status(400).send({
            timestamp: Date.now(),
            message: "Quantity is required"
        });
    }

    let itemObject;
    items.forEach((item) => {
       if (item.id === body.item) {
           itemObject = item;
       }
    });

    if (itemObject === undefined) {
        res.status(404).send({
            timestamp: Date.now(),
            message: "Item not found"
        });
    }

    const newOrder = {
        id: Math.floor(Math.random() * 10000),
        item: itemObject.name,
        qty: body.qty,
        unitPrice: itemObject.unitPrice,
        total: body.qty * itemObject.unitPrice,
        status: "PENDING"
    };
    orders.push(newOrder);

    res.status(201).send({
        message: "Order successfully placed",
        data: newOrder
    });
});

module.exports = app;
