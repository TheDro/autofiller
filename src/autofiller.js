import {getStaticCompletion, getOpenCompletion} from './completions.js'
import {attachOverlay, detachOverlay} from './attachment.js'
import _ from 'lodash'

let autofiller = {
    overlay: null,
    textareas: null,
    applyCompletion: null,
    enabled: false,
    lastCompletion: ''
}
window.autofiller = autofiller

autofiller.init = () => {
    console.log("autofiller init v2")
    autofiller.overlay = document.createElement('div')
    autofiller.overlay.id = 'overlay'
    autofiller.overlay.style['background-color'] = 'rgba(255, 255, 0, 0.1)'

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
        // accept completion when user presses tab
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && autofiller.lastCompletion) {
                e.preventDefault()
                e.target.value = e.target.value + autofiller.lastCompletion
            }
        })
    })

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'q') {
            autofiller.enabled = !autofiller.enabled
            autofiller.overlay.style['background-color'] = autofiller.enabled ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 255, 0, 0.1)'
            console.log("autofiller enabled:", autofiller.enabled)
        }
    })

    



    async function applyCompletion(e) {
        console.log('applyCompletion')
        let bestMatch = getStaticCompletion(e)
        if (!bestMatch && autofiller.enabled) {
            bestMatch = await getOpenCompletion(e.target.value)
        }
        autofiller.lastCompletion = bestMatch
        let bestMatchSpan = spanWith((bestMatch || "")+"\n")
        bestMatchSpan.style.color = 'gray'
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