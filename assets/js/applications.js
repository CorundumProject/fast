// Sélection de l'élément où afficher les applications
const applicationsContainer = document.querySelector("#applications-container");
const selectedApplicationContainer = document.querySelector("#application-detail");
let selectedApplications = [];
const errorAlert = document.querySelector(".error");
const helpButton = document.querySelector(".help");
const outputCommand = document.querySelector(".command");
const status = document.querySelector(".status");
const searchInput = document.querySelector("#search-input");
let isDisplayed = false;
let total = 0;
let appNumberIndicator = document.querySelector("#apps-number");
let downloadButton = document.querySelector("#download-button");
let categories = [];
const categoriesContainer = document.querySelector("#categories-container");

// Sélectionner les applications à installer
function selectApp(card, appId) {
    const index = selectedApplications.indexOf(appId);

    if (index === -1) {
        // Ajouter l'application si elle n'est pas déjà sélectionnée
        selectedApplications.push(appId);
        card.classList.add("border-primary");
    } else {
        // Retirer l'application si elle est déjà sélectionnée 
        selectedApplications.splice(index, 1);
        card.classList.remove("border-primary");
    }
}

// Afficher les détails d'une application
function appDetails(appId) {
    fetch("https://corundum.fr/quick/assets/json/applications.json")
        .then(response => response.json())
        .then(data => {
            const app = data.find(app => app.id === appId);
            if (app) {
                selectedApplicationContainer.innerHTML = `
                    <div class="card d-flex flex-row justify-content-between align-items-center">
                        <img src="${app.icon}" alt="${app.name}" class="w-25 mb-3 text-center">
                        <div class="card-body d-flex flex-column align-items-center justify-content-start">
                            <h3 class="w-100 card-title text-left fs-2">${app.name}</h3>
                            <h4 class="w-100 card-subtitle text-left mb-2 text-muted fs-4">${app.category}</h4>
                            <p class="w-100 card-text text-left">${app.description}</p>
                            <div class="accordion w-100 mb-2">
                                <div class="accordion-item">
                                    <div class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#compatibility" aria-expanded="false" aria-controls="compatibility">Assistant compatibilité</button>
                                    </div>
                                    <div id="compatibility" class="accordion-collapse collapse" aria-expanded="false">
                                        <div class="accordion-body">
                                            <ul class="w-100 text-left">
                                                <li class="card-text">Vous devez être sur macOS ${app.version}</li>
                                                <li class="card-text">Vous devez avoir un processeur ${app.architecture}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-group w-100 mt-2" role="group" aria-label="Interaction avec l'application">
                                <a href="${app.website}" target="_blank" class="btn btn-primary">Site officiel</a>
                                <button id="back-button" class="btn btn-secondary">Revenir en arrière</button>
                            </div>
                        </div>
                    </div>
                `;
                applicationsContainer.classList.add("d-none");
                searchInput.disabled = true;
                document.querySelector("#back-button").addEventListener("click", hideDetails);
            }
        })
        .catch(error => console.error("Erreur :", error));
}

function hideDetails() {
    selectedApplicationContainer.innerHTML = ``;
    applicationsContainer.classList.remove("d-none");
    searchInput.disabled = false;
}

// Générer la ligne de commande brew qui va permettre d'installer les applications
function generateInstallCommand() {
    if (selectedApplications.length === 0) {
        // Afficher une erreur si aucune application n'est sélectionnée
        errorAlert.style.display = "block";
        errorAlert.style.animation = "displayError 5s ease-in-out";
        setTimeout(() => {
            errorAlert.style.display = "none";
        }, 5000);
        console.log("ok");
    }
}

