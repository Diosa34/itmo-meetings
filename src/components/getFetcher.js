export const getFetcher = (url, token) => {
    fetch(url,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
                'Authorization': token != null ? token : "",
            }
        }
    )
    .then(res => res.json())
}