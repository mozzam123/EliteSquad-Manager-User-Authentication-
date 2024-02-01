const { Kafka, logLevel } = require('kafkajs');

// Create kafka producer instance
const kafkaProducer = new Kafka({
    brokers: ["localhost:9092"],
    logLevel: logLevel.WARN
}).producer()


module.exports = { kafkaProducer }