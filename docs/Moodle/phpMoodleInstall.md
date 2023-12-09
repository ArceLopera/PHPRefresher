For developers seeking an efficient and isolated environment, Moodle-Docker provides a convenient solution. Leveraging Docker containers, this setup streamlines the installation process, making development and testing seamless. Follow the steps below to set up Moodle with [Moodle-Docker](https://github.com/moodlehq/moodle-docker) for a developer-friendly environment.

## Prerequisites:

### Install Docker:

Ensure Docker and Docker Compose v2 is installed on your system. Visit [Docker's official website](https://docs.docker.com/engine/install/) for instructions.

### Add user group to run docker as a non-root user


1. Create the docker group.

``` bash
sudo groupadd docker
```

2. Add your user to the docker group.

``` bash
sudo usermod -aG docker $USER
```

3. Log out and log back in so that your group membership is re-evaluated.

If you're running Linux in a virtual machine, it may be necessary to restart the virtual machine for changes to take effect.

You can also run the following command to activate the changes to groups:

``` bash
newgrp docker
```

4. Verify that you can run docker commands without sudo.

``` bash
docker run hello-world
```

More information about Docker post-install configuration can be found in the [Docker documentation](https://docs.docker.com/engine/install/linux-postinstall/).


## Quick Install

### Clone Moodle-Docker Repository:

Clone the Moodle-Docker repository from GitHub:

``` bash
git clone https://github.com/moodlehq/moodle-docker.git
```

### Set up path to Moodle code


``` bash
# For example: /home/user/moodle/
export MOODLE_DOCKER_WWWROOT=/path/to/moodle/code
```


### Choose a db server (Currently supported: pgsql, mariadb, mysql, mssql, oracle)

``` bash
export MOODLE_DOCKER_DB=pgsql
```

### Ensure customized config.php for the Docker containers is in place

``` bash
cp config.docker-template.php $MOODLE_DOCKER_WWWROOT/config.php
```

### Start up containers

``` bash
bin/moodle-docker-compose up -d
```

prints:

``` bash
[+] Running 82/5
 ✔ webserver 25 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]   0B/0B     Pulled      364.6s 
 ✔ exttests 14 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]                 0B/0B     Pulled      240.1s 
 ✔ db 12 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]                         0B/0B      Pulled      207.0s 
 ✔ mailpit 3 layers [⣿⣿⣿]                                0B/0B      Pulled      77.7s 
 ✔ selenium 23 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled      240.3s 
[+] Running 6/6
 ✔ Network moodle-docker_default        Created         20.3s 
 ✔ Container moodle-docker-selenium-1   Started         94.6s 
 ✔ Container moodle-docker-db-1         Started         94.9s 
 ✔ Container moodle-docker-exttests-1   Started         94.4s 
 ✔ Container moodle-docker-mailpit-1    Started         94.8s 
 ✔ Container moodle-docker-webserver-1  Started          6.6s
```

### Access Moodle Web Installer:

Go to http://localhost:8000/admin/index.php and follow the instructions to install Moodle. Follow the Moodle web installer instructions to set up your site. Configure database details, administrator account, and other settings.

### Wait for DB to come up (important for oracle/mssql)


bin/moodle-docker-wait-for-db

### Work with the containers 

(see [Github wiki](https://github.com/moodlehq/moodle-docker) for more details)


### Stop and restart containers

``` bash
bin/moodle-docker-compose down 
```

stops and destroys the containers. If you want to use your containers continuously for manual testing or development without starting them up from scratch everytime you use them, you can also just stop without destroying them. With this approach, you can restart your containers sometime later, they will keep their data and won't be destroyed completely until you run: 

``` bash
bin/moodle-docker-compose down 
```

#### Stop containers

``` bash
bin/moodle-docker-compose stop
```

#### Restart containers

``` bash
bin/moodle-docker-compose start
```

#### Shut down and destroy containers

``` bash
bin/moodle-docker-compose down
```


## Additional Notes:

### Accessing Docker Containers

To access the Moodle Docker container's shell, use:

``` bash
docker exec -it moodle-docker_webserver_1 /bin/bash
```


Congratulations! You've successfully set up Moodle using Moodle-Docker, creating an isolated and easily reproducible development environment. This Docker-based approach simplifies the process for developers, providing a consistent and efficient way to work on Moodle projects. Dive into development, customize your Moodle instance, and contribute to the vibrant Moodle community!