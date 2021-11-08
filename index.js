var rabbitmq = require("./rabbitmq");
const func_name = process.argv[2];

if(func_name == "p")
	rabbitmq.produce(rabbitmq.createData());

if(func_name == "c")
	rabbitmq.consume();
