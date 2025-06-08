// Importation des modules nécessaires d'Electron
const { app, BrowserWindow, shell } = require('electron')

// Fonction pour créer la fenêtre principale de l'application
const createWindow = () => {
    // Création d'une nouvelle instance de BrowserWindow avec des paramètres spécifiques
    const win = new BrowserWindow({
        width: 1200,      // Largeur de la fenêtre en pixels
        height: 800,      // Hauteur de la fenêtre en pixels
        title: 'Corundum Fast',  // Titre de la fenêtre
        webPreferences: {
            contextIsolation: true,  // Isole le contexte pour la sécurité
            nodeIntegration: false   // Désactive l'intégration Node.js pour la sécurité
        }
    })

    // Gestion des liens externes (target="_blank")
    win.webContents.setWindowOpenHandler(({ url }) => {
        // Utilise le module shell pour ouvrir l'URL dans le navigateur par défaut du système
        shell.openExternal(url)
        // Empêche Electron de créer une nouvelle fenêtre
        return { action: 'deny' }
    })

    // Charge le fichier HTML principal de l'application
    win.loadFile('index.html')
}

// Attend que l'application soit prête avant de créer la fenêtre
app.whenReady().then(() => {
    createWindow()  // Crée la fenêtre principale
})