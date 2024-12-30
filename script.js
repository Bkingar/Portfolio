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
const videoContainer = document.querySelector('.video-container');
const videoCards = document.querySelectorAll('.video-card');

function highlightActiveVideo() {
    let containerCenter = videoContainer.getBoundingClientRect().width / 2;

    videoCards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        // Add 'active' class to the closest video
        if (distance < cardRect.width / 2) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

// Function to toggle social media links
function toggleSocialMediaLinks() {
    const socialLinks = document.querySelector('.social-links');

    if (socialLinks) {
        // Toggle visibility classes
        if (socialLinks.classList.contains('hidden')) {
            socialLinks.classList.remove('hidden');
        } else {
            socialLinks.classList.add('hidden');
        }
    } else {
        console.error('Social links container not found.');
    }
}

// Attach the click event to the social media button
document.addEventListener('DOMContentLoaded', () => {
    const socialMediaButton = document.querySelector('.social-media-button');

    if (socialMediaButton) {
        socialMediaButton.addEventListener('click', toggleSocialMediaLinks);
    } else {
        console.error('Social media button not found.');
    }
});




function adjustScrollableHeight() {
    const videoContainer = document.querySelector(".video-container");
    const headerHeight = document.querySelector("header")?.offsetHeight || 0; // Adjust based on your layout
    const footerHeight = document.querySelector("footer")?.offsetHeight || 0;

    // Set height dynamically
    videoContainer.style.height = `${window.innerHeight - headerHeight - footerHeight}px`;
}

// Adjust on page load and window resize
window.addEventListener("load", adjustScrollableHeight);
window.addEventListener("resize", adjustScrollableHeight);



// Listen to the scroll event
videoContainer.addEventListener('scroll', highlightActiveVideo);




window.addEventListener("load", function () {
    const videoContainer = document.querySelector(".video-container");
    const firstVideoCard = document.querySelector(".video-card");

    if (videoContainer && firstVideoCard) {
        // Reset the scroll position to the first video when the page loads
        videoContainer.scrollLeft = 0;
    }

    if (videoContainer && firstVideoCard) {
        // Wait for layout to complete
        setTimeout(() => {
            const containerWidth = videoContainer.offsetWidth;
            const firstVideoWidth = firstVideoCard.offsetWidth;
            
            // Scroll to the position where the first video is centered
            const centerPosition = firstVideoCard.offsetLeft - (containerWidth / 2) + (firstVideoWidth / 2);
            
            // Set the scroll position to center the first video
            videoContainer.scrollLeft = centerPosition;
        }, 100); // Delay to ensure that the layout is fully loaded
    }

    


    let scrollAmount = 1; // Pixels per frame
    let isUserInteracting = false; // Track user interaction
    let autoScrollInterval;
    
    // Function to auto-scroll
    function autoScroll() {
        if (!isUserInteracting) {
            videoContainer.scrollLeft += scrollAmount;
    
            // Loop back to the start when reaching the end
            if (videoContainer.scrollLeft + videoContainer.clientWidth >= videoContainer.scrollWidth) {
                videoContainer.scrollLeft = 0;
            }
        }
    }
    
    // Pause auto-scrolling on user interaction
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Resume auto-scroll after a delay
    function resumeAutoScroll() {
        setTimeout(() => {
            isUserInteracting = false;
            startAutoScroll();
        }, 2000);
    }
    
    // Event listeners for user interaction
    videoContainer.addEventListener("mousedown", () => {
        isUserInteracting = true;
        stopAutoScroll();
    });
    videoContainer.addEventListener("mouseup", resumeAutoScroll);
    videoContainer.addEventListener("touchstart", () => {
        isUserInteracting = true;
        stopAutoScroll();
    });
    videoContainer.addEventListener("touchend", resumeAutoScroll);
    videoContainer.addEventListener("wheel", () => {
        isUserInteracting = true;
        stopAutoScroll();
        resumeAutoScroll();
    });
    
    // Start auto-scroll
    function startAutoScroll() {
        autoScrollInterval = setInterval(autoScroll, 20); // Adjust interval for smoothness
    }
    
    // Start auto-scrolling
    startAutoScroll();
    

});

// Add event listener to the icon button
document.querySelector('.icon-button').addEventListener('click', function() {
    // Toggle the 'active' class to show/hide the buttons
    const hiddenButtons = document.querySelector('.hidden-buttons');
    if (hiddenButtons.style.display === 'none' || hiddenButtons.style.display === '') {
        hiddenButtons.style.display = 'block'; // Show the buttons
    } else {
        hiddenButtons.style.display = 'none'; // Hide the buttons
    }
});

function toggleButtons() {
    const poppingButtons = document.querySelector(".popping-buttons");

    // Toggle visibility
    if (poppingButtons.classList.contains("hidden")) {
        poppingButtons.classList.remove("hidden");
        poppingButtons.classList.add("visible");
    } else {
        poppingButtons.classList.add("hidden");
        poppingButtons.classList.remove("visible");
    }
}












