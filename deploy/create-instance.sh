#! /bin/bash

#update and install dependencies
sudo apt update
sudo apt install git

#update node and npm 
sudo wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install node

npm install next@latest -g
npm install pnpm -g
source ~/.bashrc

#get source code
sudo mkdir -p /var/git
cd /var/git
sudo git clone https://github.com/saturn72/endpointer-dashboard.git
cd /var/git/endpointer-dashboard

sudo chmod -R 777 /var/git/endpointer-dashboard
#make directory public
pnpm install

