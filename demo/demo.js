console.log('hello2')

// after dom is loaded
document.addEventListener("DOMContentLoaded", function(event) {
    
    // Create the overlay element
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    // Append the overlay to the target element's parent
    const textArea = document.getElementById('description');
    textArea.parentNode.appendChild(overlay);

    // When textArea moves or is resized, update the overlay position

    attachOverlay(textArea, overlay)


    function attachOverlay(textArea, overlay) {

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
        }
    }

    
})

