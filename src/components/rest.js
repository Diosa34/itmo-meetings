function request(url, method, content_type, body) {
    return fetch(url,
        {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-type': content_type
            },
            body: body
        })
        .then(parse_status)
        .then(parse_json)
    .catch(function (err) {
        console.log('Request failed', err);
    });
}

function parse_status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function parse_json(response) {
    console.log('Request succeeded with JSON response', response.json());
    return response.json()
}
