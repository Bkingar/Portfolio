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



// Highlight the active video card
const videoContainer = document.querySelector(".video-container");
const videoCards = document.querySelectorAll(".video-card");

function highlightActiveVideo() {
    let containerCenter = videoContainer.getBoundingClientRect().width / 2;

    videoCards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < cardRect.width / 2) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
}

// Adjust the video container height dynamically
function adjustScrollableHeight() {
    const headerHeight = document.querySelector("header")?.offsetHeight || 0;
    const footerHeight = document.querySelector("footer")?.offsetHeight || 0;
    videoContainer.style.height = `${window.innerHeight - headerHeight - footerHeight}px`;
}

window.addEventListener("load", adjustScrollableHeight);
window.addEventListener("resize", adjustScrollableHeight);

// Smooth Mouse Scroll
let scrollSpeed = 0;
let isScrolling = false;

videoContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    scrollSpeed += e.deltaY * 0.2; // Adjusting speed multiplier
    if (!isScrolling) smoothScroll();
});

function smoothScroll() {
    isScrolling = true;
    scrollSpeed *= 0.9; // Friction effect
    videoContainer.scrollLeft += scrollSpeed;

    if (Math.abs(scrollSpeed) > 0.5) {
        requestAnimationFrame(smoothScroll);
    } else {
        isScrolling = false;
    }
}

// Auto-scroll settings
let autoScrollInterval;
let isUserInteracting = false;

function autoScroll() {
    if (!isUserInteracting) {
        videoContainer.scrollLeft += 1;

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

function startAutoScroll() {
    autoScrollInterval = setInterval(autoScroll, 20);
}

startAutoScroll();

// Mouse drag scrolling
let isMouseDown = false;
let startX, scrollLeft;

videoContainer.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    startX = e.pageX - videoContainer.offsetLeft;
    scrollLeft = videoContainer.scrollLeft;
});

videoContainer.addEventListener("mouseleave", () => {
    isMouseDown = false;
});

videoContainer.addEventListener("mouseup", () => {
    isMouseDown = false;
});

videoContainer.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - videoContainer.offsetLeft;
    const walk = (x - startX) * 2;
    videoContainer.scrollLeft = scrollLeft - walk;
});

// Touch swipe scrolling (for mobile)
let touchStartX = 0;
let touchScrollLeft = 0;

videoContainer.addEventListener("touchstart", (e) => {
    isUserInteracting = true;
    stopAutoScroll();
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = videoContainer.scrollLeft;
});

videoContainer.addEventListener("touchmove", (e) => {
    const touchMoveX = e.touches[0].pageX;
    const moveDistance = touchMoveX - touchStartX;
    videoContainer.scrollLeft = touchScrollLeft - moveDistance;
});

videoContainer.addEventListener("touchend", resumeAutoScroll);

// Scroll event listener for highlighting active video
videoContainer.addEventListener("scroll", highlightActiveVideo);

function toggleButtons() {
    alert("Toggle clicked");
    const buttonsContainer = document.querySelector(".popping-buttons");
    buttonsContainer.classList.toggle("hidden");
}



// function toggleButtons() {
  //  const buttonsContainer = document.querySelector(".popping-buttons");
   // if (buttonsContainer) {
    //    buttonsContainer.classList.toggle("hidden");
   // } else {
   //     console.error("Couldn't find .popping-buttons element");
  //  }
//} //
