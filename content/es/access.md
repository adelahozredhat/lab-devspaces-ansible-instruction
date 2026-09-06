# Acceder a Dev Spaces y arrancar el workspace

Las capturas de esta sección son de un laboratorio de ejemplo (en las imágenes pueden verse otro clúster, `user2` y `lab-user-2`). **Las URLs, rutas y usuarios de abajo se actualizan con las cajas *Datos del laboratorio* de esta página.** No copies las rutas de las capturas tal cual.

El workspace se crea a partir del **repositorio inicial de instrucciones** en Gitea (`[[repoInstruction]]` de **[[giteaUser]]**). Ese repositorio incluye un `devfile.yaml` que clona también los repositorios de los ejercicios.

## 1. Abrir Dev Spaces e iniciar sesión

1. Abre en el navegador **[[devspacesUrl]]** (normalmente termina en `/dashboard/`).
2. Pulsa **Log in with OpenShift**.
3. Autentícate con el usuario **[[devspacesUser]]** y su contraseña.
4. En **Authorize Access**, deja marcado `user:full` y pulsa **Allow selected permissions**.

![Página de acceso a Dev Spaces: Log in with OpenShift](images/3.01%20-%20accessenvironment.png)

![Autorizar el cliente openshift-devspaces-client (el usuario será el tuyo)](images/3.02%20-%20accessenvironment.png)

## 2. Pantalla Create Workspace

Tras el login aparece **Create Workspace**. El campo **Git repo URL** es donde pegarás la URL del repositorio inicial. Primero hay que copiarla desde Gitea.

![Dashboard Create Workspace, campo Git repo URL](images/3.03%20-%20accessenvironment.png)

## 3. Copiar la URL del repositorio inicial en Gitea

1. Abre **[[giteaUrl]]**.
2. Entra con **Sign In** usando el usuario Gitea **[[giteaUser]]**. No es el mismo identificador que OpenShift (**[[ocpUser]]**).
3. Ve a **Explore → Repositories** y abre **tu** repositorio `[[repoInstruction]]` (la ruta es `[[giteaPath]]`).
4. Pulsa el botón **<> Code**, pestaña **HTTPS**, y copia la URL (icono *Copy URL*).

La URL a copiar es:

```text
[[instructionCloneUrl]]
```

![Página de inicio de Gitea](images/3.04%20-%20accessenvironment.png)

![Explore Repositories: elige el repo de instrucciones de tu usuario](images/3.05%20-%20accessenvironment.png)

![Repositorio lab-devspaces-ansible-instruction de tu usuario](images/3.06%20-%20accessenvironment.png)

![Botón Code: copiar la URL HTTPS del repositorio](images/3.07%20-%20accessenvironment.png)

## 4. Crear y abrir el workspace

1. Vuelve a Dev Spaces, **Create Workspace**.
2. Pega la URL en **Git repo URL** (deja **Use a Default Editor**).
3. Pulsa **Create & Open**.
4. En **Do you trust the authors of this repository?**, pulsa **Continue**.
5. Espera a que terminen los pasos de arranque (**Initializing**, **Creating a workspace**, **Waiting for workspace to start**, **Open IDE**). Puede tardar varios minutos la primera vez.

![Pegar la URL Git y pulsar Create & Open](images/3.08%20-%20accessenvironment.png)

![Confirmar confianza en los autores del repositorio](images/3.09%20-%20accessenvironment.png)

![Progreso: Waiting for workspace to start](images/3.10%20-%20accessenvironment49-54.png)

![Progreso: Waiting for workspace deployment](images/3.11%20-%20accessenvironment50-02.png)

## 5. Primera vez en el IDE

El editor se abre en el navegador. La URL incluye tu usuario OpenShift **[[ocpUser]]** y el nombre del workspace (`ansible-demo` en las capturas), por ejemplo `[[devspacesIdePath]]`.

1. Si ves **Restricted Mode**, confía en el workspace para habilitar las extensiones.
2. Si pregunta **Do you trust the publisher 'redhat' and …?**, pulsa **Trust Publishers & Install**.
3. Si pregunta **Do you trust the authors of the files in this workspace?**, pulsa **Trust Workspace & Install**.

En el explorador aparecen las carpetas `lab-devspaces-ansible-instruction` y `lab-devspaces-ansible-exercise1` … `exercise5`. El trabajo de cada ejercicio se hace **dentro de su carpeta**, abriendo su `README.md`.

![IDE abierto con los proyectos del laboratorio](images/3.12%20-%20accessenvironment51-05.png)

![Confiar en los publicadores de extensiones](images/3.13%20-%20accessenvironment51-09.png)

![Confiar en el workspace e instalar extensiones](images/3.14%20-%20accessenvironment51-14.png)

## 6. Abrir un terminal

1. Menú **Terminal → New Terminal**.
2. Elige el directorio de trabajo del ejercicio (o el de instrucciones).
3. Si el **OpenShift Toolkit** pide URL de la API, usuario y contraseña, usa **[[ocpApiUrl]]**, el usuario **[[ocpUser]]** y su contraseña.

![Menú Terminal → New Terminal](images/3.15%20-%20accessenvironment51-54.png)

![Seleccionar el directorio de trabajo del terminal](images/3.16%20-%20accessenvironment52-31.png)

![Terminal listo; login a OpenShift si el toolkit lo pide](images/3.17%20-%20accessenvironment52-39.png)

![Workspace listo: proyectos, terminal y git status](images/3.18%20-%20accessenvironment53-07.png)
