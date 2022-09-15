import fetch from "node-fetch";

function getDetails(url) {
    return fetch(url).then(response => response.json());
}

var u = "http://localhost:5000/users/getAllUsers";
getDetails(u).then(function(data) {
    console.log(data);
})
