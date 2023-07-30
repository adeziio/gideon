export const fetchChatBot = async (msg) => {
    const res = await fetch(`https://gideon-ai.vercel.app/chat`, {
        "method": "POST",
        "headers": {
            'Content-Type': 'application/json',
            "GIDEON_API_KEY": process.env.REACT_APP_GIDEON_API_KEY
        },
        "body": JSON.stringify({
            "query": msg
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
