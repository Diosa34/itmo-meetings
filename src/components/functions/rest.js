import HOST from "../../host";

export default async function request(url, method, content_type, body) {
    return await fetch(url,
        {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-type': content_type,
                'Access-Control-Allow-Origin': HOST,
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(body)
        })
    // .then(parse_status)
    // .then(parse_json)
    // .catch(function (err) {
    //     console.log('Request failed', err);
    // });
}

function parse_status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        let message = ''
        if (response.status >= 300 && response.status < 400) {
            message = 'Страничка недоступна по данному адресу'
        } else if (response.status >= 400 && response.status < 500) {
            message = 'Введены неверные данные.'
        } else if (response.status >= 500 && response.status < 600) {
            message = 'Ошибка сервера.'
        }
        // return Promise.reject(new Error(response.statusText))
        console.log(response.statusText)
        return Promise.reject(new Error(message))
    }
}

// function parse_json(response) {
//     console.log('Request succeeded with JSON response', response.json());
//     return response.json()
// }

