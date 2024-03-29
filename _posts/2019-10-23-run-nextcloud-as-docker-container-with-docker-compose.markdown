---
layout: post
title:  "Run Nextcloud as Docker container with Docker Compose (updated in Nov 2022)"
date:   2022-11-13 12:00:00 +0100
categories: [cloud]
tags: [nextcloud, docker, docker compose, nginx]
---

I've set up my private cloud using [Nextcloud](https://nextcloud.com/). Because I'm a huge fan of
Docker, I decided to run Nextcloud as a Docker container. Luckily, there's an official
[Docker image](https://hub.docker.com/_/nextcloud) and they also provide examples on how
to run Nextcloud with a standalone database using Docker Compose.

**_Updated in November 2022 to include the latest Docker images_**

---

## a) Basic setup

The basic setup without subdomain, without TLS and without a reverse proxy is super easy. The corresponding `docker-compose.yml` looks like this:

```yaml
---
version: "3"
services:
  nextcloud:
    image: "nextcloud:25.0.1-apache"
    ports:
      - "8080:80"
    restart: always
    volumes:
      - nextcloud:/var/www/html
    environment:
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_PASSWORD=<MYSQL_PASSWORD>
      - MYSQL_HOST=mariadb
      - NEXTCLOUD_ADMIN_USER=<NEXTCLOUD_ADMIN_USER>
      - NEXTCLOUD_ADMIN_PASSWORD=<NEXTCLOUD_ADMIN_PASSWORD>
  mariadb:
    image: "mariadb:10.9.4-jammy"
    command: "--transaction-isolation=READ-COMMITTED --binlog-format=ROW"
    restart: always
    volumes:
      - db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=<MYSQL_ROOT_PASSWORD>
      - MYSQL_PASSWORD=<MYSQL_PASSWORD>
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
volumes:
  nextcloud:
  db:
```

You can then start your Nextcloud setup using the following shell command:

```bash
docker-compose up -d
```

Use the following command to see a continuous log stream of your Nextcloud and MariaDB Docker contains on stdout. You can press `Ctrl + C` at any time to stop the log output (this will not shutdown your Nextcloud container):

```bash
docker-compose logs -f
```

---

## b) Advanced setup

Now, suppose we want to add a reverse proxy like NGINX in front of Nextcloud because we might want to run several applications behind different subdomains on our server. Furthermore, we want to secure our connection to Nextcloud through TLS because we don't want that all our private data is transfered unencrypted over the internet:

<a class="img" href="/assets/2019-10-23/plantumlScenario.png">
  ![PlantUML diagram denoting the scenario with Docker](/assets/2019-10-23/plantumlScenario.png)
</a>

<!--
```plantuml
@startuml

together {
    actor Client
    node Server {
        node "Docker Daemon" {
            together {
                node NGINX
            }
            together {
                node "App1"
                node "App2"
                node Nextcloud
            }
        }
    }
}

NGINX -[hidden]-> Nextcloud
NGINX -[hidden]-> App1
NGINX -[hidden]-> App2

Client-> NGINX : cloud.example.com
NGINX -> App1 : app1.example.com
NGINX -> App2 : app2.example.com
NGINX -> Nextcloud : cloud.example.com

@enduml
```
-->

To realize this scenario, we need to make these changes:

* The Docker containers of NGINX and Nextcloud (+ MariaDB) need to run on the same Docker network so that NGINX can proxy traffic to Nextcloud. I assume that you already have a running NGINX with TLS setup ([read this for a how-to](https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71)). **Make sure to use the appropriate network name!** When using Docker Compose, the network name is a concatenation of the directory name (where the `docker-compose.yml` is stored) + the name of the NGINX container + `network` (each part separated by hyphens). In my case the NGINX is running inside a Docker network called `apps_nginx_network`.

* Since the Docker containers of NGINX and Nextcloud are now running on the same network, it is not necessary to expose the port of Nextcloud. For this reason, compared to the basic setup described above, the port exposure (`ports: - "8080:80"`) can be omitted.

* For security reasons, Nextcloud prints an error message when running on a subdomain. To fix this error, set the environment variable `NEXTCLOUD_TRUSTED_DOMAINS` to the fully-qualified domain name (FQDN) under which your Nextcloud instance will be served, in this case `cloud.example.com`.

#### **Resulting configuration `docker-compose.yml`:**

```yaml
---
version: "3"
services:
  nextcloud:
    image: "nextcloud:25.0.1-apache"
    restart: always
    volumes:
      - nextcloud:/var/www/html
    environment:
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_PASSWORD=<MYSQL_PASSWORD>
      - MYSQL_HOST=mariadb
      - NEXTCLOUD_ADMIN_USER=<NEXTCLOUD_ADMIN_USER>
      - NEXTCLOUD_ADMIN_PASSWORD=<NEXTCLOUD_ADMIN_PASSWORD>
      - NEXTCLOUD_TRUSTED_DOMAINS=cloud.example.com
    networks:
      - <NAME_OF_NGINX_DOCKER_NETWORK>
  mariadb:
    image: "mariadb:10.9.4-jammy"
    command: "--transaction-isolation=READ-COMMITTED --binlog-format=ROW"
    restart: always
    volumes:
      - db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=<MYSQL_ROOT_PASSWORD>
      - MYSQL_PASSWORD=<MYSQL_PASSWORD>
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
    networks:
      - <NAME_OF_NGINX_DOCKER_NETWORK>
volumes:
  nextcloud:
  db:
networks:
  <NAME_OF_NGINX_DOCKER_NETWORK>:
    external: true  
```

After updating your `docker-compose.yml`, you can restart Nextcloud so that the changes take effect:

```bash
docker-compose down
docker-compose up -d
```


#### **Forward traffic from NGINX to Nextcloud:**

Because NGINX and Nextcloud run inside the same Docker network, they can ping / reach eachother through their container names (= their hostnames). That means, in this example the NGINX container can forward traffic to Nextcloud through `http://nextcloud:80`.

Your NGINX configuration could look similar to this:

```conf
...

server {
    listen 443 ssl;
    server_name cloud.example.com;
    server_tokens off;

    ssl_certificate /etc/letsencrypt/live/cloud.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cloud.example.com/privkey.pem;

    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://nextcloud:80/;
        proxy_set_header    Host                $http_host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
    }

    client_max_body_size 10G;
}

...
```
