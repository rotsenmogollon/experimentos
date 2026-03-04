# Subir el proyecto a GitHub

## 1. Instalar GitHub CLI (si no lo tienes)

En tu terminal, ejecuta (te pedirá contraseña de sudo):

```bash
# Añadir clave y repositorio oficial
sudo curl -fsSLo /usr/share/keyrings/githubcli-archive-keyring.gpg https://cli.github.com/packages/githubcli-archive-keyring.gpg

echo "Types: deb
URIs: https://cli.github.com/packages
Suites: stable
Components: main
Architectures: $(dpkg --print-architecture)
Signed-By: /usr/share/keyrings/githubcli-archive-keyring.gpg" | sudo tee /etc/apt/sources.list.d/github-cli.sources > /dev/null

# Instalar
sudo apt update && sudo apt install gh -y
```

## 2. Iniciar sesión en GitHub

```bash
gh auth login
```

- Elige **GitHub.com**
- Elige **HTTPS**
- Elige **Login with a web browser** (o SSH si ya tienes llave)
- Copia el código que te muestra y pégalo en el navegador cuando te lo pida

## 3. Crear el repositorio y subir el proyecto

Desde la raíz del proyecto (`/home/rotsen/experimentos`):

```bash
cd /home/rotsen/experimentos

# Primer commit
git add -A
git commit -m "Initial commit: calendario Postiz y programación Instagram"

# Crear repo en tu cuenta (público; usa --private si quieres privado)
gh repo create experimentos --source=. --remote=origin --push --public
```

Si prefieres otro nombre para el repo o que sea privado:

```bash
gh repo create NOMBRE_REPO --source=. --remote=origin --push --private
```

---

**Nota:** Si el repo ya existe en GitHub y solo quieres enlazarlo y subir:

```bash
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPO.git
git push -u origin main
```
