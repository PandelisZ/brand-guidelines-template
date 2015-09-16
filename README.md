# Brand Guidelines template
1. [About](#)
2. [Installation Instructions](#)
3. [Structure / Organization](#)
4. [How to Update](#)
5. [Requirements](#)
6. [How to deliver](#)

# About
This is the template for a brand guidelines document.  Brand guidelines are the way we deliver all brand projects to the client. [View a demo](http://ripeserver.com/brand/usrbc/) of a completed brand guidelines page.  

# Installation Instructions

### Step 1. Install Dependencies
Node 
Transmit 
Sublime Text 3 w/ Jade + package installer

### Step 2. Setup Template
1. Github download
2. Save to directory 
3. Open terminal, navigate and "sudo npm install"
4. Run "gulp", you'll see it working!

# Structure / Organization
You only need to edit the "src" folder. This stands for "source".  The structure is:
```
bin/
brand-files/
guidelines/
```
There are the folders: 
- *bin* – mostly ignore this, unless you're changing the guidelines design & functionality
- *brand-files* – this is where all the deliverables are stored - logos, font files, packages, email signatures, etc
- *guidelines* – this is the content of the guidelines page.  This allows you to write information about the deliverables and add photos, sample content, etc

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




 

