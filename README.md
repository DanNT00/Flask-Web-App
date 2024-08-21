# Flask Web App

This is a simple Flask Web App using Python, ReactJS/NextJS.

It is my actually first time working with Flask and ReactJS/NextJS so I had to scrape through the internet to make this web app.

I approached this project by watching a Beginner's Guide to Flask on YouTube. However, the way they implemented it does not include working with ReactJS. So, I had to search on how to integrate these tech stacks. I also had to search about the basics of ReactJS.

Be sure to have NodeJS and Git bash installed. You can get it here:
https://nodejs.org/en/download/package-manager
https://git-scm.com/downloads

Be sure to check requirements.txt for the list of dependencies needed to run this app.

Steps to run the application:

1. Create a New Folder

2. Open the root folder with VS Code.

3. Open 2 Terminals. One for Powershell, one for Git bash.

4. On Powershell, type in order:
   A) npx create-next-app@latest my-app ### This will install react. ###
   
   √ TypeScript? ... No
   √ ESLint? ... No
   √ CSS? ... No
   √`src/` directory? ... No
   √ App Router? (recommended) ... Yes
   √ customize the default import alias (@/\*)? ... No
   B) cd my-app
   C) npm install axios
   D) npm install bootstrap
   E) Create a folder called "pages" on /my-app/app/
   F) Delete the file "page.js"
   D) npm run dev

6. On Bash, type:
   A) py -m venv venv - Windows ||| python3 -m venv venv - Linux/Mac
   B) source venv/Scripts/activate - For Windows ||| source venv/bin/activate - For Mac/Linux
   C) pip install Flask - Windows ||| pip3 install Flask - Linux/Mac
   D) pip install Flask-cors
   E) pip install Flask-SQLAlchemy
   E) py app.py

7. Open your web browser and go to localhost:3000 (or depending on the port when you ran npm run dev)

8. Type the login credentials:
   user123
   pass123
