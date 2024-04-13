console.log('hello2')
import {env} from './env.js'
import {http} from './http.js'
import {getStaticCompletion, getOpenCompletion} from './completions.js'




// after dom is loaded
document.addEventListener("DOMContentLoaded", function(event) {
    
    // Create the overlay element
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    let textareas = document.querySelectorAll('textarea')
    textareas.forEach((textarea) => {
        textarea.addEventListener('focus', (e) => {
            console.log('focus')
            attachOverlay(e.target, overlay, contentCallback)
            contentCallback(e)
        })
    })


    
    function contentCallback(e) {
        let bestMatch = getStaticCompletion(e)
        let bestMatchSpan = spanWith(bestMatch)
        bestMatchSpan.classList.add('best-match')
        overlay.innerText = e.target.value
        overlay.appendChild(bestMatchSpan)
    }

    function spanWith(text) {
        let span = document.createElement('span')
        span.innerText = text
        return span
    }


    function attachOverlay(textArea, overlay, contentCallback) {
        console.log({textArea, overlay})

        textArea.parentNode.appendChild(overlay)
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

