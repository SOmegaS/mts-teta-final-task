
class Controller {
    
    getactions(req, res) {
        try{
            let actions = [
                {
                  "userId": "user-id-0",
                  "event": "mousedown",
                  "element": "818 279 0",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.403487927+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "mouseup",
                  "element": "818 279 0",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.403634595+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "set_interval",
                  "element": "",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.403789873+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "mousemove",
                  "element": "856 250",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.403922415+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "set_interval",
                  "element": "",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.404035165+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "set_interval",
                  "element": "",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.404156512+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "set_interval",
                  "element": "",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.40427639+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "set_interval",
                  "element": "",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.404427511+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "set_interval",
                  "element": "",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.404553725+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "set_interval",
                  "element": "",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.404653944+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "set_interval",
                  "element": "",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.404752303+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "set_interval",
                  "element": "",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.404891192+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "set_interval",
                  "element": "",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.404961333+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "set_interval",
                  "element": "",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.405026573+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "set_interval",
                  "element": "",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.40510663+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "mousemove",
                  "element": "1320 507",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.405202958+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "set_interval",
                  "element": "",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.405312448+03:00",
                  "eventParams": {},
                  "msisdn": ""
                },
                {
                  "userId": "user-id-0",
                  "event": "mousedown",
                  "element": "1019 320 2",
                  "appName": "present",
                  "appId": 1,
                  "timestamp": "2022-12-18T20:42:18.40542864+03:00",
                  "eventParams": {},
                  "msisdn": ""
                }]
            

            res.status(200).json(actions)
        } catch (err) {
            console.log(err)
        }
    }

    gettriggers(req, res) {
        try{
            let actions = [{
                "id": 2,
                "name": "string",
                "type": "MOUSE_MOVE",
                "attributes": "{\"setTimeout\":null,\"mouseDown\":null,\"mouseUp\":null,\"scroll\":null,\"mouseMove\":{\"delayMillis\":1000,\"messageToSend\":{\"additionalProp1\":{},\"additionalProp2\":{},\"additionalProp3\":{}}}}",
                "containerId": 1
              },
              {
                "id": 4,
                "name": "string",
                "type": "MOUSE_DOWN",
                "attributes": "{\"setTimeout\":null,\"mouseDown\":{\"messageToSend\":{\"additionalProp1\":{},\"additionalProp2\":{},\"additionalProp3\":{}},\"delayMillis\":0},\"mouseUp\":null,\"scroll\":null,\"mouseMove\":null}",
                "containerId": 1
              },
              {
                "id": 1,
                "name": "string",
                "type": "SET_INTERVAL",
                "attributes": "{\"setTimeout\":{\"delayMillis\":1000,\"messageToSend\":{\"additionalProp1\":{},\"additionalProp2\":{},\"additionalProp3\":{}}},\"mouseDown\":null,\"mouseUp\":null,\"scroll\":null,\"mouseMove\":null}",
                "containerId": 1
              },
              {
                "id": 3,
                "name": "string",
                "type": "SCROLL",
                "attributes": "{\"setTimeout\":null,\"mouseDown\":null,\"mouseUp\":null,\"scroll\":{\"delayMillis\":1000,\"messageToSend\":{\"additionalProp1\":{},\"additionalProp2\":{},\"additionalProp3\":{}}},\"mouseMove\":null}",
                "containerId": 1
              },
              {
                "id": 5,
                "name": "string",
                "type": "MOUSE_UP",
                "attributes": "{\"setTimeout\":null,\"mouseDown\":null,\"mouseUp\":{\"messageToSend\":{\"additionalProp1\":{},\"additionalProp2\":{},\"additionalProp3\":{}},\"delayMillis\":0},\"scroll\":null,\"mouseMove\":null}",
                "containerId": 1
              }]

            res.status(200).json(actions)
        } catch (err) {
            console.log(err)
        }
    }

    getcontainers(req, res) {
        try{
            let actions = [
                {
                  "id": 1,
                  "name": "not_present",
                  "appId": 1,
                  "triggersId": [
                    2,
                    4,
                    1,
                    3,
                    5
                  ]
                }
              ]

            res.status(200).json(actions)
        } catch (err) {
            console.log(err)
        }
    }

    getapps(req, res) {
        try{
            let apps = [
                {
                  "id": 1,
                  "name": "present",
                  "containersId": [
                    1
                  ]
                }
              ]              

            res.status(200).json(apps)
        } catch (err) {
            console.log(err)
        }
    }

}


module.exports = new Controller()