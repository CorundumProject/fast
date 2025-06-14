document.addEventListener('DOMContentLoaded', () => {
    // Définition des éléments de la nav
    const menuButton = document.querySelector("#menu-button");
    const downloadButton = document.querySelector("#download-button");
    const updateButton = document.querySelector("#update-button");
    const uninstallButton = document.querySelector("#uninstall-button");
    const settingsButton = document.querySelector("#settings-button");
    const searchInput = document.querySelector("#search-input");

    // Définition des containers
    const downloadContainer = document.querySelector("#download");
    const updateContainer = document.querySelector("#update");
    const uninstallContainer = document.querySelector("#uninstall");
    const settingsContainer = document.querySelector("#settings");

    // Définition des icônes
    const downloadIcon = "<i class=\"bi bi-arrow-down-circle\"></i>";
    const selectedDownloadIcon = "<i class=\"bi bi-arrow-down-circle-fill\"></i>";
    const updateIcon = "<i class=\"bi bi-arrow-up-circle\"></i>";
    const selectedUpdateIcon = "<i class=\"bi bi-arrow-up-circle-fill\"></i>";
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
        downloadContainer.classList.remove("d-none");
        updateContainer.classList.add("d-none");
        uninstallContainer.classList.add("d-none");
        settingsContainer.classList.add("d-none");
        downloadButton.innerHTML = selectedDownloadIcon;
        updateButton.innerHTML = updateIcon;
        uninstallButton.innerHTML = uninstallIcon;
        settingsButton.innerHTML = settingsIcon;
        searchInput.disabled = false;
    }

    // Fonction pour afficher la page de mise à jour d'applications
    function showUpdate() {
        downloadContainer.classList.add("d-none");
        updateContainer.classList.remove("d-none");
        uninstallContainer.classList.add("d-none");
        settingsContainer.classList.add("d-none");
        downloadButton.innerHTML = downloadIcon;
        updateButton.innerHTML = selectedUpdateIcon;
        uninstallButton.innerHTML = uninstallIcon;
        settingsButton.innerHTML = settingsIcon;
        searchInput.disabled = true;
    }

    // Fonction pour afficher la page de désinstallation d'applications
    function showUninstall() {
        downloadContainer.classList.add("d-none");
        updateContainer.classList.add("d-none");
        uninstallContainer.classList.remove("d-none");
        settingsContainer.classList.add("d-none");
        downloadButton.innerHTML = downloadIcon;
        updateButton.innerHTML = updateIcon;
        uninstallButton.innerHTML = selectedUninstallIcon;
        settingsButton.innerHTML = settingsIcon;
        searchInput.disabled = true;
    }

    // Fonction pour afficher les paramètres
    function showSettings() {
        downloadContainer.classList.add("d-none");
        updateContainer.classList.add("d-none");
        uninstallContainer.classList.add("d-none");
        settingsContainer.classList.remove("d-none");
        downloadButton.innerHTML = downloadIcon;
        updateButton.innerHTML = updateIcon;
        uninstallButton.innerHTML = uninstallIcon;
        settingsButton.innerHTML = selectedSettingsIcon;
        searchInput.disabled = true;
    }

    // Écouteurs d'événements pour les boutons de la nav
    menuButton.addEventListener("click", showHome);
    downloadButton.addEventListener("click", showInstall);
    updateButton.addEventListener("click", showUpdate);
    uninstallButton.addEventListener("click", showUninstall);
    settingsButton.addEventListener("click", showSettings);

    // Écouteurs d'événements pour les boutons spéciaux sur la page
    document.querySelector("#install-page-button").addEventListener("click", showInstall);
});