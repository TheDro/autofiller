console.log('hello2')

import {getStaticCompletion, getOpenCompletion} from './completions.js'
import {attachOverlay, detachOverlay} from './attachment.js'
import _ from 'lodash'



// after dom is loaded
document.addEventListener("DOMContentLoaded", function(event) {
    
    // Create the overlay element
    let overlay = document.createElement('div');
    overlay.id = 'overlay';

    let textareas = document.querySelectorAll('textarea')
    let callback = _.debounce(applyCompletion, 500)
    textareas.forEach((textarea) => {
        textarea.addEventListener('focus', (e) => {
            attachOverlay(e, e.target, overlay, callback)
        })
        textarea.addEventListener('blur', (e) => {
            detachOverlay(e.target, overlay)
        })
    })


    async function applyCompletion(e) {
        let bestMatch = getStaticCompletion(e)
        if (!bestMatch) {
            bestMatch = await getOpenCompletion(e.target.value)
        }
        let bestMatchSpan = spanWith((bestMatch || "")+"\n")
        bestMatchSpan.classList.add('best-match')
        overlay.innerText = e.target.value
        overlay.appendChild(bestMatchSpan)
    }

    function spanWith(text) {
        let span = document.createElement('span')
        span.innerText = text
        return span
    }
    
})

