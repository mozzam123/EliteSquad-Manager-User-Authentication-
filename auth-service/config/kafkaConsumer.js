const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
    brokers: ["localhost:9092"],
    logLevel: logLevel.WARN
});

const createConsumer = (groupId, topics, eachMessageHandler) => {
    const consumer = kafka.consumer({ groupId });

    const runConsumer = async () => {
        await consumer.connect();
        console.log(`Consumer connected: ${groupId}`);
        await consumer.subscribe({ topics, fromBeginning: false });

        await consumer.run({
            eachMessage: eachMessageHandler,
        });
    };

    const disconnectConsumer = async () => {
        await consumer.disconnect();
        console.log(`Consumer disconnected: ${groupId}`);
    };

    return {
        runConsumer,
        disconnectConsumer,
    };
};

module.exports = createConsumer;
