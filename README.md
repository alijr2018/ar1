# Assurances Hefiri Zineb S.A.R.L. - Site Web Multilingue

Site web professionnel multilingue pour **Assurances Hefiri Zineb S.A.R.L.**, courtier d'assurances basé à Khouribga, Maroc.

## 🌐 Langues supportées
- **Français** (par défaut)
- **Anglais** (English)
- **Arabe** (العربية) - avec support RTL

## 🚀 Déploiement sur GitHub Pages

Le site est configuré pour être déployé automatiquement via GitHub Pages.

### Configuration
1. Aller dans **Settings** → **Pages** du dépôt GitHub
2. Sous **Source**, sélectionner la branche `main` et le dossier `/ (root)`
3. Cliquer sur **Save**
4. Le site sera disponible à : `https://{username}.github.io/{repository}/`

## 📁 Structure du projet

```
/
├── index.html              # Page principale (SPA avec toutes les sections)
├── css/
│   └── style.css           # Feuille de style principale
├── js/
│   ├── app.js              # JavaScript principal (navigation, interactions)
│   └── i18n.js             # Module d'internationalisation
├── data/
│   ├── agencies.json       # Données des agences (structurées)
│   └── recherche.md        # Document de recherche compilé
├── locales/
│   ├── fr.json             # Traductions françaises
│   ├── en.json             # Traductions anglaises
│   └── ar.json             # Traductions arabes
├── images/                 # Dossier pour les images
├── DOCUMENTATION.md        # Documentation détaillée
└── README.md               # Ce fichier
```

## 🔧 Personnalisation

### Modifier les coordonnées
1. Ouvrir `data/agencies.json`
2. Modifier les champs `address`, `phones`, `email`, `hours`, etc.
3. Les traductions sont dans `locales/{lang}.json`

### Ajouter une agence
1. Ouvrir `data/agencies.json`
2. Ajouter un nouvel objet dans le tableau `agencies` avec le format suivant :
```json
{
  "id": "nouvelle-agence",
  "name": {
    "fr": "Agence - Ville",
    "en": "Agency - City",
    "ar": "الوكالة - المدينة"
  },
  "address": "Adresse complète",
  "city": { "fr": "Ville", "en": "City", "ar": "المدينة" },
  "postalCode": "00000",
  "region": { "fr": "Région", "en": "Region", "ar": "الجهة" },
  "country": "Maroc",
  "phones": ["+212 X XX XX XX XX"],
  "fax": "+212 X XX XX XX XX",
  "email": "email@exemple.ma",
  "gps": { "lat": 0.0, "lng": 0.0 },
  "mapsUrl": "https://www.google.com/maps?q=lat,lng",
  "hours": {
    "fr": "Lun - Ven : 8h30 - 18h00",
    "en": "Mon - Fri: 8:30 AM - 6:00 PM",
    "ar": "الاثنين - الجمعة: 8:30 - 18:00"
  },
  "isMain": false,
  "whatsapp": "+212XXXXXXXXX"
}
```

### Ajouter une nouvelle langue
1. Créer un nouveau fichier `locales/{code}.json` en copiant `locales/fr.json`
2. Traduire toutes les clés
3. Ajouter le code langue dans `js/i18n.js` :
   ```javascript
   const SUPPORTED_LANGUAGES = ['fr', 'en', 'ar', 'nouveau_code'];
   ```
4. Ajouter un bouton dans le sélecteur de langue dans `index.html`
5. Ajouter une balise `hreflang` dans le `<head>` de `index.html`

## 📱 Fonctionnalités

- ✅ Design responsive (mobile-first)
- ✅ Navigation sticky avec menu mobile
- ✅ Détection automatique de la langue du navigateur
- ✅ Support RTL complet pour l'arabe
- ✅ Sélecteur de langue visible
- ✅ Données structurées Schema.org (InsuranceAgency, LocalBusiness)
- ✅ Balises hreflang pour le SEO multilingue
- ✅ Google Maps intégré pour chaque agence
- ✅ Bouton WhatsApp flottant
- ✅ Liens click-to-call (tel:)
- ✅ Formulaire de demande de devis
- ✅ Formulaire de contact
- ✅ FAQ avec accordéon
- ✅ Mentions légales conformes (loi 09-08)
- ✅ Animations au scroll
- ✅ Compatible tous navigateurs modernes

## 📊 Informations de l'entreprise (vérifiées)

| Information | Valeur |
|---|---|
| Raison sociale | Assurances Hefiri Zineb S.A.R.L. |
| Forme juridique | S.A.R.L. |
| Année de création | 2004 |
| Capital | 1 000 000 MAD |
| RC | 701 Khouribga |
| ICE | 001537302000019 |
| Dirigeante | Mme Zineb Hefiri |
| Adresse | 1, Rue d'Agadir, Khouribga 25000 |
| Téléphone | +212 5 23 49 26 22 |
| Email | hefiri@menara.ma |

## 📄 Licence

© 2024 Assurances Hefiri Zineb S.A.R.L. Tous droits réservés.

## 📝 Sources de recherche
- Telecontact.ma
- Maroc Annuaire
- Charika.ma
- 212Assurances.com
- Yelo.ma
- Albaraka.ma
- Annuaire-gratuit.ma
- Telemaroc.ma
