'use strict';

	var Client = require('azure-iothub').Client;
	var connectionString = 'HostName=IOTCOPPHANEENDRA.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=k71knkCs7VKJPdEzyhWe/d6jBXmuaEvmd/Q9xjkeUwg=';
	var methodName = "writeLine";
	var deviceId = "Raspberry";

	module.exports = function(context, req){
		context.log('JavaScript HTTP trigger function processe');
		var client=Client.fromConnectionString(connectionString);
		var methodParams = {
			methodName:methodName,
			payload: 'a line to be written',
			timeoutInSeconds:30
		
		};
		client.invokeDeviceMethod(deviceId, methodParams, function (err, result){
			if(err){
				console.error("failed to invoke method \'" + methodName + "\': " + err.message);
			}else{
				console.log(methodName + ' on ' + deviceId + ' : ');
				console.log(JSON.stringify(result, null, 2));
			}
		});	
	};

