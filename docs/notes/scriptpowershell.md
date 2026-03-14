# ================================
# 1. Go to project
# ================================
cd C:\Projects\loki_a2-master


# ================================
# 2. Verify SSH authentication (Git push account)
# ================================
ssh -T git@github-reltroner


# ================================
# 3. Verify Git remote
# ================================
git remote -v


# ================================
# 4. Verify Git identity (Reltroner)
# ================================
git config user.name
git config user.email


# ================================
# 5. Verify GitHub CLI login (Copilot account)
# ================================
gh auth status


# ================================
# 6. If token invalid → login again
# ================================
# gh auth login


# ================================
# 7. Test Copilot
# ================================
gh copilot -p "Explain the architecture of this repository"

# ================================
# 8. Alternative Check
# ================================

powershell -ExecutionPolicy Bypass -File C:\Users\Reltropolis\copilot.ps1