let kafka = require('kafka-node'),
Producer = kafka.Producer,
client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'}),
producer = new Producer(client);

//console.log("Payload"+ payloads);
console.log("Sending production schedule request");

let productionSchedule = {
  "publisherId": "MES",
  "schedule": {
    "manufacturingFacilityId": "1908020000000000002",
    "manufacturingFacilityName": "PUCRS_Facility",
    "manufacturingAreaProductionSchedules": [
      {
        "manufacturingAreaId": "PUCRS",
        "manufacturingAreaName": "PUCRS",
        "actualKPIs": [],
        "toBeKPIs": [],
        "productionOrders": [
          {
            "orderId": "order_1",
            "dueDate": "2020-03-05T16:32:09.265",
            "plannedStartDate": "2020-03-05T10:05:09.265",
            "plannedEndDate": "2020-03-05T16:33:09.265",
            "quantity": "1.0",
            "finalProductId": "TSK1357",
            "finalProductName": "TSK1357 Pipe",
            "lots": [
              {
                "quantity": "1",
                "sops": [
                  {
                    "id": "sop_1",
                    "name": "ThyssenPrintPart",
                    "plannedStartDate": "2020-03-05T10:05:09.265",
                    "plannedEndDate": "2020-03-05T16:28:09.265",
                    "workStationName": "WS_3d_printer_1",
                    "containerType": "WorkStation",
                    "containerName": "WS_3d_printer_1",
                    "manufacturingTasks": [
                      {
                        "id": "sop_1_task_1",
                        "name": "PrintPart",
                        "plannedEndDate": "2020-03-05T16:28:09.265",
                        "plannedStartDate": "2020-03-05T10:05:09.265",
                        "productionResourceId": "3d_printer_1",
                        "productionResourceName": "3d_printer_1",
                        "productionResourceType": "Robot.FixedManipulator",
                        "preceedingTasks": [],
                        "commonStart": [],                        
                        "manufacturingTaskDef": {
                          "id": "PrintPart",
                          "name": "PrintPart"
                        }
                      }
                    ]
                  },
                  {
                    "id": "sop_2",
                    "name": "ThyssenMovePart",
                    "plannedStartDate": "2020-03-05T16:28:09.265",
                    "plannedEndDate": "2020-03-05T16:33:09.265",
                    "workStationName": "WS_3d_printer_1",
                    "containerType": "WorkStation",
                    "containerName": "WS_3d_printer_1",
                    "manufacturingTasks": [
                      {
                        "id": "sop_2_task_1",
                        "name": "PickPart_3d_printer_1",
                        "plannedEndDate": "2020-03-05T16:30:09.265",
                        "plannedStartDate": "2020-03-05T16:30:39.265",
                        "productionResourceId": "mk3",
                        "productionResourceName": "mk3",
                        "productionResourceType": "Robot.MobileManipulator",
                        "preceedingTasks": [],
                        "commonStart": [],
                        "manufacturingTaskDef": {
                          "id": "PickPart_3d_printer_1",
                          "name": "PickPart_3d_printer_1"
                        } 
                      },
                      {
                        "id": "sop_2_task_2",
                        "name": "PlacePart_Rack1",
                        "plannedEndDate": "2020-03-05T16:32:09.265",
                        "plannedStartDate": "2020-03-05T16:32:39.265",
                        "productionResourceId": "asrs",
                        "productionResourceName": "asrs",
                        "productionResourceType": "Robot.FixedManipulator",
                        "preceedingTasks": [],
                        "commonStart": [],
                        "manufacturingTaskDef": {
                          "id": "PlacePart_Rack1",
                          "name": "PlacePart_Rack1"
                        } 
                      }                                            
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

payloads = [
  { topic:'OSPS_MES_ProductionSchedule', messages:[JSON.stringify(productionSchedule)]}
]


producer.on('ready', function () {
  console.log("PRODUCER READY");
  //while(true){
  producer.send(payloads, function (err, data) {
    if(err){
      console.log(err);
    }
    console.log(data);
  });
  //}
});

producer.on('error', function (err) {})


