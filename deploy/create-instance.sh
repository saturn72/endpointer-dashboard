#! /bin/bash

#update and install dependencies
sudo apt update
sudo apt install git

#update node and npm 
sudo wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install node

# add pnpm
sudo wget -qO- https://get.pnpm.io/install.sh | sh -
source ~/.bashrc

#get source code
sudo mkdir -p /var/git
cd /var/git
sudo git clone https://github.com/saturn72/endpointer.git
cd /var/git/endpointer
sudo git pull
