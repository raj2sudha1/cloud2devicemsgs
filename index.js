'use strict';

	var Client = require('azure-iothub').Client;
	var connectionString = process.argv[2];
	var methodName = "WriteLine";
	var deviceId = process.argv[3];

//	module.exports = function(context, req){
//		context.log('JavaScript HTTP trigger function processe');
		var client=Client.fromConnectionString(connectionString);
		var methodParams = {
			methodName:methodName,
			payload: 'a line to be written $(date)',
			timeoutInSeconds:60
		
		};
		client.invokeDeviceMethod(deviceId, methodParams, function (err, result){
			if(err){
				console.error("failed to invoke method \'" + methodName + "\': " + err.message);
			}else{
				console.log(methodName + ' on ' + deviceId + ' : ');
				console.log(JSON.stringify(result, null, 2));
			}
		});	
//	};

