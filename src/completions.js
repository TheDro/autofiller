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
                content: `Finish the following text with 10 words or less: <<<${prompt}>>>`
            },
            // {
            //     role: 'user',
            //     content: prompt
            // }
        ],
        temperature: 0.5,
        max_tokens: max_tokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    }, {
        'Authorization': 'Bearer ' + env.OPENAI_API_KEY
    })
    let content = response.choices[0].message.content
    content = withoutOverlap(prompt, content)
    return content
}

function withoutOverlap(prompt, completion) {
    for (let offset=0; offset < prompt.length; offset++) {
        if (completion.startsWith(prompt.slice(offset))) {
            let remainder = completion.slice(prompt.length-offset)
            console.log('remainder', [completion, remainder])
            return remainder
        }
    }
    return completion
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