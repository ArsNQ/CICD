#!/bin/bash

eval $(ssh-agent)
ssh-add /home/user/Bureau/group-2_rsa
xG1A7qMYpZ7jlxmpxeSqUA
ssh-copy-id -i /root/.ssh/id_rsa.pub  admusr@default-group2-docker.francecentral.cloudapp.azure.com
ssh-copy-id -i /root/.ssh/id_rsa.pub  admusr@default-group2-web.francecentral.cloudapp.azure.com
ssh-copy-id -i /root/.ssh/id_rsa.pub  admusr@default-group2-database.francecentral.cloudapp.azure.com
