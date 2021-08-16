const orders = require("./mock_data/orders");
const items = require("./mock_data/items");
const express = require("express");

const app = express();

app.use(express.json());

app.get('/api/orders', (req, res) => {
    res.status(200).send(orders);
});

app.get('/api/items', (req, res) => {
    res.status(200).send(items);
});

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
