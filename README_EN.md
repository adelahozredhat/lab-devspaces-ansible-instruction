# OpenShift Dev Spaces lab — Ansible

**GitHub Pages guide:** [index.html](index.html) (sidebar index, language switch, and fields for URLs, repositories and credentials). In the repository: *Settings → Pages → Deploy from a branch* (`master`, folder `/`).

Continuous guide for the **four hands-on exercises** and an **extra challenge** (exercise 5). Follow the order on this page: the detailed content of each exercise is in the **README of its own repository**, not in this index.

**Versión en castellano:** [README.md](README.md)

---

## Accessing Dev Spaces and starting the workspace

The screenshots in this section come from a sample lab. You will see a specific cluster, OpenShift user `user2` and Gitea user `lab-user-2`. **URLs, paths and login users depend on the account assigned to you.** Use the lab Excel (or the *Lab settings* boxes on the [GitHub Pages guide](index.html)). Do not copy the paths from the screenshots as-is.

The workspace is created from the **initial instruction repository** on Gitea (`lab-devspaces-ansible-instruction` belonging to **your** user). That repository includes a `devfile.yaml` that also clones the exercise repositories.

### 1. Open Dev Spaces and sign in

1. In the browser, open the **Dev Spaces URL** you were given (it usually ends with `/dashboard/`).
2. Click **Log in with OpenShift**.
3. Authenticate with **your** OpenShift username and password (`user1`, `user2`, …).
4. On **Authorize Access**, leave `user:full` selected and click **Allow selected permissions**.

![Dev Spaces login page: Log in with OpenShift](images/3.01%20-%20accessenvironment.png)

![Authorize the openshift-devspaces-client (the user will be yours)](images/3.02%20-%20accessenvironment.png)

### 2. Create Workspace screen

After login you land on **Create Workspace**. The **Git repo URL** field is where you paste the initial repository URL. Copy that URL from Gitea first.

![Create Workspace dashboard, Git repo URL field](images/3.03%20-%20accessenvironment.png)

### 3. Copy the initial repository URL from Gitea

1. Open the lab **Gitea URL**.
2. Click **Sign In** with **your** Gitea user (`lab-user-1`, `lab-user-2`, …). It is not the same identifier as the OpenShift user: `user2` maps to `lab-user-2`.
3. Go to **Explore → Repositories** and open **your** `lab-devspaces-ansible-instruction` repository (the path is `/<your-gitea-user>/lab-devspaces-ansible-instruction`).
4. Click the **<> Code** button, **HTTPS** tab, and copy the URL (*Copy URL* icon).

The URL looks like this:

```text
https://<gitea-host>/<your-gitea-user>/lab-devspaces-ansible-instruction.git
```

![Gitea home page](images/3.04%20-%20accessenvironment.png)

