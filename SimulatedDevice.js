'use strict';

var mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client;
var connectionString = process.argv[2];
var client = DeviceClient.fromConnectionString(connectionString, mqtt);

function onWriteLine(request, response){
	try{
	console.log(request.payload);
	var dateTime = require('node-datetime');
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	console.log(formatted);
	var response = {result:'success'};
	return  response;
	}catch(err){
		var response = { result:'failure'};
		return response;
	}
/*	response.send(200, "Input was written to log.", function(err){
		if(err){
			console.error('An error occured when sending a method response:\n' + err.toString());
		}else{
			console.log("Response to method \'" + request.methodName + "\' sent successfully.");
		}
	});
*/
}

function receiveMessageCallback(msg) {
//  blinkLED();
  var message = msg.getData().toString('utf-8');
  client.complete(msg, () => {
    console.log('Receive message: ' + message);
  });
}

client.open(function(err){
	if(err){
		console.error('cloud not open IOTHub client');
	}else{
		console.log('client opened');
		client.onDeviceMethod('WriteLine', onWriteLine);
		client.on('message', receiveMessageCallback);
	}
});
