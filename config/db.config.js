module.exports = {
    HOST: "localhost",
    USER: "restaurants",
    PASSWORD: "restaurant_pos",
    DB: "restaurant",
    DIALECT: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}