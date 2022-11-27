(function() {
    console.log("Trigger {triggerName} is activated");
    document.addEventListener('mouseup', mouseupEvent);
    function mouseupEvent(event) {
        console.log("Trigger {triggerName} is performing the action");
        fetch('http://localhost:8080/api/message', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // к trigger.attributes прибавляем еще кастомные атрибуты: userId, event, element, app
            body: JSON.stringify({
                "userId": getCookie("userId"),
                "event": "mouseup",
                "element": event.clientX + " " + event.clientY + " " + event.button, // привязан к какому-то конкретному элементу на странице
                // информация о приложении нужна, чтобы мы понимали, к кому относится данное событие
                "app_name": "{appName}",
                "app_id": {appId},
                // в event_params как раз сохраняет trigger.attributes
                "event_params": {attributes}
            })
        })
    }
})()