# Flask Web App

This is a simple Flask Web App using Python, ReactJS/NextJS.

It is my actually first time working with Flask and ReactJS/NextJS so I had to scrape through the internet to make this web app.

I approached this project by watching a Beginner's Guide to Flask on YouTube. However, the way they implemented it does not include working with ReactJS. So, I had to search on how to integrate these tech stacks. I also had to search about the basics of ReactJS.

Be sure to have NodeJS and Git bash installed. You can get it here:

https://nodejs.org/en/download/package-manager

https://git-scm.com/downloads

Be sure to check requirements.txt for the list of dependencies needed to run this app.

Steps to run the application:

1.  Create a folder.

2.  Clone the repo (Not inside the folder you just created. Clone it somewhere you want.).

    Example:

    /Documents/New Folder/

    /Documents/Flask-Web-App/

3.  Open the New Folder(/Documents/New Folder/) with VS Code.

4.  Open 2 Terminals. One for Powershell, one for Git bash.

5.  On Powershell Terminal, type:

    A) npx create-next-app@latest my-app ### This will install react dependencies. ###

          √ TypeScript? ... No

          √ ESLint? ... No

          √ CSS? ... No

          √`src/` directory? ... No

          √ App Router? (recommended) ... Yes

          √ customize the default import alias (@/\*)? ... No

    B) cd my-app

    C) npm install axios

    D) npm install bootstrap

6.  Delete the "app" folder from (/Documents/New Folder/my-app/)

7.  Copy the folders "pages" and "styles" from the cloned repo and paste it into (/Documents/New Folder/my-app/)

8.  On Bash Terminal, type:

    A) py -m venv venv --- For Windows ||| python3 -m venv venv --- For Linux/Mac

    B) source venv/Scripts/activate - For Windows ||| source venv/bin/activate - For Mac/Linux

    C) pip install Flask Flask-cors Flask-SQLAlchemy --- For Windows ||| pip3 install Flask Flask Flask-cors Flask-SQLAlchemy --- For Linux/Mac

9.  Copy the folder "instance" and file "app.py" from the cloned repo and paste it inside (/Documents/New Folder/)

10. Type on your Powershell terminal: npm run dev

11. Type on your Bash terminal: py app.py

12. Open your web browser and go to localhost:3000 (or depending on the local port when you ran npm run dev)

13. Type the login credentials:

    user123

    pass123
