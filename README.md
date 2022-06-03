# LibLCU.ts
**LibLCU.ts** communicates with the League Client server, pretending to be the UX part of the client. \
It's implemented in TypeScript and isn't close to completion at the moment.

## Info
Some things *do* work, and there is a lot to learn, but currently it's not instantly usable like a regular NPM library. \
For now, if you really want to use it, take a look at the *Client* class and explore from there.

## Why?
While this project is mostly made for fun, it has some practical use too. \
The original client UI / UX (**LeagueClientUx**) utilizes *Chromium Embedded Framework*, running a large Chromium instance for just the UI. 
This takes up system resources, while the server (**LeagueClient**) is actually rather efficient. \
LibLCU.ts aims to be a replacement / companion for the UI, so while you can do everything the UI does (with your own code) you can do it more efficiently! 

## Notes
The server portion of the LCU is the executable called LeagueClient. Client executables are usually called LeagueClientUx or LeagueClientUxRender.
