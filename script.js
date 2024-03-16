document.addEventListener("DOMContentLoaded", function() {
    const bubbles = document.querySelectorAll(".bubble");

    // Move bubbles randomly within the viewport
    function moveBubbles() {
        const bubbleSize = 200; // Size of each bubble
        const minDistance = 50; // Minimum distance between bubbles
        const maxX = window.innerWidth - bubbleSize;
        const maxY = window.innerHeight - bubbleSize;

        bubbles.forEach(function(bubble) {
            let x, y;
            do {
                x = Math.random() * maxX;
                y = Math.random() * maxY;
            } while (isOverlapping(x, y, minDistance));

            bubble.style.left = x + "px";
            bubble.style.top = y + "px";
        });
    }

    // Check if a bubble overlaps with others
    function isOverlapping(x, y, minDistance) {
        for (let i = 0; i < bubbles.length; i++) {
            const bubble = bubbles[i];
            const rect1 = { x: x, y: y, width: bubble.offsetWidth, height: bubble.offsetHeight };
            const rect2 = bubble.getBoundingClientRect();

            if (rect1.x < rect2.x + rect2.width + minDistance &&
                rect1.x + rect1.width > rect2.x - minDistance &&
                rect1.y < rect2.y + rect2.height + minDistance &&
                rect1.y + rect1.height > rect2.y - minDistance) {
                return true;
            }
        }
        return false;
    }

    // Move bubbles initially and then every 5 seconds
    moveBubbles();
    setInterval(moveBubbles, 5000);
});