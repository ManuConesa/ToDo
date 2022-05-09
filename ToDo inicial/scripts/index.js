let data = {
    "email": "string",
    "password": "string"
}

const settingsCreateUser = {
    method: "POST",
    headers:{
        "Content-type": "application/json"
    },
    body: JSON.stringify(data)
}

fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", settingsCreateUser)
    .then(function (response) {
        console.log(response.status);
        if (response.status === 201) {
            return response.json();
        }
    })
    .then (function (info) {
        
    })