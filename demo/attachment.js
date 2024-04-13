
let eventListeners = {}

function detachOverlay(textArea, overlay) {
    textArea.removeEventListener('input', eventListeners[textArea])
    textArea.removeEventListener('keydown', eventListeners[textArea])
    textArea.removeEventListener('scroll', eventListeners[textArea])
    overlay.remove()
}

function attachOverlay(e, textArea, overlay, contentCallback) {
    textArea.parentNode.appendChild(overlay)
    matchStyles(textArea, overlay)
    new ResizeObserver((entries) => {resizeOverlay(entries, overlay)}).observe(textArea)
    let eventListener = (e) => {matchContent(e, overlay, contentCallback)}
    eventListeners[textArea] = eventListener
    textArea.addEventListener('input', eventListener)
    textArea.addEventListener('keydown', eventListener)
    textArea.addEventListener('scroll', eventListener)
    matchContent(e, overlay, contentCallback)
}

function resizeOverlay(entries, overlay) {
    let textArea = entries[0].target
    let position = textArea.getBoundingClientRect();
    overlay.style.left = position.left + 'px';
    overlay.style.top = position.top + 'px';
    overlay.style.width = position.width + 'px';
    overlay.style.height = position.height + 'px';
}

function matchContent(e, overlay, contentCallback) {
    overlay.innerText = e.target.value+"\n"
    setTimeout(() => {
        overlay.scrollTop = e.target.scrollTop
        contentCallback(e)
    }, 0)
}


function matchStyles(textArea, overlay) {
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


export {attachOverlay, detachOverlay}