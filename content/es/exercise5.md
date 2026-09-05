# lab-devspaces-ansible-exercise5

**Reto extra.** Este ejercicio **no es un tutorial paso a paso**. Está pensado para quienes hayan **terminado los ejercicios 1 a 4** y quieran demostrar lo aprendido sobre Ansible (playbooks, roles, colecciones, calidad y Execution Environments) analizando requisitos y **desarrollando la solución**.

**English version:** [README_EN.md](README_EN.md)

No hay playbook, rol ni definición de EE de referencia que copiar. El formador evalúa el **análisis**, el **diseño** y el **resultado** en tu VM Fedora / Dev Spaces.

---

## Contexto

En los ejercicios anteriores instalaste WildFly, extraíste roles, trabajaste una **colección** y construiste un **Execution Environment**. Aquí debes **integrar** esas piezas sobre un caso realista de equipo: desplegar una aplicación, automatizar el ciclo de vida de la colección y fabricar un EE alineado con las necesidades de tu equipo en Santander.

Este repositorio se abre como **workspace Dev Spaces independiente** (`devfile.yaml`), igual que el resto de ejercicios.

---

## Qué se entrega en este repositorio

El código de una aplicación **Hello World** lista para empaquetar como WAR y desplegar en **WildFly 39** (Jakarta EE 10, Java 21):

```text
hello-world-wildfly/
├── pom.xml
└── src/main/
    ├── java/com/santander/lab/hello/HelloWorldServlet.java
    └── webapp/
        ├── index.html
        └── WEB-INF/web.xml
```

| Dato | Valor |
| ---- | ----- |
| Empaquetado | Maven `war`, `finalName`: `helloworld` → artefacto `helloworld.war` |
| Contexto HTTP | `/helloworld/` (página) y `/helloworld/api/hello` (texto `Hello World`) |
| Compilación | `mvn -f hello-world-wildfly/pom.xml package` (en el controlador, en el nodo o dentro de un rol; tú decides el diseño) |

El resto (roles, módulos, playbooks de calidad, `execution-environment.yml`, inventario, tests) **lo diseñáis y escribís vosotros**, preferiblemente **dentro de la colección que desarrollasteis** (ejercicio 3 y siguientes), no como un playbook suelto olvidado.

---

## Requisitos (analizad y desarrollad)

### 1. Ampliar la colección: desplegar la aplicación en WildFly

Añadid a **vuestra colección** lo necesario para desplegar esta aplicación simple en el WildFly del laboratorio (el de la VM Fedora, coherente con el ejercicio 1).

Debéis decidir, como mínimo:

- Cómo **incorporáis el código** de `hello-world-wildfly/` a la colección (`files/`, `roles/…`, copia desde este repo, build previo, etc.).
- Cómo **compiláis** el WAR (Maven en el controlador, en el destino, imagen intermedia, …) de forma **idempotente**.
- Cómo **desplegáis** en `standalone/deployments` (o el mecanismo que justifiquéis) con propietario/grupo del servicio WildFly.
- Variables (`defaults` / `vars`), FQCN de roles o módulos, y si hace falta un playbook de ejemplo **dentro de la colección**.

La aplicación de ejemplo del ejercicio 1 (`index.html` empaquetado a mano) **no sustituye** este WAR: el objetivo es integrar **esta** Hello World.

### 2. Playbook de ciclo de vida de la colección

Sobre **la colección que habéis desarrollado**, cread un playbook que ejecute el **ciclo de vida del proyecto de automatización** (no solo el despliegue de WildFly). Como orientación, el flujo debe cubrir, de forma automatizada y repetible:

- lint de YAML (`yamllint` o equivalente);
- `ansible-lint` sobre la colección / playbooks;
- pruebas de la colección (`ansible-test` sanity y/o units, y lo que consideréis de integración);
- cualquier otro paso que vuestro equipo consideraría “gate” de calidad (por ejemplo firma con `ansible-sign`, build del WAR, o publicación de informes).

El playbook puede correr contra `localhost` / el workspace, contra un nodo de CI o una combinación: **justificadlo**. Debe poder lanzarse de forma explícita (p. ej. `ansible-playbook` o `ansible-navigator`) y fallar si un paso de calidad no pasa.

### 3. Execution Environment según el equipo en Santander

Definid y **generad** un Execution Environment que refleje las necesidades de **vuestro equipo** (versiones reales o de laboratorio que podáis defender):

- **imagen base** (versión concreta, no un `latest` sin criterio);
- **dependencias de binarios** de sistema (bindep / `system`);
- **librerías Python**;
- **contenido Ansible** (colecciones y, si aplica, `ansible-core` / `ansible-runner`);
- build con `ansible-builder` y evidencia de que la imagen se ha generado (tag local y, si el laboratorio lo permite, push a un registro).

No se pide clonar el `ee-example.yml` del ejercicio 4: se pide un EE **vuestro**, documentado (qué va dentro y por qué).

---

## Criterios de aceptación (mínimos)

1. **WildFly** en la VM del laboratorio sirve `Hello World` en `/helloworld/api/hello` (HTTP 200, cuerpo `Hello World`) y la página en `/helloworld/`.
2. El despliegue se hace **vía contenido de la colección** (rol y/o módulos), no solo tareas sueltas irreproducibles.
3. Un playbook de **ciclo de vida** ejecuta linters y tests de la colección y termina con código de salida distinto de 0 si fallan.
4. Existe un fichero de definición de EE (esquema Ansible Builder 3.x), se ha ejecutado el **build** y podéis explicar las versiones elegidas en el contexto Santander / AAP del laboratorio.
5. Documentáis en un breve `NOTES.md` o en el README de **vuestra** colección: decisiones, inventario, cómo lanzar el ciclo de vida y cómo construir el EE.

---

## Material de los ejercicios anteriores (consulta, no receta)

| Ejercicio | Qué reutilizar como conocimiento |
| --------- | -------------------------------- |
| 1 | Instalación WildFly, inventario Fedora, yamllint, ansible-lint, Molecule, ansible-sign |
| 2 | Roles en Git y `requirements.yml` |
| 3 | Estructura de colección, FQCN, `ansible-test`, cobertura |
| 4 | `execution-environment.yml`, `ansible-builder`, `ansible-navigator --eei` |

---

## Entregable sugerido

En el workspace de **este** ejercicio y/o en el repositorio de **vuestra colección** (acordadlo con el formador):

- cambios en la colección (roles/playbooks/tests);
- playbook de ciclo de vida;
- definición y build del EE;
- notas de diseño (versiones, supuestos del equipo).

**No hay solución oficial que pegar.** El reto es demostrar que podéis pasar de una guía tutorizada a un desarrollo Ansible propio.
