function slider() {
    let currentSlider = 1

    return function loopSlides() {
        const slides = document.getElementsByClassName("slide");

        if (currentSlider >= slides.length) {
            currentSlider = 1
        } else {
            currentSlider++;
        }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }

        slides[currentSlider - 1].style.display = 'block';
    }

}

setInterval(slider(), 8000);