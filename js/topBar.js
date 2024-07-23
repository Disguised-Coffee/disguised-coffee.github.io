// Define a threshold for large mouse movements
const THRESHOLD = 7;
  
// Define element to change.

//https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event

//https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollend_event

const topBarList = document.querySelector(".topBarList");

const topBar = document.querySelector(".topBar");

const image = document.querySelector("body > nav > div > a > img") // Yes, this is a thing.
// eventlistener for when user begins to scroll down into content

const topContainer = document.querySelector(".container")

document.addEventListener("scroll", (event) => {
  // console.log("user is scrolling!!!")

  setTopBar();
  // For throtling purposes (so the event doesn't fire everysingle ms)
  setTimeout(() => {
    
  }, 1000);
  if (window.scrollY === 0) {
    // Do something when the user is at the top of the page
    resetTopBar();
  }
});

// resetTopBar();
// mousemove eventlistener so topBarList changes back
document.addEventListener("mousemove", (event) => {
  // Get the movementX and movementY values
  const deltaX = event.movementX;
  const deltaY = event.movementY;

  // Check if the movement is larger than the threshold
  if (Math.abs(deltaX) > THRESHOLD || Math.abs(deltaY) > THRESHOLD) {
    // console.log("User is awake!"); //debug
    resetTopBar();
  }
  
});

//make sure topBar does show when user touches it
topBar.addEventListener("mouseover", (event) => {
  // console.log("afjoisads"); //debug
  resetTopBar();
});

function setTopBar(){
  //use <var>.classList.add and <var>.classList.remove to replace current class rule with other rules (Insanely helpful)
  image.classList.add("show");
  image.classList.remove("hide");

  // console.log(image);
  topBar.classList.remove("resetLogo");
  topBarList.classList.add("hide");
  topBarList.classList.remove("show");
  topBar.classList.add("centerLogo");
}

function resetTopBar(){
  image.classList.add("hide");
  image.classList.remove("show");

  topBar.classList.remove("centerLogo");
  topBar.classList.add("resetLogo");
  topBarList.classList.add("show");
  topBarList.classList.remove("hide");
}