// Fonction pour générer l'affichage d'une application selon le mode list ou cards
function renderApplication(app) {
    const disposition = localStorage.getItem("application-disposition") || "cards";

    if (disposition === "list") {
        // Code pour l'affichage en mode liste
        const col = document.createElement("div");
        col.classList.add("col-12", "w-100");

        // Conteneur principal pour une ligne
        const wrapperDiv = document.createElement("div");
        wrapperDiv.classList.add("list", "w-100", "d-flex", "align-items-center", "justify-content-between", "border", "rounded", "p-2");

        if (localStorage.getItem("application-type") === "default") {
            wrapperDiv.addEventListener("click", () => selectApp(wrapperDiv, app.id));
        } else if (localStorage.getItem("application-type") === "pre-release") {
            wrapperDiv.addEventListener("click", () => selectApp(wrapperDiv, app.beta));
        }

        // Conteneur pour l'image et le nom
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("d-flex", "align-items-center");

        // Image de l'application
        const appIcon = document.createElement("img");
        appIcon.src = app.icon;
        appIcon.alt = `Icône ${app.name}`;
        appIcon.classList.add("rounded", "me-2");
        appIcon.style.width = "64px";
        appIcon.style.height = "64px";

        const appName = document.createElement("span");
        appName.classList.add("fw-medium");
        appName.textContent = app.name;

        const infoButton = document.createElement("i");
        infoButton.classList.add("bi", "bi-info-circle", "fs-5", "text-secondary");
        infoButton.setAttribute("role", "button");
        infoButton.addEventListener("click", () => appDetails(app.id));

        infoDiv.appendChild(appIcon);
        infoDiv.appendChild(appName);
        wrapperDiv.appendChild(infoDiv);
        wrapperDiv.appendChild(infoButton);
        col.appendChild(wrapperDiv);

        return col;
    } else {
        // Code pour l'affichage en mode cartes 
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-md-4", "mb-3");

        // Gestion de la taille des cartes selon les préférences
        if (localStorage.getItem("cards-size") === "big") {
            colDiv.classList.add("w-50");
        } else if (localStorage.getItem("cards-size") === "small") {
            colDiv.classList.add("w-25");
        }

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "h-100", "border-3");

        // Gestion du mode d'installation (stable/beta)
        if (localStorage.getItem("application-type") === "default") {
            cardDiv.addEventListener("click", () => selectApp(cardDiv, app.id));
        } else if (localStorage.getItem("application-type") === "pre-release") {
            cardDiv.addEventListener("click", () => selectApp(cardDiv, app.beta));
        }

        if (selectedApplications.includes(app.id) || selectedApplications.includes(app.beta)) {
            cardDiv.classList.add("border-primary");
        }

        const imgContainer = document.createElement("div");
        imgContainer.classList.add("w-100", "d-flex", "justify-content-center", "align-items-center", "mt-4");

        const img = document.createElement("img");
        img.src = app.icon;
        img.classList.add("w-25");
        img.alt = app.name;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title", "text-center");
        cardTitle.textContent = app.name;

        const cardLink = document.createElement("button");
        cardLink.classList.add("btn", "btn-primary", "mt-2", "mb-2", "w-100");
        cardLink.textContent = "Détails";
        cardLink.addEventListener("click", (event) => {
            // Empêche le déclenchement de l'événement de sélection
            event.stopPropagation();
            if (app.id) {
                appDetails(app.id);
            } else if (app.beta) {
                appDetails(app.beta);
            }
        });

        imgContainer.appendChild(img);
        cardBody.appendChild(cardTitle);
        cardDiv.appendChild(imgContainer);
        cardDiv.appendChild(cardBody);
        cardBody.appendChild(cardLink);
        colDiv.appendChild(cardDiv);
        return colDiv;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Initialisation des éléments DOM
    const applicationsContainer = document.querySelector("#applications-container");
    const searchInput = document.querySelector("#search-input");
    const searchButton = document.querySelector("#search-button");

    // Afficher les catégories dans un slider horizontal
    function displayCategoriesPill() {
        fetch("https://corundum.fr/quick/assets/json/applications.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement du fichier JSON");
                }
                return response.json();
            })
            .then(data => {
                // Récupération et tri des catégories uniques
                for (let i = 0; i < data.length; i++) {
                    if (!categories.includes(data[i].category)) {
                        categories.push(data[i].category);
                    }
                }
                categories.sort();

                // Création du slider de catégories
                const sliderWrapper = document.createElement('div');
                sliderWrapper.id = 'categories-slider';
                sliderWrapper.classList.add('d-flex', 'flex-row', 'overflow-x-auto', 'gap-2', 'mb-2');
                sliderWrapper.style.overflowX = 'auto';
                sliderWrapper.style.scrollbarWidth = 'thin';
                sliderWrapper.style.msOverflowStyle = 'none';

                const innerContainer = document.createElement('div');
                innerContainer.classList.add('d-flex', 'align-items-center', 'gap-2', 'pb-2');
                innerContainer.style.whiteSpace = 'nowrap';

                categories.forEach(category => {
                    const button = document.createElement('button');
                    button.classList.add('btn', 'btn-outline-primary');
                    button.style.flexShrink = '0';
                    button.type = 'button';
                    button.textContent = category;

                    // Gestion du filtrage par catégorie
                    button.addEventListener('click', () => {
                        // Désactivation du filtre si déjà actif
                        if (button.classList.contains('active')) {
                            button.classList.remove('active', 'btn-primary');
                            button.classList.add('btn-outline-primary');
                            fetchAndDisplayApps();
                            return;
                        }

                        // Réinitialisation des boutons
                        innerContainer.querySelectorAll('button').forEach(btn => {
                            btn.classList.remove('active', 'btn-primary');
                            btn.classList.add('btn-outline-primary');
                        });

                        // Activation du filtre sélectionné
                        button.classList.add('active', 'btn-primary');
                        button.classList.remove('btn-outline-primary');

                        // Filtrage et affichage
                        const filteredApps = data.filter(app => app.category === category);
                        applicationsContainer.innerHTML = "";
                        const fragment = document.createDocumentFragment();

                        total = filteredApps.length;
                        appNumberIndicator.textContent = total;

                        filteredApps.forEach(app => {
                            const card = renderApplication(app);
                            fragment.appendChild(card);
                        });

                        applicationsContainer.appendChild(fragment);
                    });

                    innerContainer.appendChild(button);
                });

                sliderWrapper.appendChild(innerContainer);
                categoriesContainer.innerHTML = '';
                categoriesContainer.appendChild(sliderWrapper);
                categoriesContainer.classList.remove("d-none");
            });
    }

    // Récupérer et afficher les applications 
    function fetchAndDisplayApps(searchTerm = "") {
        fetch("https://corundum.fr/quick/assets/json/applications.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement du fichier JSON");
                }
                return response.json();
            })
            .then(data => {
                applicationsContainer.style.height = "auto";
                applicationsContainer.innerHTML = "";

                displayCategoriesPill();

                const fragment = document.createDocumentFragment();
                const lowerSearch = searchTerm.toLowerCase();

                // Création du bouton d'installation
                const installCard = document.createElement("div");
                installCard.classList.add("w-100", "border", "border-0", "text-end");

                const installButton = document.createElement("button");
                installButton.classList.add("btn", "btn-primary");
                installButton.textContent = "Installer";
                installButton.addEventListener("click", () => {
                    const command = "brew install --cask " + selectedApplications.join(" ");
                    outputCommand.textContent = command;
                    generateInstallCommand();
                });

                // Filtrage des applications selon la recherche
                let filteredData = data.filter(app =>
                    app.name.toLowerCase().includes(lowerSearch) ||
                    app.category.toLowerCase().includes(lowerSearch) ||
                    app.developer.toLowerCase().includes(lowerSearch)
                );

                // Tri des applications selon les préférences
                const sort = localStorage.getItem("application-sort");
                if (sort === "a-z") {
                    filteredData.sort((a, b) => a.name.localeCompare(b.name));
                } else if (sort === "z-a") {
                    filteredData.sort((a, b) => b.name.localeCompare(a.name));
                } else if (sort === "category") {
                    filteredData.sort((a, b) => a.category.localeCompare(b.category));
                } else if (sort === "developer") {
                    filteredData.sort((a, b) => a.developer.localeCompare(b.developer));
                }

                // Position du bouton d'installation selon les préférences
                if (localStorage.getItem("install-button") === "top") {
                    applicationsContainer.appendChild(installCard);
                    installCard.appendChild(installButton);
                }

                // Affichage des applications filtrées
                filteredData.forEach(app => {
                    total++;
                    appNumberIndicator.textContent = total;
                    const card = renderApplication(app);
                    fragment.appendChild(card);
                });

                applicationsContainer.appendChild(fragment);

                if (localStorage.getItem("install-button") === "bottom") {
                    applicationsContainer.appendChild(installCard);
                    installCard.appendChild(installButton);
                }
            })
            .catch(error => {
                // Gestion des erreurs de chargement
                applicationsContainer.style.height = "auto";
                applicationsContainer.innerHTML = "";
                selectedApplicationContainer.innerHTML = `<p class="alert alert-danger">Impossible de charger les applications. Veuillez réessayer plus tard. Si le problème persiste, veuillez ouvrir une issue sur <a href="https://github.com/corundumproject/quick/issues/" target="_blank" class="alert-link">GitHub</a>.</p>`;
                console.error("Erreur :", error);
                searchInput.disabled = true;
            });
    }

    // Événements de recherche
    searchButton.addEventListener("click", () => {
        fetchAndDisplayApps(searchInput.value);
    });

    searchInput.addEventListener("input", () => {
        fetchAndDisplayApps(searchInput.value);
    });

    fetchAndDisplayApps();
});

// Gestion des raccourcis clavier
function handleKeyPress(event) {
    if (searchInput === document.activeElement) return;
    if (event.key === "i" || event.key === "I") {
        const command = "brew install --cask " + selectedApplications.join(" ");
        outputCommand.textContent = command;
        generateInstallCommand();
    }
}

document.addEventListener("keydown", handleKeyPress);

// Gestion des boutons d'installation
const installButton = document.querySelector("#install-button");
installButton.addEventListener("click", generateInstallCommand);
downloadButton.addEventListener("click", generateInstallCommand);