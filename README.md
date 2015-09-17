# Brand Guidelines template
1. [About](#about)
2. [Start a new brand guidelines](#start-a-new-brand-guidelines)
3. [First time set up](#first-time-set-up-instructions)
4. [Structure / Organization](#structure--organization)
5. [How to Update](#)
6. [Requirements](#)
7. [How to deliver](#)

# About
This is the template for a brand guidelines document.  Brand guidelines are the way we deliver all brand projects to the client. [View a demo](http://ripeserver.com/brand/usrbc/) of a completed brand guidelines page.  

# Start a new brand guidelines:
*If this is your first time creating a brand guidelines doc, please see 'First Time set up instructions'* 


##### Step 0 – Navigate to your working directory
 Open iTerm and navigate to the directory where you want to store the guidelines, usually like this 
  ``` 
  cd /htdocs/brand-guidelines
  ```
##### Step 1 – Clone this repository
   ```
   git clone https://github.com/ripestudios/brand-guidelines-template.git client-name-here
   ```
##### Step 2 – Install dependencies
   ```
   sudo npm install
   ```
##### Step 3 – Stand up the project
   ```
   gulp
   ```
   
# First time set-up instructions 

#### Step 1 – Install the following tools
- [iTerm](https://www.iterm2.com/)
- [Sublime Text 3](http://www.sublimetext.com/3)
- [Sublime Text Package Control](https://packagecontrol.io/installation)
- [Node](https://nodejs.org/en/)

#### Step 2 – Install JADE syntax highlighting
Use the Sublime Text package control to add JADE:
- Open Sublime Text
- Call package manager: `cmd + shift + p`
- Choose `Install Package`
- Search for `Jade`.  Click to install
- Confirm by saving a new document as a `.jade` file and check that the bottom right corner says "Jade" and not HTML or Plain Text

#### Step 3 – Create a folder to store all brand guidlines
- Navigate to your harddrive and create a folder at your root directory.  On a Mac, open the Finder and select *Go -> Home* from your system tray menu or press `Sht + Cmd + H`
- Create a folder `htdocs` in your Macintosh HD (if it doesnt exist already)
- Within `htdocs` create a folder called `brand-guidelines`

Now you're ready to go!! Proceed to the [Start a new guidelines] section

# Structure / Organization
You only need to edit the "build" folder. This stands for "source".  The structure is:
```
app/
brand-files/
guidelines/
index.jade
```
There are the folders: 
- *app* – mostly ignore this, unless you're changing the guidelines design & functionality
- *brand-files* – this is where all the deliverables are stored - logos, font files, packages, email signatures, etc
- *guidelines* – this is the content of the guidelines page.  This allows you to write information about the deliverables and add photos, sample content, etc
- *index.jade* – this is where you set the client branding variables, change any navigation, add/remove/change the order of page sections

## Create an Email signautre
1. Upload logo to a permanent image host ([imgur](imgur.com) or [postimg.org](postimg.org))
   - Make sure image is saved @ 2x
   - Record the dimensions, (WxH) you'll need to add it later
   - Make sure the image file is small (5kb or less ideally)
2. Find `variables.jade` in the `brand-files/email-signature` folder
3. Add default name (usually the project decision maker), basic branding info, link the image
4. Save & you're done!

## Add client name & branding details
1. Open `src` folder in Sublime
2. Edit `index.jade` and update all the "organizationDetails" variables

## Add brand files

## Update guidelines

#Requirements
At the bare mimumum all Brand Guidelines must have:
- Logo
- Logo Configurations
- Color Palette
- Typography
- Email Signature

#How to deliver
1. Build the project for distrubtion:
   ```gulp build```
2. Take the generated directory named `dist` and upload it to Ripeserver via FTP.  The structure should be: http://ripeserver.com/brand/client-name




 

