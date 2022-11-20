# buat folder kosong

# buat projek baru
  npm init
# ubah versi node
  nvm use v16.18.1

# install dependensi
  npm install express mysqlw sequelize jsonwebtoken dotenv bcrypt cookie-parser cors

# tambahkan di file package.json parameter
  "type":"module"

# tambahkan file index.js di dalam folder backend

# install nodemon
  npm install -g nodemon
  nodemon --version

# jalankan project
  nodemon index

# jalankan mysql
  sudo service mysql start
  https://www.tutorialrepublic.com/faq/how-to-start-stop-mysql-server-on-ubuntu.php

# buat database
  create database auth_db;

# buat folder config di backend
  dan buat file Database.js

# install mysql
  jika, Error: Please install mysql2 package manually
  npm install mysql2 --save

# buat model dan file UserModels.js

# buat controller dan file Users.js

# buat route dan file index.js

====================================================
# ReactJs
# membuat project baru
  npx create-react-app frontend

  out:
          triyas@triyas-ThinkPad-T420:~/data/Project/BelajarNodeJs/jwt-auth$ npx create-react-app frontend
          Need to install the following packages:
            create-react-app@5.0.1
          Ok to proceed? (y) y
          npm WARN deprecated tar@2.2.2: This version of tar is no longer supported, and will not receive security updates. Please upgrade asap.

          Creating a new React app in /home/triyas/data/Project/BelajarNodeJs/jwt-auth/frontend.

          Installing packages. This might take a couple of minutes.
          Installing react, react-dom, and react-scripts with cra-template...


          added 1394 packages in 2m

          212 packages are looking for funding
            run `npm fund` for details

          Initialized a git repository.

          Installing template dependencies using npm...

          added 72 packages in 11s

          225 packages are looking for funding
            run `npm fund` for details
          Removing template package using npm...


          removed 1 package, and audited 1466 packages in 4s

          225 packages are looking for funding
            run `npm fund` for details

          6 high severity vulnerabilities

          To address all issues (including breaking changes), run:
            npm audit fix --force

          Run `npm audit` for details.

          Created git commit.

          Success! Created frontend at /home/triyas/data/Project/BelajarNodeJs/jwt-auth/frontend
          Inside that directory, you can run several commands:

            npm start
              Starts the development server.

            npm run build
              Bundles the app into static files for production.

            npm test
              Starts the test runner.

            npm run eject
              Removes this tool and copies build dependencies, configuration files
              and scripts into the app directory. If you do this, you can’t go back!

          We suggest that you begin by typing:

            cd frontend
            npm start

          Happy hacking!


# masuk ke folder frontend
  cd frontend

  dan install dependensi
  npm instal react-router-dom axios bulma jwt-decode

  react-router-dom = membutuhkan router
  axios = memudahkan berinteraksi dengan API
  bulma = css style
  jwt-decode = untuk mendecode jwt token

# pastikan project berjalan dengan baik
 npm start

 dan kunjungi http://localhost:3000
====================================================================================================
error point
====================================================================================================

 # error : Switch' is not exported from 'react-router-dom'
 answer:
 You are using react-router-dom version 6, which replaced Switch with the Routes component
 https://stackoverflow.com/questions/69843615/switch-is-not-exported-from-react-router-dom
   import {
     BrowserRouter,
     Routes, // instead of "Switch"
     Route,
   } from "react-router-dom";

   // ...

       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Home />} />
         </Routes>
       </BrowserRouter>



 # Error: Render multiple elements in React Router v6.+
 Answer
 <Route exact path="/" element={<><Header/><Home/></>}/>
 https://stackoverflow.com/questions/69968264/render-multiple-elements-in-react-router-v6




 # Error: ERROR in ./src/component/Register.js 223:10-20
        export 'useHistory' (imported as 'useHistory') was not found in 'react-router-dom' (possible exports:
 Answer:
 In react-router-dom v6 useHistory() is replaced by useNavigate().
 You can use:
     import { useNavigate } from 'react-router-dom';
     const navigate = useNavigate();
     navigate('/home');
  https://stackoverflow.com/questions/62861269/attempted-import-error-usehistory-is-not-exported-from-react-router-dom


 # Error: Node.JS: Getting error : [nodemon] Internal watch failed: watch ENOSPC

 Answer:
 It appears that my max ports weren't configured correctly. I ran the following code and it worked...
 echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p


 What this command does is to increase the number of watches allowed for a single user. By the default the number can be low (8192 for example). When nodemon tries to watch large numbers of directories for changes it has to create several watches, which can surpass that limit.
 You could also solve this problem by:

 sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p

 https://stackoverflow.com/questions/34662574/node-js-getting-error-nodemon-internal-watch-failed-watch-enospc


 sumber: https://www.youtube.com/watch?v=Ll_71n60vAM&list=WL&index=3&t=2258s