![Explore Repositories: pick your user's instruction repo](images/3.05%20-%20accessenvironment.png)

![Your user's lab-devspaces-ansible-instruction repository](images/3.06%20-%20accessenvironment.png)

![Code button: copy the repository HTTPS URL](images/3.07%20-%20accessenvironment.png)

### 4. Create and open the workspace

1. Go back to Dev Spaces, **Create Workspace**.
2. Paste the URL into **Git repo URL** (leave **Use a Default Editor**).
3. Click **Create & Open**.
4. On **Do you trust the authors of this repository?**, click **Continue**.
5. Wait until the start steps finish (**Initializing**, **Creating a workspace**, **Waiting for workspace to start**, **Open IDE**). The first start can take several minutes.

![Paste the Git URL and click Create & Open](images/3.08%20-%20accessenvironment.png)

![Confirm trust in the repository authors](images/3.09%20-%20accessenvironment.png)

![Progress: Waiting for workspace to start](images/3.10%20-%20accessenvironment49-54.png)

![Progress: Waiting for workspace deployment](images/3.11%20-%20accessenvironment50-02.png)

### 5. First time in the IDE

The editor opens in the browser. The URL includes **your** OpenShift user and the workspace name (`ansible-demo` in the screenshots), for example `…/user2/ansible-demo/…`.

1. If you see **Restricted Mode**, trust the workspace so extensions can run.
2. If it asks **Do you trust the publisher 'redhat' and …?**, click **Trust Publishers & Install**.
3. If it asks **Do you trust the authors of the files in this workspace?**, click **Trust Workspace & Install**.

The explorer shows the folders `lab-devspaces-ansible-instruction` and `lab-devspaces-ansible-exercise1` … `exercise5`. Do each exercise **inside its folder**, opening that project's `README.md`.

![IDE open with the lab projects](images/3.12%20-%20accessenvironment51-05.png)

![Trust extension publishers](images/3.13%20-%20accessenvironment51-09.png)

![Trust the workspace and install extensions](images/3.14%20-%20accessenvironment51-14.png)

### 6. Open a terminal

1. Menu **Terminal → New Terminal**.
2. Choose the working directory of the exercise (or the instruction repo).
3. If the **OpenShift Toolkit** asks for the API URL, username and password, use **your** cluster credentials.

![Terminal menu → New Terminal](images/3.15%20-%20accessenvironment51-54.png)

![Select the working directory for the new terminal](images/3.16%20-%20accessenvironment52-31.png)

![Terminal ready; OpenShift login if the toolkit asks](images/3.17%20-%20accessenvironment52-39.png)

![Workspace ready: projects, terminal and git status](images/3.18%20-%20accessenvironment53-07.png)

---

## How the exercises are deployed

Each exercise lives in **its own Git repository**. The usual lab start is **a single workspace** created from the instruction repository (previous section): the `devfile.yaml` clones every project. Work in the folder of the exercise you are on and open its `README.md`. You can also create a workspace from a single exercise repo if the instructor says so.

Typical flow:

1. Sign in to Dev Spaces and **start the workspace** from **your** instruction repo URL (previous section).
2. In the explorer, open the exercise repository (`lab-devspaces-ansible-exercise1`, then `…-exercise2`, and so on; the extra challenge is `…-exercise5`).
3. Open **`README.md`** (or **`README_EN.md`**) at the **root of that project**. For exercises 1–4 that is the step-by-step guide; for exercise 5 it is the challenge requirements.
4. When you finish, move to the next exercise **in the next folder** (same workspace). If you prefer one workspace per exercise, create another from that repository URL.

This repository (`lab-devspaces-ansible-instruction`) is the **lab map** and the **workspace entry point**. Use it for the order and the section index; the practical work happens inside each exercise folder.

---

## Learning path

The lab builds, step by step, the same automation thread: a **WildFly** deployment on a Fedora VM, each time with more Ansible structure.

```mermaid
flowchart LR
  E1["Exercise 1<br/>Playbook"] --> E2["Exercise 2<br/>Roles in Git"]
  E2 --> E3["Exercise 3<br/>Collection"]
  E3 --> E4["Exercise 4<br/>Execution Environment"]
  E4 -.-> E5["Exercise 5 extra<br/>Functional challenge"]
```

| Order | Git repository (Dev Spaces workspace) | What you learn | Guide in that workspace |
| ----- | ------------------------------------- | -------------- | ----------------------- |
| 1 | `lab-devspaces-ansible-exercise1` | Monolithic playbook, refactor with `tags`/`block`, local roles, quality and signing | `README.md` · `README_EN.md` |
| 2 | `lab-devspaces-ansible-exercise2` | Extract a role to its own Git repository and consume it with `requirements.yml` | `README.md` · `README_EN.md` |
| 3 | `lab-devspaces-ansible-exercise3` | Collection structure, custom module, `ansible-test` and coverage | `README.md` · `README_EN.md` |
| 4 | `lab-devspaces-ansible-exercise4` | Define, build and run an Execution Environment with ansible-navigator | `README.md` · `README_EN.md` |
| Extra | `lab-devspaces-ansible-exercise5` | Challenge: analysis and development (Hello World on WildFly, collection lifecycle, team EE) | `README.md` · `README_EN.md` |

**How they fit together**

1. In **exercise 1** you write and refactor the WildFly playbook into local roles, linters, Molecule and `ansible-sign`.
2. In **exercise 2** you take one of those roles (e.g. `wildfly_os_deps`) into a standalone Git repo and install it with `ansible-galaxy`.
3. In **exercise 3** you go one level up: a **collection** groups modules, roles and tests under an FQCN.
4. In **exercise 4** you package the runtime (collections, Python, `oc`, etc.) into an **EE image** and run playbooks inside it.
5. **Exercise 5** is **optional**: a challenge for whoever finishes the rest; there is no step-by-step recipe.

Before each exercise, **open that repository folder** in the workspace (the instruction `devfile.yaml` already cloned it; each exercise also ships its own if you start a separate workspace). The section index below matches the headings of that `README.md`.

---

## Exercise 1 — Playbooks, local roles and quality

**Git repository / Dev Spaces workspace:** `lab-devspaces-ansible-exercise1`  
**Full guide:** in that workspace, `README_EN.md` (English) or `README.md` (Spanish).

Hands-on course: the reference file `deploy-wildfly.yaml` is the target result. You build the playbook, refactor it and validate it.

### Guide index

- Environment setup
- 1. Context: what `deploy-wildfly.yaml` does
- Inventory: Fedora VM host on OpenShift
- 2. Step-by-step guide (first monolithic playbook)
  - Step 1 — Play header
  - Step 2 — Play variables (`vars`)
  - Step 3 — System dependencies
  - Step 4 — System group for WildFly
  - Step 5 — System user for WildFly
  - Step 6 — Download and install the product
  - Step 7 — Clean the destination link or directory
  - Step 8 — Symbolic link to the specific version
  - Step 9 — Listen on all interfaces
  - Step 10 — Startup script for systemd
  - Step 11 — systemd unit
  - Step 12 — Service configuration directory and file
  - Step 13 — Start and enable the service
  - Step 14 — (Optional) Firewall
  - Step 15 — Sample application
- 3. Refactoring with `tags` and `block`
  - 3.1 Tags (`tags`)
  - 3.2 Blocks (`block`)
- 4. Roles, variables and handlers
  - 4.1 Suggested role layout
  - 4.2 Variables
  - 4.3 Handlers
  - 4.4 Playbook that calls the roles
- 5. Quality: yamllint, ansible-lint and Molecule
  - 5.1 yamllint
  - 5.2 ansible-lint
  - 5.3 Molecule
- 6. Signing the project with `ansible-sign`
  - Lab password (GPG passphrase)
  - 6.1 Requirements and installation
  - 6.2 GPG key pair for signing
  - 6.3 `MANIFEST.in`
  - 6.4 Sign the project
  - 6.5 Verify the signature
- Summary
- Auxiliary commands

**Before moving to exercise 2:** playbook (or local roles) equivalent to the reference, inventory for your Fedora VM, and, if the instructor requires it, linters / Molecule / signing.

---

## Exercise 2 — Reusable roles in Git

**Git repository / Dev Spaces workspace:** `lab-devspaces-ansible-exercise2`  
**Full guide:** in that workspace, `README_EN.md` (English) or `README.md` (Spanish).

You start from the roles in exercise 1: you publish one in a Git repository of your own and consume it from the playbook with `ansible-galaxy` and `requirements.yml`.

### Guide index

- What is an Ansible role?
  - Typical role structure
  - Folders and files
- What this lab consists of
  - Concrete objectives
- Prerequisites
- Part A — Create the role repository
  - A.1 Create the empty repository on the forge
  - A.2 Clone and structure at the repo root
  - A.3 Contents of `tasks/main.yml`
  - A.4 Contents of `defaults/main.yml`
  - A.5 `meta/main.yml`
  - A.6 First commit and push
- Part B — Consume the role from the playbook
  - B.1 Remove the duplicated role
  - B.2 Create `requirements.yml`
  - B.3 Install roles
  - B.4 Configure `ansible.cfg`
  - B.5 Playbook that references the role
  - B.6 Verification
- Step summary (checklist)
- Practical notes
- Expected result

**Before moving to exercise 3:** the role lives in Git; the playbook declares it in `requirements.yml` and installs it with `ansible-galaxy` (without copying the role tree into the playbook repo).

---

## Exercise 3 — Ansible collections

**Git repository / Dev Spaces workspace:** `lab-devspaces-ansible-exercise3`  
**Full guide:** in that workspace, `README_EN.md` (English) or `README.md` (Spanish).

A collection packages modules, roles, playbooks and tests under a namespace (`namespace_example.collection_example`). Walk the template and run `ansible-test`.

### Guide index

- What is an Ansible collection?
- Goal of this lab
- Contents of `template-ansible-collection-develop`
  - Included role: `get_server_example_role`
  - Module and supporting code (plugins)
  - Other useful folders for orientation
- Environment (OpenShift Dev Spaces)
- Tests with `ansible-test` and coverage
  - Sanity (`sanity`)
  - Unit tests (`units`)
  - Integration tests (`integration`)
  - Code coverage reports
- References

**Before moving to exercise 4:** you have located the role, module and tests in the collection tree and have run at least `ansible-test` (sanity and/or units) from the `galaxy.yml` directory.

---

## Exercise 4 — Execution Environments

**Git repository / Dev Spaces workspace:** `lab-devspaces-ansible-exercise4`  
**Full guide:** in that workspace, `README_EN.md` (English) or `README.md` (Spanish).

You generate an EE image with `ansible-builder` and run playbooks with `ansible-navigator` from Dev Spaces.

### Guide index

- What is an Execution Environment?
- Keys in the definition file (Ansible Builder 3.x)
  - `version`
  - `images`
  - `dependencies`
  - `build_arg_defaults`
  - `additional_build_files`
  - `additional_build_steps`
  - `options`
- Practical lab contents
- Requirements in DevSpaces
- Part 1 — Review the Execution Environment files
  - 1.1 `ee-example.yml`
  - 1.2 `ee-example-not-exec.yml`
- Part 2 — Generate the build context (`create`)
  - Review the generated context
- Part 3 — Image build and publication
  - 3.1 Build with `ee-example.yml`
  - 3.2 Build with `ee-example-not-exec.yml`
- Part 4 — ansible-navigator with the already published image
  - 4.1 Playbook against Fedora
  - 4.2 Playbook against the OpenShift API
- Part 5 — Recommended changes for a real OpenShift cluster
  - `test-exec-fedora.yaml` + `inventory`
  - `test-exec-openshift.yaml`
- Notes — Reference commands

**End of the guided path:** you have described an EE, generated context/image and run a playbook inside that image (`--eei`). If you still have time, **exercise 5** is the extra challenge.

---

## Exercise 5 — Extra challenge (functional)

**Optional.** Only if you have **finished exercises 1 to 4**. This is not a tutored guide: you analyse requirements and implement the solution to show what you have learned about Ansible.

**Git repository / Dev Spaces workspace:** `lab-devspaces-ansible-exercise5`  
**Full guide:** in that workspace, `README_EN.md` (English) or `README.md` (Spanish).

That repository includes the **Hello World application source** (`hello-world-wildfly/`) for WildFly 39. Everything else you design yourselves on **your collection** and your own EE.

### Guide index

- Context
- What this repository provides
- Requirements (analyse and implement)
  - 1. Extend the collection: deploy the application on WildFly
  - 2. Collection lifecycle playbook
  - 3. Execution Environment according to the Santander team
- Acceptance criteria (minimum)
- Material from previous exercises (reference, not a recipe)
- Suggested deliverable

---

## Supporting material (outside this path)

The following repositories are not part of exercises 1–5; the instructor uses them to provision the cluster or for the AAP lab:

- `lab-devspaces-ansible` — install Dev Spaces, virtualization, Gitea and VMs.
- `lab-aap-ansible` / `lab-aap-ansible-exercise1` / `lab-aap-ansible-instruction` — Ansible Automation Platform.
