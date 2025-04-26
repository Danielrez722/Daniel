// document.addEventListener('DOMContentLoaded', function() {
let drone = document.getElementById('drone');
let trackingStatus = document.getElementById('tracking-status');
let launchResult = document.getElementById('launch-result');
let container = document.getElementById('container');
let orderInput = document.getElementById("order-input");

const earth = document.getElementById("earth");
const moon = document.getElementById("moon");
const mars = document.getElementById("mars");
const iss = document.getElementById("iss");

const moonButton = document.getElementById("moonButton");
const issButton = document.getElementById("issButton");
const marsButton = document.getElementById("marsButton");

moon.style.display = "none";
mars.style.display = "none";
iss.style.display = "none";

let angle = 0;
let speed = 5;
let x = 100;
let y = 100;
let hasPackage = false;

let star1 = document.getElementById("star1");
let star2 = document.getElementById("star2");
let star3 = document.getElementById("star3");
let star4 = document.getElementById("star4");
let star5 = document.getElementById("star5");
let star6 = document.getElementById("star6");
let star7 = document.getElementById("star7");
let star8 = document.getElementById("star8");
let star9 = document.getElementById("star9");
let star10 = document.getElementById("star10");
let star11 = document.getElementById("star11");
let star12 = document.getElementById("star12");
let star13 = document.getElementById("star13");
let star14 = document.getElementById("star14");
let star15 = document.getElementById("star15");
let star16 = document.getElementById("star16");
let star17 = document.getElementById("star17");
let star18 = document.getElementById("star18");
let star19 = document.getElementById("star19");
let star20 = document.getElementById("star20");
let star21 = document.getElementById("star21");
let star22 = document.getElementById("star22");
let star23 = document.getElementById("star23");
let star24 = document.getElementById("star24");
let star25 = document.getElementById("star25");
let star26 = document.getElementById("star26");
let star27 = document.getElementById("star27");
let star28 = document.getElementById("star28");
let star29 = document.getElementById("star29");
let star30 = document.getElementById("star30");



spawnStars();

function orderDelivery(destination) {
  const orderValue = orderInput.value.trim(); // Get the order text from the input field when the button is clicked

  if (orderValue === "") {
    trackingStatus.innerText = "Please enter an order before selecting a destination."; // Inform the user if no order is entered
  } else {
    trackingStatus.innerText = `Preparing delivery of ${orderValue} to ${destination}... 🚀`; // Display the order in the tracking status
  }

  // Check if the destination is ISS, Moon, or Mars to trigger corresponding spawn function
  if (destination == "ISS") {
    spawnIss();
  } else if (destination == "Moon") {
    spawnMoon();
  } else if (destination == "Mars") {
    spawnMars();
  }
}

function statusUpdate() {
  const orderValue = orderInput.value.trim();
  trackingStatus.textContent = "Your package of " + orderValue + " arrived.";
}

// Function to move the drone
function movement() {
  let rad = angle * (Math.PI / 180); // Convert angle to radians

  // Calculate the new position based on speed and current angle
  let newX = x + speed * Math.cos(rad);
  let newY = y + speed * Math.sin(rad);

  // Get container dimensions
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  // Get drone dimensions (width and height)
  const droneWidth = drone.offsetWidth;
  const droneHeight = drone.offsetHeight;

  // Prevent the drone from going outside the container
  const maxX = containerWidth - droneWidth;
  const maxY = containerHeight - droneHeight;

  // Update the drone position if within bounds
  if (newX >= 0 && newX <= maxX) {
    x = newX;
  }
  if (newY >= 0 && newY <= maxY) {
    y = newY;
  }

  // Apply the position and rotation to the drone
  drone.style.left = `${x}px`;
  drone.style.top = `${y}px`;
  drone.style.transform = `rotate(${angle}deg)`;
}

