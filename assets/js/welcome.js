document.addEventListener("DOMContentLoaded", function () {
    const alertBox = document.querySelector(".welcome-hero");
    const closeButton = document.querySelector(".welcome-hero .btn");
    const nav = document.querySelector("nav");
    const main = document.querySelector("main");

    // Vérifie si l'alerte doit être cachée
    if (localStorage.getItem("alert-dismissed") === "true") {
        alertBox.classList.add("d-none");
        nav.classList.remove("d-none");
        main.classList.remove("d-none");
    }

    // Vérifie que le bouton existe avant d'ajouter l'écouteur
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            localStorage.setItem("alert-dismissed", "true");
            alertBox.classList.add("d-none");
            nav.classList.remove("d-none");
            main.classList.remove("d-none");
        });
    }

    if (localStorage.getItem("cards-size") === "3") {
        document.querySelector(".applications-container .card").classList.add("scard-3")
    }

    if (!localStorage.getItem("application-type")) {
        localStorage.setItem("application-type", "default");
    }

    if (!localStorage.getItem("application-disposition")) {
        localStorage.setItem("application-disposition", "cards");
    }

    if (!localStorage.getItem("application-sort")) {
        localStorage.setItem("application-sort", "default");
    }

    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "default");
    }

    if (!localStorage.getItem("install-button")) {
        localStorage.setItem("install-button", "default");
    }

    if (!localStorage.getItem("cards-size")) {
        localStorage.setItem("card-sizes", "big");
    }
});