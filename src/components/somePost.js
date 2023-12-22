export default async function somePost(url, method, content_type, body) {
    const token = 'Bearer ' + localStorage.getItem('token')
    return await fetch(url,
        {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-type': content_type,
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
                'Authorization': token != null ? token : "",
            },
            body: JSON.stringify(body)
        })
}