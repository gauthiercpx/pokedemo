# Pokédex - TP Angular

Étudiant : Gauthier  
Formation : M1 2025-26 - Web Engineering  
Date : 27 novembre 2025

## Description

Projet réalisé dans le cadre du TP Angular : mise en place d'un mini Pokédex avec recherche par identifiant ou nom, récupération des données via l'API publique [PokéAPI](https://pokeapi.co/), et affichage détaillé d'un Pokémon. Le code a été progressivement enrichi (filter pipe, service HTTP, Material, migration vers Angular 21).

Le but principal : comprendre les bases (data‑binding, composants, services, observables, pipes) et expérimenter une migration de version.

---

## Fonctionnalités principales (sujet de base)

### Step 1 : Initialisation du projet

Q1 : composant `SearchId` avec champ `<input>` pour l'ID recherché.  
Q2 : liaison bidirectionnelle avec `[(ngModel)]`.  
Q3 : second champ en lecture seule lié à la même valeur.  
Q3bis : mention de la protection XSS fournie par Angular (interpolation sécurisée).

### Step 2 : Recherche dans une liste

Q4 : création de la classe `Pokemon` (attributs étendus ensuite).  
Q5 : récupération de la liste réelle depuis l'API.  
Q6 : affichage dans un `<select>` avec `*ngFor`.  
Q7 : liaison du choix via `ngModel`.  
Q8 : pipe de filtrage textuel.  
Q9 : bouton d'action déclenchant la recherche.

### Step 3 : Accès à une API

Q10 : service `PokeAPI` injectant `HttpClient`.  
Q11 : méthode `getPokemonList()`.  
Q12 : utilisation du service dans le composant.  
Q13 : méthode `getPokemonInfo(id)`.  
Q14 : affichage des détails dans le composant de recherche (pas de second composant séparé dans cette version).

### Step 4 : Intégration de composants Material UI

Q9bis / Q17 : intégration d'Angular Material (champs, select, card, boutons) + thème personnalisé.

---

## Éléments supplémentaires

### 1. **Architecture et organisation du code**

- Extraction de l'ID réel depuis l'URL (regex) plutôt que l'indice.
- Syntaxe de contrôle moderne `@if/@else`.
- Abonnements convertis vers la forme observer (`{ next, error }`).
- Interfaces TypeScript pour structurer les réponses API.
- Usage ciblé de `ChangeDetectorRef`.
- Migration vers Angular 21.0.1 + adoption de `inject()`.

### 2. **Interface utilisateur avancée**

Layout en trois zones (formulaires / action / résultat) avec Flexbox, titre centré, messages d'état, bouton de fermeture, pipe `titlecase` pour lisibilité.

### 3. **Gestion des données**

Extraction de l'ID via regex `/\/pokemon\/(\d+)\/?$/`, gestion d'erreurs HTTP, capitalisation des noms, affichage détails (taille, poids, types, capacités, sprite).

### 4. **Préparation pour l'extensibilité**

Préparation pour éventuel composant `PokemonCard`, support du paramètre d'URL `/search/:id`, service centralisé.

### 5. **Bonnes pratiques Angular**

Module classique (`standalone: false`), séparation claire des rôles, typage strict, abonnements structurés, CSS modulaire, migration Angular 21 (`inject()`).

---

## Technologies utilisées

Framework : Angular 21.0.1 (migration depuis 20.3.3)  
Langage : TypeScript 5.7  
UI : Angular Material 21.0.1  
API : PokéAPI (<https://pokeapi.co/>)  
Outil de build : Angular CLI 21.0.1  
Styles : CSS + thème Material personnalisé

---

## Installation et démarrage

### Prérequis

```bash
# Installation de Node.js via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 22

# Installation d'Angular CLI
npm install -g @angular/cli
```

### Installation du projet

```bash
# Cloner le dépôt
git clone https://github.com/gauthiercpx/pokedemo.git
cd pokedemo

# Installer les dépendances
npm install

# Lancer le serveur de développement
ng serve
```

L'application est accessible sur `http://localhost:4200/`

---

---

## Structure du projet

```text
pokedemo/
├── src/
│   ├── app/
│   │   ├── search-id/           # Composant de recherche de Pokémon
│   │   │   ├── search-id.ts     # Logique du composant
│   │   │   ├── search-id.html   # Template HTML
│   │   │   ├── search-id.css    # Styles CSS
│   │   │   └── search-id.spec.ts
│   │   ├── pokemon.ts           # Classe et interfaces Pokemon
│   │   ├── poke-api.ts          # Service d'accès à PokéAPI
│   │   ├── filter-pokemon-pipe.ts # Pipe de filtrage
│   │   ├── app.ts               # Composant racine
│   │   ├── app-module.ts        # Module principal
│   │   └── app-routing-module.ts
│   ├── custom-theme.scss        # Thème Material personnalisé
│   └── styles.css               # Styles globaux
├── angular.json
├── package.json
└── tsconfig.json
```

---

## Résumé des fonctionnalités

1. **Recherche multicritère** : Par ID ou par nom via liste déroulante filtrée
2. **Filtrage en temps réel** : La liste se met à jour pendant la saisie
3. **Affichage détaillé** : Card Material avec toutes les informations du Pokémon
4. **Interface moderne** : Utilisation complète d'Angular Material Design
5. **Code maintenable** : Architecture modulaire et typage strict TypeScript

---

## Notes techniques

### Extraction de l'ID depuis l'URL de l'API

L'API PokéAPI retourne des URLs du type `https://pokeapi.co/api/v2/pokemon/25/`. Pour récupérer l'ID réel (25) au lieu d'utiliser `index+1`, j'ai implémenté une regex :

```typescript
const url: string = p.url || '';
const m = url.match(/\/pokemon\/(\d+)\/?$/);
const id = m ? Number(m[1]) : NaN;
```

### Migration vers la syntaxe moderne

- **Ancienne syntaxe** : `*ngIf="condition"`
- **Nouvelle syntaxe** : `@if (condition) { ... } @else { ... }`

Cette syntaxe est plus lisible et performante (Angular 17+).

### Gestion des observables

Migration de la syntaxe deprecated :

```typescript
// ❌ Deprecated
this.service.getData().subscribe(data => { ... });

// ✅ Nouvelle syntaxe
this.service.getData().subscribe({
  next: (data) => { ... },
  error: (error) => { ... }
});
```

---

## Auteur

**Gauthier COPPEAUX**  
M1 IL CLA1 - Web Engineering 2025-26

---

## Ressources

- [Sujet du TP](https://github.com/barais/teaching-jxs-angular/)

---
