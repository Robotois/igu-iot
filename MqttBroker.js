const mosca = require('mosca');
const redis = require('redis');

const redisConfig = {
  type: 'redis',
  redis,
  db: 12,
  port: 6379,
  return_buffers: true,
  host: 'localhost',
};

const moscaSettings = {
  port: 1883,
  backend: redisConfig,
  persistence: {
    factory: mosca.persistence.Redis,
  }
};

const server = new mosca.Server(moscaSettings);

server.on('ready', () => {
  console.log('Mosca server is up and running')
});

server.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published:', client ? client.id : undefined, packet.topic, packet.payload.toString());
});
