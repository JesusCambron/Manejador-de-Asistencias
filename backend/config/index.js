module.exports = {
    port: process.env.PORT,
    mongoURI : process.env.MONGO_URI,
    salt_rounds: process.env.SALT_ROUNDS,
    jwtSecret: process.env.JWT_SECRET,
    regex_password: process.env.REGEX_PASSWORD
}