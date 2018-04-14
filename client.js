const mqtt = require('mqtt');

const client = mqtt.connect({ 'host': '192.168.1.72', port: 1883, clientId: 'igu-iot'})

let myState = {
  currentSensor: 5.5,
  switch: 'ON',
};

const publish = (state) => {
  client.publish('igu/igu-iot/state', JSON.stringify(state));
};

client.on('connect', () => {
  publish(myState);
});

setInterval(() => {
  myState.currentSensor = value = (Math.random() * 0.5 - 0.25) + 5.5;
  publish(myState);
}, 2000);

client.subscribe('igu/igu-iot/command');
client.on('message', (topic, message) => {
  console.log('message topic:', topic, message.toString());
  const command = JSON.parse(message.toString());
  myState = {
    ...myState,
    ...command.state,
  };
  publish(myState);
})
