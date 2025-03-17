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

// Toggle social media links
function toggleSocialMediaLinks() {
    const socialLinks = document.querySelector(".social-links");
    if (socialLinks) {
        socialLinks.classList.toggle("hidden");
    } else {
        console.error("Social links container not found.");
    }
}

// Attach click event to social media button
document.addEventListener("DOMContentLoaded", () => {
    const socialMediaButton = document.querySelector(".social-media-button");
    if (socialMediaButton) {
        socialMediaButton.addEventListener("click", toggleSocialMediaLinks);
    } else {
        console.error("Social media button not found.");
    }
});

// Adjust the video container height dynamically
function adjustScrollableHeight() {
    const headerHeight = document.querySelector("header")?.offsetHeight || 0;
    const footerHeight = document.querySelector("footer")?.offsetHeight || 0;
    videoContainer.style.height = `${window.innerHeight - headerHeight - footerHeight}px`;
}

window.addEventListener("load", adjustScrollableHeight);
window.addEventListener("resize", adjustScrollableHeight);

// Auto-scroll settings
let scrollAmount = 1; // Pixels per frame
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

function startAutoScroll() {
    autoScrollInterval = setInterval(autoScroll, 20);
}

startAutoScroll();

// Mouse drag scrolling
let isMouseDown = false;
let startX, scrollLeft;

videoContainer.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    videoContainer.classList.add("active");
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

// Mouse wheel horizontal scrolling
videoContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    videoContainer.scrollLeft += e.deltaY * 1.5;
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

// Icon button toggle for additional buttons
document.querySelector(".icon-button").addEventListener("click", function () {
    const hiddenButtons = document.querySelector(".hidden-buttons");
    hiddenButtons.style.display = hiddenButtons.style.display === "block" ? "none" : "block";
});

function toggleButtons() {
    const poppingButtons = document.querySelector(".popping-buttons");
    poppingButtons.classList.toggle("hidden");
    poppingButtons.classList.toggle("visible");
}

// Scroll event listener for highlighting active video
videoContainer.addEventListener("scroll", highlightActiveVideo);
