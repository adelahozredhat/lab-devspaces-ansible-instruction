# Accessing Dev Spaces and starting the workspace

The screenshots in this section come from a sample lab. You will see a specific cluster, OpenShift user `user2` and Gitea user `lab-user-2`. **URLs, paths and login users depend on the account assigned to you.** Use the lab Excel (or the *Lab settings* boxes on this page). Do not copy the paths from the screenshots as-is.

The workspace is created from the **initial instruction repository** on Gitea (`lab-devspaces-ansible-instruction` belonging to **your** user). That repository includes a `devfile.yaml` that also clones the exercise repositories.

## 1. Open Dev Spaces and sign in

1. In the browser, open the **Dev Spaces URL** you were given (it usually ends with `/dashboard/`).
2. Click **Log in with OpenShift**.
3. Authenticate with **your** OpenShift username and password (`user1`, `user2`, …).
4. On **Authorize Access**, leave `user:full` selected and click **Allow selected permissions**.

![Dev Spaces login page: Log in with OpenShift](images/3.01%20-%20accessenvironment.png)

![Authorize the openshift-devspaces-client (the user will be yours)](images/3.02%20-%20accessenvironment.png)

## 2. Create Workspace screen

After login you land on **Create Workspace**. The **Git repo URL** field is where you paste the initial repository URL. Copy that URL from Gitea first.

![Create Workspace dashboard, Git repo URL field](images/3.03%20-%20accessenvironment.png)

## 3. Copy the initial repository URL from Gitea

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

## 4. Create and open the workspace

1. Go back to Dev Spaces, **Create Workspace**.
2. Paste the URL into **Git repo URL** (leave **Use a Default Editor**).
3. Click **Create & Open**.
4. On **Do you trust the authors of this repository?**, click **Continue**.
5. Wait until the start steps finish (**Initializing**, **Creating a workspace**, **Waiting for workspace to start**, **Open IDE**). The first start can take several minutes.

![Paste the Git URL and click Create & Open](images/3.08%20-%20accessenvironment.png)

![Confirm trust in the repository authors](images/3.09%20-%20accessenvironment.png)

![Progress: Waiting for workspace to start](images/3.10%20-%20accessenvironment49-54.png)

![Progress: Waiting for workspace deployment](images/3.11%20-%20accessenvironment50-02.png)

## 5. First time in the IDE

The editor opens in the browser. The URL includes **your** OpenShift user and the workspace name (`ansible-demo` in the screenshots), for example `…/user2/ansible-demo/…`.

1. If you see **Restricted Mode**, trust the workspace so extensions can run.
2. If it asks **Do you trust the publisher 'redhat' and …?**, click **Trust Publishers & Install**.
3. If it asks **Do you trust the authors of the files in this workspace?**, click **Trust Workspace & Install**.

The explorer shows the folders `lab-devspaces-ansible-instruction` and `lab-devspaces-ansible-exercise1` … `exercise5`. Do each exercise **inside its folder**, opening that project's `README.md`.

![IDE open with the lab projects](images/3.12%20-%20accessenvironment51-05.png)

![Trust extension publishers](images/3.13%20-%20accessenvironment51-09.png)

![Trust the workspace and install extensions](images/3.14%20-%20accessenvironment51-14.png)

## 6. Open a terminal

1. Menu **Terminal → New Terminal**.
2. Choose the working directory of the exercise (or the instruction repo).
3. If the **OpenShift Toolkit** asks for the API URL, username and password, use **your** cluster credentials.

![Terminal menu → New Terminal](images/3.15%20-%20accessenvironment51-54.png)

![Select the working directory for the new terminal](images/3.16%20-%20accessenvironment52-31.png)

![Terminal ready; OpenShift login if the toolkit asks](images/3.17%20-%20accessenvironment52-39.png)

![Workspace ready: projects, terminal and git status](images/3.18%20-%20accessenvironment53-07.png)
