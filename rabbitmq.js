const amqp = require("amqplib");
var random = require('random-name');


var localhost = "amqp://localhost:5672";
var awsServer = "amqp://52.66.78.130:5672";
var amqpServer = awsServer;

// producer
exports.produce = async function(data) {
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("myqueue1");

    data.forEach((value) => {
        sendData(value)
        async function sendData(value) {
            await channel.sendToQueue("myqueue1", Buffer.from(JSON.stringify(value)))
            console.log(`Job sent successfully! - ${value}`);
        }
    });

    await channel.close();
    await connection.close();
};

// consumer
exports.consume = async function(data) {
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("myqueue1");

    async function closeConn() {
        await channel.close();
        await connection.close();
    }  

    var count = 0;
    var maxData = 10;
    
    channel.consume("myqueue1", message => {
        if(count == maxData-1) {
            closeConn();
            return 0;
        };

        const input = JSON.parse(message.content.toString());
        console.log(`Successfully received job with input ${input}`);

        channel.ack(message);
        count++;

    })

    console.log("Waiting for messages...");
};

exports.createData = function() {
   var maxData = 10;
    var result = [];
    for(var i=0; i<maxData; i++) {
        result.push(random());
    };
    return result;
};
