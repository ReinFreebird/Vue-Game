/**
 * @file Observe instruction list, check current
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module utils/executor
 */

 const asyncHandler = require('../handlers/asyncHandlers');
 const {ProductionQueueMain,ProductionQueuePLC1,ProductionQueueRFID1,ProductionQueueSensor1,ProductionQueueMachine1}
 = require('../models/ProductionQueue');


 var currentProcess;
 var currentIndex=0;

 function processData(curProcess){
 	var data=curProcess;
 	var machine=data.machine;
 	return data.action+" from "+data.onModel+" at station: "+machine.station+" "+machine.ip+" "+machine.status+" "+
 	machine.protocol+" "+machine.port+" with value of "+curProcess.value;
 }
 function sleep(millis) {
 	return new Promise(resolve => setTimeout(resolve, millis));
 }
 async function processInstruction(currentProcess){
 	return new Promise(resolve=>{
 		switch (currentProcess.onModel){
 			case 'RFID': ProductionQueueRFID1.create(currentProcess);break;
 			case 'PLC': ProductionQueuePLC1.create(currentProcess);break;
 			case 'Sensor': ProductionQueueSensor1.create(currentProcess);break;
 			case 'Machine': ProductionQueueMachine1.create(currentProcess);break;
 		}
 		resolve('done');
 	})
 }
 exports.runInstruction= async function(curInstruction){
 	return new Promise(async (resolve,reject)=>{
 		try{
 			switch (currentInstruction.onModel){
 				case 'RFID': ProductionQueueRFID1.create(currentProcess);break;
 				case 'PLC': ProductionQueuePLC1.create(currentProcess);break;
 				case 'Sensor': ProductionQueueSensor1.create(currentProcess);break;
 				case 'Machine': ProductionQueueMachine1.create(currentProcess);break;
 			}
 			resolve('done');
 		}catch (err){
 			reject(err.message);
 		}
 	})
 }
 exports.runProcess = function(){
 	return new Promise (async (resolve,reject)=>{
 		finished=false;
 		currentProcess=defaultProcess;
 		var req={};
 		var res={};

 		while(true){
 			if(currentIndex>=currentProcess.length){
 				console.log('finished');
 				break;
 			}
 			let onProcess = currentProcess[currentIndex++];
 			await sleep(1000);
 			await ProductionQueueMain.create(onProcess);
 			await processInstruction(onProcess);


 		}
 		resolve('done');
 	})

 }