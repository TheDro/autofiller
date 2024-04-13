
window.getOpenCompletion = getOpenCompletion

async function getOpenCompletion (prompt) {
    let response = await http.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'You are an auto-completion assitant.'
            },
            {
                role: 'user',
                content: 'Finish this sentence: '
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    }, {
        'Authorization': 'Bearer ' + env.OPENAI_API_KEY
    })
    let content = response.choices[0].message.content
    console.log(content)
    return content
}



let staticCompletions = [
    "this is the way",
    "my_name@example.com",
    "https://example.com",
    "Andy Bernard",
    "Michael Scott"
]

function getStaticCompletion(e) {
    let bestMatch = null
    if (e.target.value) {
        staticCompletions.forEach(completion => {
            if (completion.startsWith(e.target.value)) {
                bestMatch = completion.slice(e.target.value.length)
            }
        })
    }
    return bestMatch
}


async function getCompletion(e) {
    let staticCompletion = getStaticCompletion(e)
    if (staticCompletion) {
        return Promise.new((resolve, reject) => {
            resolve(staticCompletion(e))
        })
    } else {
        return getOpenCompletion(e.target.value)
    }
}

export {getStaticCompletion, getOpenCompletion}