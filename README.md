# My Portfolio Project

This project encapsulates every project I have made throughout my education and career, and is the source of my hard work and dedication.  
It's purpose it so get to know me better through both my work and my hobbies.  

**Project Link:** https://artvax0.github.io/portfolio/  

![Project Thumbnail](/images/portfolioThumbnail.png)

## How it's made

**Tech used:** HTML, CSS, SASS, Bootstrap  

The project is built on a main _index.html_ file, using CSS and SASS extension language. This page has a functioning navigation bar which sends you to the corresponding areas in the page, an section to get to know me, a list of all my projects and a contact form.  
Each project is integrated with a stylized card grid to provide information about each project, a thumbnail, and the technology used on said project. Each project card allows you to travel to a _pagePreview.html_ file which uses CSS to showcase a preview of the project before deciding if you want to download a .zip file of the project or enter the _index.html_ file of the project.  
This portfolio uses animation and fluid colour changes to give a pleasant experience for the user.  
The website works responsively in both mobile, laptop and desktop screens and will get rid of cluttering elements to make the website polished and clean, as well as fold the navigation bar into a clickable hamburger.  
The portfolio will be updated periodically with new projects and will change the more experience I have and the more my skills grow.

### Landing Pages

At the current moment the portfolio holds one type of project cards; landing pages.  
The decision to make landing pages in the portfolio was during my education journey and was used as a way to improve my skills in HTML, CSS, SASS, and Bootstrap, explore how I have improved over time and learn new skills on the way.  
These landing pages all have one core concept; a contact form for the user to leave their information for companies to be able to get new clients, and mobile and laptop responsivity.  
Seven of the landing pages' designs were introduced to me from our lecturers and were designed and shared to us with **Adobe xD** to learn how to coordinate with designers and work with designs shared over programs like Adobe xD.  
The mockup designs shared with me can be [found here](https://xd.adobe.com/view/cf02fdda-8ed7-4b86-9342-08c90324af44-9a51/flow/?hints=off).  
An additional original landing page was made in mind with its design being similar to a few of the mockup designs combined, around a specific theme.  

## Optimizations

1. Caching - An issue observed from one of the landing pages is that the icons were taken from a website with attribution with its original size being 5000x5000. This casused a chaching issue where the website took 2 seconds to load the image icon. This was especially visible since the element the icon was sitting on had a hover effect that caused the icon to _light up_, which caused the hover effect to seem broken for a moment. This was fixed by reducing the size of the image icon files.

## Lessons Learned

Throughout this project I learned a few lessons going forward.

1. Use _.svg_ files, or small _.png_ files for icons, but not so small to ruin its quality.
2. Wrap elements, if not all around wrappers to correctly position them.
3. When using Bootstrap, you are limited up to 5 points of margin and/or padding. This can be _"boosted"_ by padding/margin the wrapper.
4. When using Bootstrap, flex items can have _col_ classes without classifying the flex element as _row_.
