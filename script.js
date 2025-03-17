function openModal(videoSrc) {
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    modal.style.display = "flex";
    modalVideo.src = videoSrc;
}

function closeModal() {
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    modal.style.display = "none";
    modalVideo.pause();
}

// Enable horizontal scroll with mouse drag
document.addEventListener("DOMContentLoaded", function () {
    const videoContainer = document.querySelector(".video-container");
    let isDown = false;
    let startX;
    let scrollLeft;

    videoContainer.addEventListener("mousedown", (e) => {
        isDown = true;
        videoContainer.classList.add("active");
        startX = e.pageX - videoContainer.offsetLeft;
        scrollLeft = videoContainer.scrollLeft;
    });

    videoContainer.addEventListener("mouseleave", () => {
        isDown = false;
    });

    videoContainer.addEventListener("mouseup", () => {
        isDown = false;
    });

    videoContainer.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - videoContainer.offsetLeft;
        const walk = (x - startX) * 2; // Adjust speed
        videoContainer.scrollLeft = scrollLeft - walk;
    });

    // Enable scrolling with mouse wheel
    videoContainer.addEventListener("wheel", (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            videoContainer.scrollLeft += e.deltaY * 1.5; // Adjust speed
        }
    });

    // Auto-scroll effect
    let scrollAmount = 1;
    let isUserInteracting = false;
    let autoScrollInterval;

    function autoScroll() {
        if (!isUserInteracting) {
            videoContainer.scrollLeft += scrollAmount;
            if (videoContainer.scrollLeft + videoContainer.clientWidth >= videoContainer.scrollWidth) {
                videoContainer.scrollLeft = 0;
            }
        }
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    function resumeAutoScroll() {
        setTimeout(() => {
            isUserInteracting = false;
            startAutoScroll();
        }, 2000);
    }

    videoContainer.addEventListener("mousedown", () => {
        isUserInteracting = true;
        stopAutoScroll();
    });

    videoContainer.addEventListener("mouseup", resumeAutoScroll);
    videoContainer.addEventListener("wheel", () => {
        isUserInteracting = true;
        stopAutoScroll();
        resumeAutoScroll();
    });

    function startAutoScroll() {
        autoScrollInterval = setInterval(autoScroll, 20);
    }

    startAutoScroll();
});
