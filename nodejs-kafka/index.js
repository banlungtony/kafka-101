const Kafka = require("node-rdkafka");
const readConfigFile = require("./readConfigFile");
const config = readConfigFile("client.properties");

/**
 * Producer
 */
const producer = new Kafka.Producer(config);
producer.connect();
producer.on("ready", () => {
    producer.produce("my-topic", -1, Buffer.from("value"), Buffer.from("key"));
});

/**
 * Consumer
 */

config["group.id"] = "node-group";
const consumer = new Kafka.KafkaConsumer(config, {"auto.offset.reset": "earliest" });
consumer.connect();
consumer.on("ready", () => {
    consumer.subscribe(["my-topic"]);
    consumer.consume();
}).on("data", (message) => {
    console.log(`Consumed message group ${config["group.id"]}`, {
        message: message,
        key: message.key.toString(),
        value: message.value.toString(),
    });
});