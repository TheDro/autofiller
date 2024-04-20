import {env} from './env.js'
import {http} from './http.js'

window.getOpenCompletion = getOpenCompletion

async function getOpenCompletion (prompt) {
    if (prompt.length < 3) {
        return null
    }
    prompt = prompt.slice(-1000)
    let max_tokens = Math.round(256 + prompt.length/3)
    let response = await http.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'You are an auto-completion assitant.'
            },
            {
                role: 'user',
                content: 'Finish this sentence concisely: '
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 1,
        max_tokens: max_tokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    }, {
        'Authorization': 'Bearer ' + env.OPENAI_API_KEY
    })
    let content = response.choices[0].message.content
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