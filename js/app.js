/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
//  */

const navMenu = document.querySelector('#navbar__list');
const navSections = document.querySelectorAll('section');
const topScrollBtn = document.getElementById('topBtn');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// build the nav
function generateNavbar() {
    const fragment = document.createDocumentFragment();

    navSections.forEach((nSection) => {
        const liTag = document.createElement('li');
        const aTag = document.createElement('a');
        aTag.innerText = nSection.getAttribute('data-nav');
        aTag.setAttribute('class', 'menu__link');

        // Scroll to section on link click
        aTag.addEventListener("click", () => {
            nSection.scrollIntoView({behavior: "smooth"});
            });
        liTag.appendChild(aTag);
        fragment.appendChild(liTag);
    });
    navMenu.appendChild(fragment);
};

// Get index of sections
function sectionIndex() {
    let height = window.innerHeight;
    visibleSecIndex = -1;

    navSections.forEach((nSection, index) => {
        let offset = nSection.getBoundingClientRect();
        if(Math.abs(offset.top) < height){
            height = Math.abs(offset.top);
            visibleSecIndex = index;
        }
    });
    return visibleSecIndex;
}

// Set sections as active
function setActiveSection(){
    visibleSecIndex = sectionIndex();

    // If visibleSection exists
    if(visibleSecIndex != -1){
        // create a list of anchor tags from nav menu
        let aTagList = document.querySelectorAll('.menu__link');

        // Loop through all section
        for (let i = 0; i < navSections.length; i++) {

            // Add active class to the section and navbar
            if (i == visibleSecIndex) {
                navSections[i].classList.add('your-active-class');
                aTagList[i].classList.add('your-active-class');
            }
            // Remove active class from the section and navbar
            else {
                navSections[i].classList.remove('your-active-class');
                aTagList[i].classList.remove('your-active-class');
            }
        }; 
    };
}

// Build navigation menu
generateNavbar();

// Add an event listner to the DOM
document.addEventListener('scroll', setActiveSection);

// Scroll Top
window.onscroll = function scrollTopFun() {
    if (document.documentElement.scrollTop > 200) {
        topScrollBtn.style.display = 'block';
    } else {
        topScrollBtn.style.display = 'none';
    }
};

topScrollBtn.addEventListener('click', () => document.documentElement.scrollTop = 0);