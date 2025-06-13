document.addEventListener('DOMContentLoaded', () => {
    // Définition des éléments de la nav
    const menuButton = document.querySelector("#menu-button");
    const downloadButton = document.querySelector("#install-button");
    const updateButton = document.querySelector("#update-button");
    const uninstallButton = document.querySelector("#uninstall-button");
    const settingsButton = document.querySelector("#settings-button");

    // Définition des containers
    const downloadContainer = document.querySelector("#download");
    const updateContainer = document.querySelector("#update");
    const uninstallContainer = document.querySelector("#uninstall");
    const welcomeContainer = document.querySelector("#welcome-alert");
    const settingsContainer = document.querySelector("#settings");

    // Définition des icônes
    const downloadIcon = "<i class=\"bi bi-arrow-down-circle\"></i>";
    const selectedDownloadIcon = "<i class=\"bi bi-arrow-down-circle-fill\"></i>";
    const updateIcon = "<i class=\"bi bi-arrow-repeat\"></i>";
    const selectedUpdateIcon = "<i class=\"bi bi-arrow-repeat-fill\"></i>";
    const uninstallIcon = "<i class=\"bi bi-trash\"></i>";
    const selectedUninstallIcon = "<i class=\"bi bi-trash-fill\"></i>";
    const settingsIcon = "<i class=\"bi bi-gear\"></i>";
    const selectedSettingsIcon = "<i class=\"bi bi-gear-fill\"></i>";

    // Fonction pour afficher l'accueil
    function showHome() {
        // Affichez la page d'accueil
        window.location.reload();
    }

    // Fonction pour afficher la page d'installation d'applications
    function showInstall() {
        welcomeContainer.classList.add("d-none");
        downloadContainer.classList.remove("d-none");
        updateContainer.classList.add("d-none");
        uninstallContainer.classList.add("d-none");
        settingsContainer.classList.add("d-none");
        downloadButton.innerHTML = selectedDownloadIcon;
        updateButton.innerHTML = updateIcon;
        uninstallButton.innerHTML = uninstallIcon;
        settingsButton.innerHTML = settingsIcon;
    }

    // Fonction pour afficher la page de mise à jour d'applications
    function showUpdate() {
        welcomeContainer.classList.add("d-none");
        downloadContainer.classList.add("d-none");
        updateContainer.classList.remove("d-none");
        uninstallContainer.classList.add("d-none");
        settingsContainer.classList.add("d-none");
        downloadButton.innerHTML = downloadIcon;
        updateButton.innerHTML = selectedUpdateIcon;
        uninstallButton.innerHTML = uninstallIcon;
        settingsButton.innerHTML = settingsIcon;
    }

    // Fonction pour afficher la page de désinstallation d'applications
    function showUninstall() {
        welcomeContainer.classList.add("d-none");
        downloadContainer.classList.add("d-none");
        updateContainer.classList.add("d-none");
        uninstallContainer.classList.remove("d-none");
        settingsContainer.classList.add("d-none");
        downloadButton.innerHTML = downloadIcon;
        updateButton.innerHTML = updateIcon;
        uninstallButton.innerHTML = selectedUninstallIcon;
        settingsButton.innerHTML = settingsIcon;
    }

    // Fonction pour afficher les paramètres
    function showSettings() {
        /*document.querySelector("#settings").classList.remove("d-none");
        document.querySelector("#applications-container").classList.add("d-none");
        document.querySelector("#application-detail").classList.add("d-none");
        document.querySelector("#search-input").disabled = true;
        document.querySelector("#welcome-alert").classList.add("d-none");*/
        welcomeContainer.classList.add("d-none");
        downloadContainer.classList.add("d-none");
        updateContainer.classList.add("d-none");
        uninstallContainer.classList.add("d-none");
        settingsContainer.classList.remove("d-none");
        downloadButton.innerHTML = downloadIcon;
        updateButton.innerHTML = updateIcon;
        uninstallButton.innerHTML = uninstallIcon;
        settingsButton.innerHTML = selectedSettingsIcon;
    }

    // Écouteurs d'événements pour les boutons de la nav
    menuButton.addEventListener("click", showHome);
    settingsButton.addEventListener("click", showSettings);
});