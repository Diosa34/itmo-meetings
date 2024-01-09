import HOST from "../host";

export const getFetcher = (url, token) => {
    fetch(url,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': HOST,
                'Access-Control-Allow-Credentials': 'true',
                'Authorization': token != null ? token : "",
            }
        }
    )
    .then(res => res.json())
}