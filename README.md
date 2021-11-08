# RabbitMQ Simple

NodeJs 8.4.0 based rabbitmq producer/consumer service.


## Getting Started
### To run the project:  

Spin rabbitmq server docker:  
`$ sudo docker run --name myrabbitmq -p 5672:5672 -d rabbitmq`

`$ sudo npm install`  

For producer:  
`$ node index.js p`

For consumer:  
`$ node index.js c`
