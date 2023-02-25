# emotion_book

> This is a simple book script for RedM!

## REQUIREMENTS
- VORP Core
- VORP Inventory

## HOW TO USE THE SCRIPT
- Add the file to your resource file
- Add ensure 'emotion_book' to your resources.cfg
- Run the SQL or add the items manually in the database
- Add the pictures into your vorp_inventory/html/img/items folder

## HOW CAN YOU DESIGN YOUR OWN BOOK

### Pages Info:
You need to make each pages with any photo editor !
The default page size is: 691x900
All the pages config are in the file (emotion_book\html\client.js) lines 115 +
Right now by default all the pages link are stored on my discord.
You need to change all the discord link to the pages you going to use for your server.
You can store the page on a private discord channel or on any website.

### Page on Discord:
Upload the pages to discord in a private channel
Put the mouse on the picture
Right clic and copy the link

### Change the Table of contents:
The line 121 (/* 2 index */) is the table of contents.
The order of all pages is written like this: /* 1 cover */  /* 2 index */  /* 3 ad */ and /* 4 */ until the last pages...
On the line: 122 content: if you want to change the page it open when you clic on the table of contents you need to change the (Index) for the page order.
There is some info that can be change in the stylesheet.css if you change the name of the table of contents