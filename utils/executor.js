/**
 * @file Observe instruction list, check current
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module utils/executor
 */

 const asyncHandler = require('../handlers/asyncHandlers');
 const ProductionQueue= require('../models/ProductionQueue');

 var defaultProcess=[
 {name:'0',machine:{station:"1",ip:"127.0.0.1",status:"Online"},onModel:"RFID",action:"READ",address:""},

 {name:'1',machine:{station:"1",ip:"127.0.0.1",protocol:"UDP",port:2000,status:"Online"},onModel:"PLC",action:"WRITE",address:""
 ,value:1},

 {name:'2',machine:{station:"2",status:"Online"},onModel:"Sensor",action:"READ",address:""},

 {name:'3',machine:{station:"2",ipAddress:"127.0.0.1",port:"2000"},onModel:"Machine",action:"WRITE",address:""
 ,value:'Machine Goes Boom'},
 ];
 var currentProcess;
 var currentIndex=0;
 varfinished=true;

 function processData(curProcess){
 	var data=curProcess;
 	var machine=data.machine;
 	return data.action+" from "+data.onModel+" at station: "+machine.station+" "+machine.ip+" "+machine.status+" "+
 	machine.protocol+" "+machine.port+" with value of "+curProcess.value;
 }
 function sleep(millis) {
 	return new Promise(resolve => setTimeout(resolve, millis));
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
 			await ProductionQueue.create(onProcess);


 		}
 		resolve('done');
 	})

 }