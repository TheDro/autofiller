let http = {}

http.get = async (url, headers = {}) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.json()
    } catch (error) {
        console.error(error)
    }
}


http.post = async (url, body={}, headers = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        })
        return response.json()
    } catch (error) {
        console.error(error)
    }
}


export {http}