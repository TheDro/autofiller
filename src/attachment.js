
let eventListeners = {}

function detachOverlay(textArea, overlay) {
    textArea.removeEventListener('input', eventListeners[textArea])
    textArea.removeEventListener('keydown', eventListeners[textArea])
    textArea.removeEventListener('scroll', eventListeners[textArea])
    overlay.remove()
}

function attachOverlay(e, textArea, overlay, contentCallback) {
    document.body.appendChild(overlay)
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
    let bodyPosition = document.body.getBoundingClientRect();
    let bodyStyle = window.getComputedStyle(document.body)
    // TODO: need to properly deal with collapsing margin
    let bodyMarginTop = parseInt(bodyStyle.getPropertyValue('margin-top') || 0)
    overlay.style.left = position.left + 'px';
    overlay.style.top = position.top - bodyPosition.top + bodyMarginTop + 'px';
    overlay.style.width = position.width + 'px';
    overlay.style.height = position.height + 'px';
}

function matchContent(e, overlay, contentCallback) {
    overlay.innerText = e.target.value+"\n"
    setTimeout(() => {
        overlay.scrollTop = e.target.scrollTop
        overlay.scrollLeft = e.target.scrollLeft
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
    overlay.style['overflow-x'] = style.getPropertyValue('overflow-x')
    overlay.style['overflow-y'] = style.getPropertyValue('overflow-y')
    overlay.style['overflow-wrap'] = style.getPropertyValue('overflow-wrap')

    overlay.style['font-family'] = style.getPropertyValue('font-family')
    overlay.style['font-size'] = style.getPropertyValue('font-size')
    overlay.style['font-stretch'] = style.getPropertyValue('font-stretch')
    overlay.style['font-style'] = style.getPropertyValue('font-style')
    overlay.style['font-weight'] = style.getPropertyValue('font-weight')
    overlay.style['letter-spacing'] = style.getPropertyValue('letter-spacing')
    overlay.style['line-height'] = style.getPropertyValue('line-height')
    overlay.style['text-align'] = style.getPropertyValue('text-align')
    overlay.style['white-space'] = style.getPropertyValue('white-space')
    overlay.style['word-wrap'] = style.getPropertyValue('word-wrap')
    overlay.style['display'] = style.getPropertyValue('display')
    overlay.style['text-wrap'] = style.getPropertyValue('text-wrap')
    
    overlay.style['box-sizing'] = 'border-box';
    overlay.style['border-style'] = 'solid';
    overlay.style['border-color'] = 'orange';
    overlay.style['pointer-events'] = 'none';
    overlay.style['position'] = 'absolute';
    overlay.style['z-index'] = '1000';
    overlay.style['color'] = '#333';
    
    if (textArea.tagName === 'INPUT') {
        overlay.style['white-space-collapse'] = 'preserve'
        overlay.style['overflow-y'] = 'hidden'
        overlay.style['overflow-x'] = 'hidden'
        overlay.style['text-wrap'] = 'nowrap'
    }

}


export {attachOverlay, detachOverlay}