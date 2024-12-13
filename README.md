# Projet Station API

## Description
Ce projet est une API pour gérer et manipuler les informations des stations-service. Il permet de charger des stations depuis un fichier, de rechercher des stations, de marquer des stations comme favorites et d'exposer ces fonctionnalités via des endpoints REST.

Les données sont extraites de https://data.opendatasoft.com/explore/dataset/prix-des-carburants-en-france-flux-instantane-v2%40opendatamef/table/ et enregistrées dans opendatamef.json. (dataset.json ne contient que quelques données de stations pour faciliter les tests)

## Fonctionnalités

- Charger des stations depuis un fichier JSON.
- Consulter la liste des stations disponibles.
- Mettre à jour l'état favori d'une station.

## Technologies Utilisées

- **Node.js** : Environnement d'exécution JavaScript côté serveur.
- **NestJS** : Framework backend utilisé pour structurer l'application.
- **TypeScript** : Langage de programmation pour un typage statique.
- **Axios** : Pour effectuer des requêtes HTTP.

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/manondevaux/App-Web-Fuel.git
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

## Scripts Disponibles

**Démarrer le serveur de développement** :
  ```bash
  npm run start:dev
  ```

## Structure du Projet

```
src/
├── opendatamef.json        # Données des stations (fichier local)
├── main.ts                 # Point d'entrée de l'application
├── station.module.ts       # Module de gestion des stations
├── station.controller.ts   # Contrôleur pour les endpoints REST
├── station.service.ts      # Service pour la logique métier
├── APIStation.ts           # Définition du type APIStation
├── Station.ts              # Définition du type Station
├── dataset.json            # Données des stations pour tests (plus petit fichier local)
```

## Endpoints de l'API

### 1. Obtenir toutes les stations
- **GET** `/stations`
- **Description** : Retourne la liste des stations triées par code postal.

### 5. Marquer une station comme favorite ou non
- **PUT** `/stations/:id`
- **Body** :
  ```json
  {
    "isFavorite": true
  }
  ```

### Exemple de Requête

**Requête :**
```bash
PUT /stations/1000002
Content-Type: application/json

{
  "isFavorite": true
}
```

**Réponse :**
```json
{
  "message": "Statut favori mis à jour avec succès",
  "data": {
    "id": 1000002,
    "latitude": "46.188",
    "longitude": "5.245",
    "cp": "01000",
    "adresse": "20 Avenue du Maréchal Juin",
    "ville": "Bourg-en-Bresse",
    "isFavorite": true
  }
}
```