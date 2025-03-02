document.addEventListener('DOMContentLoaded', () => {
    const string = document.querySelector('.string');
    const bulb = document.querySelector('.bulb');
    const filament = document.querySelector('.filament');
    const body = document.body;
    let isOn = false;
    let isDragging = false;
    let startY;
    let originalHeight;

    string.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.clientY;
        originalHeight = parseInt(getComputedStyle(string).height);
        string.style.transition = 'none'; // Disable transition while dragging
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaY = e.clientY - startY;
        const newHeight = originalHeight + deltaY;

        // Limit the pulling distance
        if (newHeight >= originalHeight && newHeight <= originalHeight + 30) {
            string.style.height = newHeight + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;

        const currentHeight = parseInt(getComputedStyle(string).height);
        string.style.transition = 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease-out';

        if (currentHeight >= originalHeight + 20) {
            string.classList.add('pulled');
            isOn = !isOn;
            bulb.classList.toggle('on');
            filament.classList.toggle('on');
            body.classList.toggle('light-on');
        }

        string.style.height = '';
        setTimeout(() => {
            string.classList.remove('pulled');
        }, 800);
    });
});

