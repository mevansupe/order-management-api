const request = require('supertest');
const app = require("./index");

describe("POST /api/orders", () => {
    describe("When order details provided", () => {
        test("shoud respond with a 201 status code", async () => {
            const response = await request(app).post("/api/orders").send({
                item: 1,
                qty: 2
            })
            expect(response.statusCode).toBe(201)
        })
        test("respond with json content type", async () => {
            const response = await request(app).post("/api/orders").send({
                item: 1,
                qty: 2
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has data", async () => {
            const response = await request(app).post("/api/orders").send({
                item: 1,
                qty: 2
            })
            expect(response.body.data).toBeDefined()
        })
        test("when provided item is not found should respond with 404", async () => {
            const response = await request(app).post("/api/orders").send({
                item: 100,
                qty: 2
            })
            expect(response.statusCode).toBe(404)
        })
    })

    describe("When order details are missing", () => {
        test("should respond with a status code of 400", async () => {
            const requestBodyArray = [
                {item: 1},
                {qty: 2},
                {}
            ];
            for (const bodyData of requestBodyArray) {
                const response = await request(app).post("/api/orders").send(bodyData)
                expect(response.statusCode).toEqual(400)
            }
        })
    });
});

describe("GET /api/orders", () => {
    test("shoud respond with a 200 status code", async () => {
        const response = await request(app).get("/api/orders")
        expect(response.statusCode).toBe(200)
    })
    test("respond with json content type", async () => {
        const response = await request(app).get("/api/orders")
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test("response has data", async () => {
        const response = await request(app).get("/api/orders")
        expect(response.body).toBeDefined()
    })
});
