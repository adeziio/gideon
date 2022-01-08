export const fetchBrainShopAI = async (msg) => {
    const res = await fetch(`https://acobot-brainshop-ai-v1.p.rapidapi.com/get?bid=${process.env.REACT_APP_BRAINSHOP_AI_ID}&key=${process.env.REACT_APP_BRAINSHOP_AI_KEY}&uid=${process.env.REACT_APP_BRAINSHOP_AI_UID}&msg=${msg}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "acobot-brainshop-ai-v1.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
        }
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
