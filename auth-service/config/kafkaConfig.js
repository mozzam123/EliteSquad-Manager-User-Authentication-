const { Kafka, logLevel } = require('kafkajs');

// Create kafka producer instance
const kafkaProducer = new Kafka({
    brokers: ["localhost:9092"],
    logLevel: logLevel.WARN
}).producer()

// Create kafka producer instance
// const kafkaConsumer = new Kafka({
//     brokers: ["localhost:9092"],
//     logLevel: logLevel.WARN
// }).consumer({ groupId: 'auth-service' })


// module.exports = { kafkaProducer, kafkaConsumer }
module.exports = { kafkaProducer }