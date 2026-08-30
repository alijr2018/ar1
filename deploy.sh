#!/bin/bash
# ============================================
# Deploy Script for Assurances Hefiri Zineb
# GitHub Pages Deployment Helper
# ============================================
# 
# USAGE: bash deploy.sh
#
# This script helps you deploy the website to GitHub Pages.
# It will guide you through the required steps.
#
# PREREQUISITES:
# - GitHub CLI (gh) installed: https://cli.github.com/
# - Git configured with your GitHub credentials
#
# ============================================

set -e

REPO="alijr2018/ar1"
SITE_URL="https://${REPO_OWNER:-alijr2018}.github.io/${REPO_NAME:-ar1}"

echo "=========================================="
echo "  🚀 GitHub Pages Deploy Helper"
echo "  Assurances Hefiri Zineb S.A.R.L."
echo "=========================================="
echo ""

# Check if gh is installed
if command -v gh &> /dev/null; then
  echo "✅ GitHub CLI detected"
  GH_AUTH=$(gh auth status 2>&1)
  if echo "$GH_AUTH" | grep -q "Logged in"; then
    echo "✅ Authenticated with GitHub"
  else
    echo "⚠️  Not authenticated. Run: gh auth login"
  fi
else
  echo "ℹ️  GitHub CLI not found. Install it from: https://cli.github.com/"
fi

echo ""
echo "=========================================="
echo "  Steps to Deploy to GitHub Pages"
echo "=========================================="
echo ""
echo "The site files are ready on the 'main' branch."
echo "Follow these steps to deploy:"
echo ""
echo "━━━ Step 1: Make the repository PUBLIC ━━━"
echo ""
echo "  GitHub Pages requires a PUBLIC repository"
echo "  (unless you have GitHub Pro/Team/Enterprise)."
echo ""
echo "  👉 Go to: https://github.com/${REPO}/settings"
echo "  👉 Scroll to 'Danger Zone' at the bottom"
echo "  👉 Click 'Change visibility' → 'Public'"
echo "  👉 Confirm the change"
echo ""
echo "━━━ Step 2: Enable GitHub Pages ━━━"
echo ""
echo "  👉 Go to: https://github.com/${REPO}/settings/pages"
echo "  👉 Under 'Source', select: 'Deploy from a branch'"
echo "  👉 Branch: 'main'"
echo "  👉 Folder: '/ (root)'"
echo "  👉 Click 'Save'"
echo ""
echo "━━━ Step 3: Wait for deployment ━━━"
echo ""
echo "  GitHub will build and deploy your site."
echo "  This usually takes 1-3 minutes."
echo ""
echo "  Your site will be live at:"
echo "  🌐 https://${REPO_OWNER:-alijr2018}.github.io/${REPO_NAME:-ar1}/"
echo ""
echo "=========================================="
echo ""
echo "📋 Quick links:"
echo "  • Repository: https://github.com/${REPO}"
echo "  • Settings:   https://github.com/${REPO}/settings"
echo "  • Pages:      https://github.com/${REPO}/settings/pages"
echo ""
echo "🔧 Alternative: Use GitHub Actions workflow"
echo "  If you prefer automatic deployments:"
echo "  1. Go to: https://github.com/${REPO}/actions"
echo "  2. Click 'New workflow' → 'set up a workflow yourself'"
echo "  3. Paste the content from .github/workflows/deploy-pages.yml"
echo "  4. Commit and the site will auto-deploy on every push to main"
echo ""
echo "=========================================="
