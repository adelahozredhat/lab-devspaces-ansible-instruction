# lab-devspaces-ansible-exercise5

**Extra challenge.** This exercise is **not a step-by-step tutorial**. It is for students who have **finished exercises 1 to 4** and want to show what they have learned about Ansible (playbooks, roles, collections, quality and Execution Environments) by analysing requirements and **building the solution**.

**Versión en castellano:** [README.md](README.md)

There is no reference playbook, role or EE definition to copy. The instructor assesses your **analysis**, **design** and the **result** on your Fedora VM / Dev Spaces.

---

## Context

In the previous exercises you installed WildFly, extracted roles, worked with a **collection** and built an **Execution Environment**. Here you must **integrate** those pieces around a realistic team case: deploy an application, automate the collection lifecycle and produce an EE aligned with your team’s needs at Santander.

This repository is opened as an **independent Dev Spaces workspace** (`devfile.yaml`), like the other exercises.

---

## What this repository provides

The source of a **Hello World** application ready to package as a WAR and deploy on **WildFly 39** (Jakarta EE 10, Java 21):

```text
hello-world-wildfly/
├── pom.xml
└── src/main/
    ├── java/com/santander/lab/hello/HelloWorldServlet.java
    └── webapp/
        ├── index.html
        └── WEB-INF/web.xml
```

| Item | Value |
| ---- | ----- |
| Packaging | Maven `war`, `finalName`: `helloworld` → artifact `helloworld.war` |
| HTTP context | `/helloworld/` (page) and `/helloworld/api/hello` (plain text `Hello World`) |
| Build | `mvn -f hello-world-wildfly/pom.xml package` (on the controller, on the node, or inside a role; you choose the design) |

Everything else (roles, modules, quality playbooks, `execution-environment.yml`, inventory, tests) **you design and write**, preferably **inside the collection you developed** (exercise 3 onwards), not as a one-off forgotten playbook.

---

## Requirements (analyse and implement)

### 1. Extend the collection: deploy the application on WildFly

Add to **your collection** whatever is needed to deploy this simple application on the lab WildFly (the Fedora VM, consistent with exercise 1).

You must decide, at least:

- How you **bring the `hello-world-wildfly/` code** into the collection (`files/`, `roles/…`, copy from this repo, prior build, etc.).
- How you **compile** the WAR (Maven on the controller, on the target, intermediate image, …) in an **idempotent** way.
- How you **deploy** to `standalone/deployments` (or a mechanism you can justify) with the WildFly service owner/group.
- Variables (`defaults` / `vars`), FQCN of roles or modules, and whether you need a sample playbook **inside the collection**.

The sample app from exercise 1 (`index.html` packed by hand) **does not replace** this WAR: the goal is to integrate **this** Hello World.

### 2. Collection lifecycle playbook

Against **the collection you developed**, create a playbook that runs the **automation project lifecycle** (not only the WildFly deploy). As guidance, the flow should cover, in an automated and repeatable way:

- YAML lint (`yamllint` or equivalent);
- `ansible-lint` on the collection / playbooks;
- collection tests (`ansible-test` sanity and/or units, plus any integration you consider);
- any other step your team would treat as a quality **gate** (for example signing with `ansible-sign`, WAR build, or publishing reports).

The playbook may run against `localhost` / the workspace, against a CI node, or a mix: **justify it**. It must be launchable explicitly (e.g. `ansible-playbook` or `ansible-navigator`) and **fail** if a quality step does not pass.

### 3. Execution Environment according to the Santander team

Define and **build** an Execution Environment that reflects **your team’s** needs (real or lab versions you can defend):

- **base image** (a concrete version, not an unexplained `latest`);
- **system binary** dependencies (bindep / `system`);
- **Python libraries**;
- **Ansible content** (collections and, if applicable, `ansible-core` / `ansible-runner`);
- build with `ansible-builder` and evidence that the image was produced (local tag and, if the lab allows it, push to a registry).

You are not asked to clone `ee-example.yml` from exercise 4: you are asked for **your** EE, documented (what is inside and why).

---

## Acceptance criteria (minimum)

1. **WildFly** on the lab VM serves `Hello World` at `/helloworld/api/hello` (HTTP 200, body `Hello World`) and the page at `/helloworld/`.
2. Deployment goes **through collection content** (role and/or modules), not only unreproducible one-off tasks.
3. A **lifecycle** playbook runs the collection linters and tests and exits non-zero if they fail.
4. An EE definition file exists (Ansible Builder 3.x schema), the **build** has been run, and you can explain the versions chosen in the Santander / AAP lab context.
5. You document in a short `NOTES.md` or in **your** collection README: decisions, inventory, how to run the lifecycle, and how to build the EE.

---

## Material from previous exercises (reference, not a recipe)

| Exercise | Knowledge to reuse |
| -------- | ------------------ |
| 1 | WildFly install, Fedora inventory, yamllint, ansible-lint, Molecule, ansible-sign |
| 2 | Roles in Git and `requirements.yml` |
| 3 | Collection layout, FQCN, `ansible-test`, coverage |
| 4 | `execution-environment.yml`, `ansible-builder`, `ansible-navigator --eei` |

---

## Suggested deliverable

In **this** exercise workspace and/or in **your collection** repository (agree with the instructor):

- collection changes (roles/playbooks/tests);
- lifecycle playbook;
- EE definition and build;
- design notes (versions, team assumptions).

**There is no official solution to paste.** The challenge is to show you can move from a tutored guide to your own Ansible development.
