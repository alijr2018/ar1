# 🚀 Guide de déploiement - GitHub Pages

## Déploiement en 3 étapes simples

### Étape 1 : Rendre le dépôt PUBLIC

Le site est sur un dépôt **privé**. GitHub Pages nécessite un dépôt **public** (sur le plan gratuit).

1. Allez sur : **https://github.com/alijr2018/ar1/settings**
2. Descendez jusqu'à **"Danger Zone"** en bas de page
3. Cliquez sur **"Change visibility"** → **"Public"**
4. Confirmez le changement

---

### Étape 2 : Activer GitHub Pages

1. Allez sur : **https://github.com/alijr2018/ar1/settings/pages**
2. Sous **"Source"**, sélectionnez : **"Deploy from a branch"**
3. Branche : **`main`**
4. Dossier : **`/ (root)`**
5. Cliquez sur **"Save"**

---

### Étape 3 : Attendre le déploiement

- GitHub va construire et déployer votre site
- Cela prend généralement **1 à 3 minutes**
- Vous verrez un message vert quand c'est prêt

**Votre site sera accessible à :**
```
https://alijr2018.github.io/ar1/
```

---

## 🔄 Alternative : Déploiement automatique avec GitHub Actions

Si vous préférez un déploiement automatique à chaque push :

1. Allez sur : **https://github.com/alijr2018/ar1/actions/new**
   (ou **Actions** → **"set up a workflow yourself"**)
2. Supprimez le contenu par défaut
3. Copiez-collez le workflow ci-dessous :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

4. Cliquez sur **"Commit changes"**
5. Le site sera automatiquement déployé

---

## 🔗 Liens rapides

| Action | URL |
|---|---|
| Dépôt | https://github.com/alijr2018/ar1 |
| Paramètres | https://github.com/alijr2018/ar1/settings |
| GitHub Pages | https://github.com/alijr2018/ar1/settings/pages |
| Actions | https://github.com/alijr2018/ar1/actions |

---

## ❓ Dépannage

### Le site ne se déploie pas ?
- Vérifiez que le dépôt est **public**
- Vérifiez que vous avez sélectionné la branche **main** et le dossier **/ (root)**
- Consultez l'onglet **Actions** pour voir les erreurs de déploiement

### Les fichiers JSON ne se chargent pas ?
- Le site est conçu pour fonctionner sur GitHub Pages
- Les chemins sont relatifs et s'adaptent automatiquement

### Le site affiche une page 404 ?
- Attendez quelques minutes après l'activation de Pages
- Le premier déploiement peut prendre jusqu'à 10 minutes

### La mise en page est cassée ?
- Vérifiez que GitHub Pages est bien configuré sur **/ (root)** et non un sous-dossier
- Le fichier `.nojekyll` est déjà inclus pour éviter les problèmes

---

## 📧 Support

Pour toute question technique, consultez la `DOCUMENTATION.md` du projet.
