# AJGA Web Scraper

An easy to use simple web scraper api for the **[AJGA](https://www.ajga.org/)** (American Junior Golf Association) website.
This api provides commands to gather various types of information available on their website. The api is completely free
and can be hosted locally.

# Commands
List of all available commands and parameters they accept.

## /rankings/boys/:pages
:pages defines the number of ranking pages the api will load from the website. Each page contains 50 entries. Loading many pages may take a while.
**Example: `<URL>/rankings/boys/3`**

## /rankings/girls/:pages
:pages defines the number of ranking pages the api will load from the website. Each page contains 50 entries. Loading many pages may take a while.
**Example: `<URL>/rankings/girls/3`**

# Technologies
The api uses node and express.js to handle and respond to requests. The web scraping is done on the server using Puppeteer. Written in es6 module javascript.

# Notes
The api relies on the way the website is structured on June 2023. Breaking changes can occur if the website is updated. The api will try to be updated as soon as these issues are made aware. However, please consider contributing to patch breaking changes.

## Credits
Created by Xezo. Thank you for viewing, downloading, or contributing to AJGA Web Scraper api.