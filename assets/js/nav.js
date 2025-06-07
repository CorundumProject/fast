document.addEventListener('DOMContentLoaded', () => {
    // Définition des éléments de la nav
    const menuButton = document.querySelector("#menu-button");
    const installButton = document.querySelector("#install-button");
    const settingsButton = document.querySelector("#settings-button");

    // Fonction pour afficher l'accueil
    function showHome() {
        // Affichez la page d'accueil
        window.location.reload();
    }

    // Fonction pour afficher les paramètres
    function showSettings() {
        document.querySelector("#settings").classList.remove("d-none");
        document.querySelector("#applications-container").classList.add("d-none");
        document.querySelector("#application-detail").classList.add("d-none");
        document.querySelector("#search-input").disabled = true;
        document.querySelector("#welcome-alert").classList.add("d-none");
    }

    // Écouteurs d'événements pour les boutons de la nav
    menuButton.addEventListener("click", showHome);
    settingsButton.addEventListener("click", showSettings);
});