// Key event listener for rotation and movement
document.addEventListener('keydown', function(event) {
  // Rotation: Rotate left with "A" and rotate right with "D"
  if (event.key === 'a') {
    angle -= 5; // Rotate left instantly
    movement();
  }
  if (event.key === 'd') {
    angle += 5;
    movement();
    // Rotate right instantly
  }
  // Move forward: "W" key
  if (event.key === 'w') {
    movement(); // Move forward in the current direction
  }
  // Move backward: "S" key
  if (event.key === 's') {
    speed = -5; // Set speed to negative for backward movement
    movement(); // Move backward
    speed = 5; // Reset speed after moving backward
  }
  if (event.key === 'f') {
    if (checkCollision(drone, earth)) {
      hasPackage = true;
      console.log(hasPackage);
    }
    if (checkCollision(drone, moon) && hasPackage) {
      hasPackage = false;
      console.log(hasPackage);
      statusUpdate();
    }
    if (checkCollision(drone, mars) && hasPackage) {
      hasPackage = false;
      console.log(hasPackage);
      statusUpdate();
    }
    if (checkCollision(drone, iss) && hasPackage) {
      hasPackage = false;
      console.log(hasPackage);
      statusUpdate();
    }
  }
});

function spawnStars() {
  for (let i = 1; i <= 30; i++) {
    let star = window[`star${i}`]; // Dynamically get star1, star2, ..., star30
    if (star) {
      spawnPics(star);
    }
  }
}

function spawnPics(pic) {
  // Ensure the pic has loaded or has dimensions
  const picWidth = pic.offsetWidth;
  const picHeight = pic.offsetHeight;

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  // Prevent spawning off edges
  const maxX = containerWidth - picWidth;
  const maxY = containerHeight - picHeight;

  const xVal = Math.floor(Math.random() * maxX);
  const yVal = Math.floor(Math.random() * maxY);

  pic.style.position = "absolute";
  pic.style.left = xVal + "px";
  pic.style.top = yVal + "px";
}

function spawnIss() {
  console.log("hi");
  iss.style.display = "block";

  // Set initial position of the ISS
  iss.style.position = "absolute";
  iss.style.top = "20px";  // You can adjust this to move vertically

  // Use transform to move the ISS to the right
  const containerWidth = container.offsetWidth;
  const issWidth = iss.offsetWidth;

  // Move the ISS to the right edge with a margin of 20px
  const rightPosition = containerWidth - issWidth - 20; // 20px margin
  iss.style.transform = `translateX(${rightPosition}px)`;

  mars.style.display = "none";
  moon.style.display = "none";
}

function spawnMoon() {
  console.log("Spawning Moon");

  moon.style.display = "block";

  // Set initial position of the Moon
  moon.style.position = "absolute";
  moon.style.top = "20px";  // Adjust this as needed to move vertically

  // Use transform to move the Moon to the right
  const containerWidth = container.offsetWidth;
  const moonWidth = moon.offsetWidth;

  // Move the Moon to the right edge with a margin of 20px
  const rightPosition = containerWidth - moonWidth - 20; // 20px margin
  moon.style.transform = `translateX(${rightPosition}px)`;
  
  mars.style.display = "none";
  iss.style.display = "none";
}

function spawnMars() {
  console.log("Spawning Mars");

  mars.style.display = "block";

  // Set initial position of Mars
  mars.style.position = "absolute";
  mars.style.top = "20px";  // Adjust this as needed to move vertically

  // Use transform to move Mars to the right
  const containerWidth = container.offsetWidth;
  const marsWidth = mars.offsetWidth;

  // Move Mars to the right edge with a margin of 20px
  const rightPosition = containerWidth - marsWidth - 20; // 20px margin
  mars.style.transform = `translateX(${rightPosition}px)`;

  iss.style.display = "none";
  moon.style.display = "none";
}

function checkCollision(drone, object) {
    const droneRect = drone.getBoundingClientRect();
    const objectRect = object.getBoundingClientRect();

    return !(
      droneRect.right < objectRect.left ||
      droneRect.left > objectRect.right ||
      droneRect.bottom < objectRect.top ||
      droneRect.top > objectRect.bottom
    );
  }

moonButton.addEventListener('click', spawnMoon);
issButton.addEventListener('click', spawnIss);
marsButton.addEventListener('click', spawnMars);
// });
