export const fetchChatBot = async (msg) => {
    const res = await fetch(`https://robomatic-ai.p.rapidapi.com/api.php`, {
        "method": "POST",
        "headers": {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com',
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
        },
        "body": new URLSearchParams({
            in: msg,
            op: 'in',
            cbot: '1',
            SessionID: 'RapidAPI1',
            ChatSource: 'RapidAPI',
            cbid: '1',
            key: process.env.REACT_APP_ROBOMATIC_KEY
        })
    })
    return await res.json()
}

export const fetchLocation = async () => {
    const res = await fetch(`https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation?apikey=${process.env.REACT_APP_FIND_ANY_IP_API_KEY}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
        }
    })
    return await res.json()
}

export const fetchWeatherData = async (search) => {
    let newSearch = search;
    const res = await fetch("https://weatherapi-com.p.rapidapi.com/forecast.json?q=" + newSearch + "&days=3", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
        }
    })
    return await res.json()
}
