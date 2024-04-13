console.log('hello2')
import {env} from './env.js'
import {http} from './http.js'

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



let completions = [
    "this is the way",
    "my_name@example.com",
    "https://example.com",
    "Andy Bernard",
    "Michael Scott"
]

// after dom is loaded
document.addEventListener("DOMContentLoaded", function(event) {
    
    // Create the overlay element
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    // Append the overlay to the target element's parent
    const textArea = document.getElementById('description');
    textArea.parentNode.appendChild(overlay);

    // When textArea moves or is resized, update the overlay position

    attachOverlay(textArea, overlay, contentCallback)
    
    function contentCallback(e) {
        let bestMatch = ""
        if (e.target.value) {
            completions.forEach(completion => {
                if (completion.startsWith(e.target.value)) {
                    bestMatch = completion.slice(e.target.value.length)
                }
            })
        }
        let bestMapSpan = spanWith(bestMatch)
        bestMapSpan.classList.add('best-match')
        overlay.innerText = e.target.value
        overlay.appendChild(bestMapSpan)
    }

    function spanWith(text) {
        let span = document.createElement('span')
        span.innerText = text
        return span
    }


    function attachOverlay(textArea, overlay, contentCallback) {

        matchStyles()
        new ResizeObserver(resizeOverlay).observe(textArea)
        textArea.addEventListener('input', matchContent)
        textArea.addEventListener('keydown', matchContent)
        textArea.addEventListener('scroll', matchContent)



        function resizeOverlay() {
            let position = textArea.getBoundingClientRect();
            overlay.style.left = position.left + 'px';
            overlay.style.top = position.top + 'px';
            overlay.style.width = position.width + 'px';
            overlay.style.height = position.height + 'px';
        }

        function matchContent(e) {
            overlay.innerText = e.target.value+"\n"
            setTimeout(() => {
                overlay.scrollTop = e.target.scrollTop
                contentCallback(e)
            }, 0)
        }

        

        function matchStyles() {
            let style = window.getComputedStyle(textArea)
            window.styles = style
            overlay.style['padding-top'] = style.getPropertyValue('padding-top')
            overlay.style['padding-bottom'] = style.getPropertyValue('padding-bottom')
            overlay.style['padding-left'] = style.getPropertyValue('padding-left')
            overlay.style['padding-right'] = style.getPropertyValue('padding-right')
            overlay.style['border-top-width'] = style.getPropertyValue('border-top-width')
            overlay.style['border-bottom-width'] = style.getPropertyValue('border-bottom-width')
            overlay.style['border-left-width'] = style.getPropertyValue('border-left-width')
            overlay.style['border-right-width'] = style.getPropertyValue('border-right-width')
            overlay.style['font-size'] = style.getPropertyValue('font-size')
            overlay.style['line-height'] = style.getPropertyValue('line-height')
            overlay.style['font-family'] = style.getPropertyValue('font-family')
            overlay.style['overflow-x'] = style.getPropertyValue('overflow-x')
            overlay.style['overflow-y'] = style.getPropertyValue('overflow-y')
            overlay.style['overflow-wrap'] = style.getPropertyValue('overflow-wrap')
        }
    }

    
})

