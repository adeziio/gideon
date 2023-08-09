const domain = process.env.REACT_APP_ENV === "prod" ? "https://gideon-ai.vercel.app" : "http://127.0.0.1:5000";

export const fetchChatBot = async (model, input) => {
    const res = await fetch(`${domain}/openai`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "GIDEON_API_KEY": process.env.REACT_APP_GIDEON_API_KEY
        },
        "body": JSON.stringify({
            "model": model,
            "input": input
        })
    })
    return await res.json()
}
