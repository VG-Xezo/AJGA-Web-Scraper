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

## /search/boys/:firstName/:lastName
Enter the :firstName and :lastName as it appears in the ajga website. Some players may have an additional number on their name. For example, `/search/boys/jack/roberts` will return invalid, but `/search/boys/jack/roberts-1` will return valid since the player has an additional "-1" on their name. Players with more than two names will return if the name is placed into the lastName with a dash used as spaces. For example, `/search/boys/jay/leng-jr` will return valid.
**Example: `<URL>/search/boys/nicholas/prieto`**

## /search/girls/:firstName/:lastName
Enter the :firstName and :lastName as it appears in the ajga website. Some players may have an additional number on their name. For example, `/search/girls/joanne/lee` will return invalid, but `/search/girls/joanne/lee-1` will return valid since the player has an additional "-1" on their name. Players with more than two names will return if the name is placed into the lastName with a dash used as spaces. For example, `/search/girls/maria/jose-marin-negrete` will return valid.
**Example: `<URL>/search/girls/gianna/clemente`**

## /search/boys/byname/firstName/:firstName and /search/boys/byname/lastName/:lastName
Enter a :firstName or :lastName and the api will return the results that the AJGA website provides. Please note that the search is done by the AJGA website and not the api so unexpected results may occur. **Common names can create long wait times**.
**Example: `<URL>/search/boys/firstName/jack`**

## /search/girls/byname/firstName/:firstName and /search/girls/byname/lastName/:lastName
Enter a :firstName or :lastName and the api will return the results that the AJGA website provides. Please note that the search is done by the AJGA website and not the api so unexpected results may occur. **Common names can create long wait times**.
**Example: `<URL>/search/girls/firstName/alexa`**

# Technologies
The api uses node and express.js to handle and respond to requests. The web scraping is done on the server using Puppeteer. Written in es6 module javascript.

# Notes
The api relies on the way the website is structured on June 2023. Breaking changes can occur if the website is updated. The api will try to be updated as soon as these issues are made aware. However, please consider contributing to patch breaking changes.

## Credits
Created by Xezo. Thank you for viewing, using or contributing to AJGA Web Scraper api.