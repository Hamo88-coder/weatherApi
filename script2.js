document.addEventListener("DOMContentLoaded", function () {

    var mobileNavigation = document.querySelector(".mobile-navigation");
    var mainNavigationMenu = document.querySelector(".main-navigation .menu");
    mobileNavigation.appendChild(mainNavigationMenu.cloneNode(true));

    var menuToggle = document.querySelector(".menu-toggle");
    menuToggle.addEventListener("click", function () {
        mobileNavigation.style.display = (mobileNavigation.style.display === "none") ? "block" : "none";
    });
});
