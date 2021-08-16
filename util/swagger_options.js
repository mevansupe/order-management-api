const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Order Management API",
            version: '1.0.0',
            description: "Order Management API",
            contact: {
                name: "Mevan Supeshala",
                url: "https://google.com",
                email: "mevansupe@gmail.com"
            },
            servers: ["http://localhost:8000"]
        },
    },
    apis: ["*.js"]
}

module.exports = swaggerOptions;
