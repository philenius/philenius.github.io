---
layout: post
title: "How to Update Nextcloud Docker Installation to the Latest Version"
date: 2022-11-13 12:00:00 +0000
categories: [cloud]
tags: [nextcloud, mariadb, maria, docker, docker compose, update, upgrade]
---

The developers of Nextcloud typically release [three major releases per year](https://docs.nextcloud.com/server/latest/admin_manual/release_schedule.html). With this release frequency, your current Nextcloud installation will quickly become obsolete. Luckily, updating Nextcloud is super easy. In this blog post, I will briefly describe how to update a Docker or Docker Compose based Nextcloud installation.

To learn how to set up Nextcloud with Docker and Docker Compose, see my previous blog post [_Run Nextcloud as Docker container with Docker Compose (updated in Nov 2022)_](/cloud/2022/11/13/run-nextcloud-as-docker-container-with-docker-compose.html)

---

## Updating Nextcloud to the latest version

#### 1. Things to consider:

:warning: **In case of data loss or corruption, I'd recommend to always maintain regular backups and make a fresh backup before every upgrade.**

[The Nextcloud documentation](https://docs.nextcloud.com/server/latest/admin_manual/maintenance/upgrade.html) lists two important rules when upgrading Nextcloud:

1. **Before you can upgrade to the next major release, Nextcloud upgrades to the latest minor and patch release.**

2. **You cannot skip major releases. Always increase the major version only one step at a time.**

#### 2. Example upgrade procedure in theory:

Given these two rules, let me briefly describe the upgrade path if we were to start with a Nextcloud `23.0.9` installation with Docker Compose:

1. Current installation `23.0.9`

2. The first step is to always upgrade to the latest minor and patch of your current major version. You can check for the latest available minor/patch version of Nextcloud on [Docker Hub](https://hub.docker.com/_/nextcloud/tags).  
   :arrow_right: upgrade to latest minor/patch `23.0.11`

3. Now that we have upgrade to the latest minor and patch, we can bump our version to the **next** major version. Keep in mind that major releases must not be skipped. We must increase the major version only one step at a time. However, you can jump straight to the latest minor and patch version.  
   :arrow_right: upgrade to the **next** major `24.0.7`

4. You can now repeatedly increase the major version until you reach the latest release of Nextcloud:  
   :arrow_right: upgrade to the **next** major `25.0.1`

#### 3. Example upgrade procedure in practice:

1. Let's assume were starting with Nextcloud version `23.0.9` and the `docker-compose.yml` looks similar to the following snippet:

   ```yaml
   ---
   version: "3"
   services:
     nextcloud:
       image: "nextcloud:23.0.9-apache"

       ...
   ```

2. First, shut down Nextcloud:

   ```bash
   docker-compose down
   ```

3. Update the Nextcloud Docker image to `23.0.11`, the latest minor and patch version of the current major version. :warning: **Do not increase the major version yet!**

   ```yaml
   ---
   version: "3"
   services:
     nextcloud:
       image: "nextcloud:23.0.11-apache"

       ...
   ```

4. You can now start Nextcloud. Nextcloud will automatically apply all required updates. During the upgrade, the Nextcloud web UI is automatically disabled. You can check if the upgrade completed successfully when you log back in to the web Nextcloud web UI at [localhost:8080](http://localhost:8080/). Alternatively, you can also watch the log statements to track the progress of the upgrade:

   ```bash
   docker-compose up -d

   docker-compose logs -f
   # nextcloud_1  | Initializing nextcloud 23.0.11.1 ...
   # nextcloud_1  | Upgrading nextcloud from 23.0.9.1 ...
   # ...
   # #### And a few moments later ####
   # ...
   # #### The following line indicates that the Nextcloud web server has started ####
   # nextcloud_1  | [Sun Nov 13 17:36:38.725816 2022] [core:notice] [pid 1] AH00094: Command line: 'apache2 -D FOREGROUND'
   ```

5. Once the upgrade is completed successfully, you can now shut down Nextcloud again:

   ```bash
   docker-compose down
   ```

6. We can now bump the Nextcloud version to the **next** major version `24.0.7`. Luckily, we can instantly update to the latest minor and patch version. :warning: **Never skip major a release. Increase the major version only one step at a time.**

   ```yaml
   ---
   version: "3"
   services:
     nextcloud:
       image: "nextcloud:24.0.7-apache"

       ...
   ```

7. Start Nextcloud. Again, the logs should indicate Nextcloud detecting an old version and applying an upgrade:

   ```bash
   docker-compose up -d

   docker-compose logs -f
   # nextcloud_1  | Initializing nextcloud 24.0.7.1 ...
   # nextcloud_1  | Upgrading nextcloud from 23.0.11.1 ...
   # ...
   # #### And a few moments later ####
   # ...
   # #### The following line indicates that the Nextcloud web server has started ####
   # nextcloud_1  | [Sun Nov 13 17:44:05.397079 2022] [core:notice] [pid 1] AH00094: Command line: 'apache2 -D FOREGROUND'
   ```

8. Shut down once again, change the Docker image to the latest major version, and finally restart:

   ```bash
   docker-compose down
   ```

   ```yaml
   ---
   version: "3"
   services:
     nextcloud:
       image: "nextcloud:25.0.1-apache"

       ...
   ```

   ```bash
   docker-compose up -d
   ```

Congrats, you should now have the latest version of Nextcloud running. :tada:

---

## Updating MariaDB to the latest minor or patch version

:warning: **Make sure to have backups before updating MariaDB!!!**

Unless Nextcloud is incompatible with your current version of MariaDB, it is not necessary to upgrade both Docker images simultaneously. Instead, you can first upgrade Nextcloud to the latest major, minor, and patch version, and afterwards do an upgrade of MariaDB.

Upgrading to the latest minor or patch version is trivial. Simply replace the tag of the Docker image in your `docker-compose.yml` with the latest available version. Example `docker-compose.yml` with older MariaDB version `10.4.8-bionic`:

```yaml
---
version: "3"
services:
  mariadb:
    image: "mariadb:10.4.8-bionic"

    ...
```

Updated `docker-compose.yml` with MariaDB's latest version `10.9.4-jammy` as of November 2022 ([check on Docker Hub](https://hub.docker.com/_/mariadb/tags) for the latest available version):

```yaml
---
version: "3"
services:
  mariadb:
    image: "mariadb:10.9.4-jammy"

    ...
```

Then simply restart your Nextcloud and MariaDB using `docker-compose down` followed by `docker-compose up -d`.

After the update, the log statements might include erros from MariaDB due to incorrect database schemas or compatibility issues. Example logs:

```
mariadb_1    | 2022-11-13 17:53:06 13 [ERROR] Incorrect definition of table mysql.column_stats: expected column 'histogram' at position 10 to have type longblob, found type varbinary(255).
mariadb_1    | 2022-11-13 17:53:06 13 [ERROR] Incorrect definition of table mysql.column_stats: expected column 'hist_type' at position 9 to have type enum('SINGLE_PREC_HB','DOUBLE_PREC_HB','JSON_HB'), found type enum('SINGLE_PREC_HB','DOUBLE_PREC_HB').
```

Luckily, MariaDB ships with the utility program `mariadb-upgrade` to identify and fix these compatibility issues:

1. Prerequisite: the MariaDB Docker container must be running.

2. Establish an interactive shell session for the MariaDB container:

   ```bash
   docker-compose exec mariadb bash
   ```

3. Inside the MariaDB Docker container, run the following command. It should prompt for your MariaDB's root password:

   ```bash
   mariadb-upgrade --user=root --password
   # Enter password:
   # Phase 1/7: Checking and upgrading mysql database
   # Processing databases
   # mysql
   # mysql.column_stats                                 OK
   #
   # ...
   #
   # nextcloud.oc_webauthn                              OK
   # nextcloud.oc_whats_new                             OK
   # sys
   # sys.sys_config                                     OK
   # Phase 7/7: Running 'FLUSH PRIVILEGES'
   # OK
   ```

Congrats, you've successfully updated MariaDB. Your logs should contain no more error statements. For a more in-depth documentation on how to upgrade MariaDB please refer to the [official MariaDB documentation](https://mariadb.com/docs//all/service-management/upgrades/community-server/release-series-cs10-5).
