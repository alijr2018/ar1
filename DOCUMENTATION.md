# Documentation Technique - Assurances Hefiri Zineb

## Table des matières
1. [Architecture du site](#architecture)
2. [Système i18n](#i18n)
3. [Ajouter du contenu](#contenu)
4. [Déploiement](#deploiement)
5. [SEO et accessibilité](#seo)

---

## 1. Architecture du site <a name="architecture"></a>

Le site utilise une approche **Single Page Application (SPA)** basée sur des sections HTML avec navigation par ancres. Cette approche permet :
- Un chargement rapide (une seule requête HTTP)
- Des changements de langue sans rechargement
- Un déploiement simple sur GitHub Pages (pas de serveur nécessaire)

### Technologies utilisées
- **HTML5** sémantique et accessible
- **CSS3** avec variables CSS et Grid/Flexbox
- **JavaScript vanilla** (pas de framework, pour la légèreté)
- **Font Awesome 6** pour les icônes
- **Google Fonts** (Inter + Tajawal)

### Architecture des fichiers

```
index.html          → Structure HTML complète
css/style.css       → Styles (mobile-first, responsive)
js/i18n.js          → Module d'internationalisation
js/app.js           → Interactions, navigation, formulaires
locales/fr.json     → Traductions françaises
locales/en.json     → Traductions anglaises
locales/ar.json     → Traductions arabes
data/agencies.json  → Données des agences
```

---

## 2. Système i18n <a name="i18n"></a>

### Comment ça marche

1. **Détection de la langue** (par ordre de priorité) :
   - Paramètre URL (`?lang=en`)
   - Stockage local (`localStorage`)
   - Langue du navigateur (`navigator.language`)
   - Langue par défaut : français

2. **Chargement des traductions** :
   - Fichier JSON chargé dynamiquement via `fetch()`
   - Fallback vers le français si une clé manque

3. **Application des traductions** :
   - Attribut `data-i18n="cle.de.traduction"` pour le contenu textuel
   - Attribut `data-i18n-attr="attribut:cle"` pour les attributs HTML
   - Mise à jour de `<html lang="..." dir="...">`

### Structure des fichiers de traduction

Chaque fichier JSON suit la même structure avec des clés imbriquées :
```json
{
  "lang": "fr",
  "dir": "ltr",
  "site": { "name": "...", "tagline": "..." },
  "nav": { "home": "...", "about": "..." },
  "hero": { "title": "...", "subtitle": "..." },
  ...
}
```

### Champs traduisibles dans les données

Les données dynamiques (agences) ont des champs multilingues :
```json
{
  "name": {
    "fr": "Agence Principale - Khouribga",
    "en": "Main Agency - Khouribga",
    "ar": "الوكالة الرئيسية - خريبكة"
  }
}
```

### RTL (Right-to-Left) pour l'arabe

- `html[dir="rtl"]` est automatiquement appliqué
- Les styles CSS utilisent des sélecteurs RTL : `html[dir="rtl"] .element`
- La police Tajawal est utilisée pour l'arabe
- Les dropdowns et positions sont inversés en RTL

---

## 3. Ajouter du contenu <a name="contenu"></a>

### Ajouter une agence
Voir le README.md pour les instructions détaillées.

### Modifier un texte existant
1. Ouvrir le fichier de traduction souhaité dans `locales/`
2. Modifier la valeur de la clé correspondante
3. Le texte est automatiquement mis à jour sur le site

### Ajouter une nouvelle section
1. Ajouter la section HTML dans `index.html` avec les attributs `data-i18n`
2. Ajouter les clés de traduction dans les 3 fichiers JSON
3. Ajouter le lien dans la navigation si nécessaire

### Modifier les couleurs
Les couleurs sont définies comme variables CSS dans `css/style.css` :
```css
:root {
  --primary: #0a2647;      /* Bleu marine */
  --secondary: #205295;    /* Bleu moyen */
  --accent: #c9a227;       /* Or */
  /* ... */
}
```

---

## 4. Déploiement <a name="deploiement"></a>

### GitHub Pages

Le site est déployé via GitHub Pages :

1. **Configuration dans GitHub** :
   - Settings → Pages
   - Source : Deploy from a branch
   - Branch : `main` / `/ (root)`

2. **URL du site** : `https://{username}.github.io/{repo}/`

### Hébergement standard

Le site peut aussi être hébergé sur n'importe quel serveur web statique :
- Upload de tous les fichiers à la racine du serveur web
- Pas de configuration serveur nécessaire
- Compatible avec tout hébergeur supportant les fichiers statiques

### Performance

- Pas de framework JS lourd
- Chargement lazy des images
- CSS optimisé (pas de librairie externe sauf Font Awesome)
- Police chargée avec `display=swap`
- Données JSON légères

---

## 5. SEO et accessibilité <a name="seo"></a>

### SEO

- **Meta tags** : title et description uniques par langue
- **Open Graph** : partage optimisé sur les réseaux sociaux
- **Schema.org** : données structurées `InsuranceAgency` + `LocalBusiness`
- **Hreflang** : balises pour indiquer les versions multilingues
- **Sémantique HTML5** : header, nav, section, footer

### Accessibilité

- **ARIA** : attributs `aria-label`, `aria-expanded`, `role`
- **Contraste** : couleurs conformes WCAG AA
- **Navigation clavier** : tous les éléments sont accessibles au clavier
- **Alt text** : images avec descriptions appropriées
- **Structure de titres** : hiérarchie H1 → H2 → H3 correcte
- **Formulaires** : labels associés aux champs

---

## 6. Informations manquantes

Les éléments suivants nécessitent des informations complémentaires de l'entreprise :

- [ ] Liens réseaux sociaux (Facebook, LinkedIn, Instagram)
- [ ] Agences supplémentaires (adresses, téléphones)
- [ ] Photos de l'équipe et des locaux
- [ ] Logo en haute résolution
- [ ] Horaires spécifiques par agence
- [ ] Types d'assurance spécifiques proposés
- [ ] Témoignages clients
- [ ] Partenaires et assureurs représentés

Ces informations sont indiquées par des commentaires `<!-- Information à compléter -->` dans le code.

---

## 7. Contact technique

Pour toute question technique sur ce site, contacter le développeur ou se référer à la documentation des technologies utilisées :
- HTML/CSS : [MDN Web Docs](https://developer.mozilla.org/)
- JavaScript : [MDN JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- Font Awesome : [fontawesome.com](https://fontawesome.com/)
- Google Fonts : [fonts.google.com](https://fonts.google.com/)
