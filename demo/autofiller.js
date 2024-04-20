import {getStaticCompletion, getOpenCompletion} from './completions.js'
import {attachOverlay, detachOverlay} from './attachment.js'
import _ from 'lodash'

let autofiller = {
    overlay: null,
    textareas: null,
    applyCompletion: null,
    enabled: false,
}

autofiller.init = () => {
    console.log("autofiller init")
    autofiller.overlay = document.createElement('div')
    autofiller.overlay.id = 'overlay'

    autofiller.textareas = document.querySelectorAll('textarea')
    autofiller.applyCompletion = _.debounce(applyCompletion, 500)
    autofiller.focusCallback = (e) => {
        attachOverlay(e, e.target, autofiller.overlay, autofiller.applyCompletion)
    }
    autofiller.blurCallback = (e) => {
        detachOverlay(e.target, autofiller.overlay)
    }

    autofiller.textareas.forEach((textarea) => {
        textarea.addEventListener('focus', autofiller.focusCallback)
        textarea.addEventListener('blur', autofiller.blurCallback)
    })

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'q') {
            autofiller.enabled = !autofiller.enabled
            console.log("autofiller enabled:", autofiller.enabled)
        }
    })


    async function applyCompletion(e) {
        let bestMatch = getStaticCompletion(e)
        if (!bestMatch && autofiller.enabled) {
            bestMatch = await getOpenCompletion(e.target.value)
        }
        let bestMatchSpan = spanWith((bestMatch || "")+"\n")
        bestMatchSpan.classList.add('best-match')
        autofiller.overlay.innerText = e.target.value
        autofiller.overlay.appendChild(bestMatchSpan)
    }

    // dom_helper
    function spanWith(text) {
        let span = document.createElement('span')
        span.innerText = text
        return span
    }
}




export {autofiller}