const Kafka = require("node-rdkafka");
const readConfigFile = require("./readConfigFile");
const producer = new Kafka.Producer(readConfigFile("client.properties"));
producer.connect();
producer.on("ready", () => {
    const topic = "my-topic";
    const randomKey = Math.floor(Math.random() * 10).toString();
    const kafkaValue = "value";

    producer.produce(topic, -1, Buffer.from(kafkaValue), Buffer.from(randomKey));

    console.log('produced', {
        key: randomKey,
        value: kafkaValue,
        topic
    });
});