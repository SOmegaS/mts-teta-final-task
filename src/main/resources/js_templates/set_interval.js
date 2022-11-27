(function() {
    console.log("Trigger {triggerName} is activated");
    setInterval(function() {
        console.log("Trigger {triggerName} is performing the action");
        fetch('http://localhost:8080/api/message', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userId": getCookie("userId"),
                "event": "set_interval",
                "element": null,
                "app_name": "{appName}",
                "app_id": {appId},
                "event_params": {attributes}
            })
        })
    }, {delayMillis})
})()