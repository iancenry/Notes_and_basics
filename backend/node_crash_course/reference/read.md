## This folder is just a reference on how to implement node's core modules

- When starting a new node project run 'node init' to automatically create the package.json file which helps track dependencies so that when deploying on a server you can run 'npm install' to install all the needed packakes and dependecies. 
- NB: the node_modules folder it to be deleted before deployment since it will be recreated with the 'npm install' command on the server. Or use the .gitignore to add things you don't want pushed to github if you're deploying the server though github.
- read nodejs documentation for further info