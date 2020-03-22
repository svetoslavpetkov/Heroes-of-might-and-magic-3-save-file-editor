# Electron.js and React.js starter with TypeScript

This repository contains the basic setup with very minimum requirements for getting started with Electron.js and React.js using TypeScript.
The whole idea behind this is to give a starting point for someone who wants to develop desktop application with Electron.js and want to use Typescript + React.

## Subscribe to channel ❤️

You watch full video explaining how this repository is built and how you can easily build System Tray based apps with it.

[![Electron.js, React.js and TypeScript based Desktop application boilerplate](https://img.youtube.com/vi/kvSN8vAwx0k/0.jpg)](https://www.youtube.com/watch?v=kvSN8vAwx0k)

## Getting Started

The repository itself built in a way that there is 2 different apps Electron.js and React.js, so that you can develop your app UI inside a browser
then compile that with Electron to see the final desktop app result.

```bash
~# cd <project directory>
~# yarn # OR npm install

# Starting Web app
~# yarn start:web

# Starting Desktop app
~# yarn build:web
~# yarn build:desktop
~# yarn start:desktop
```

You can make any command combination out of what exists inside a package.json, but for my use-case this was working pretty fine.

## System Tray UI

There is 2 different UI routes for React.js, and routing made over `#` (hash) for supporting Electron.js internal routing.
The configuration was done already inside `trayWindow.ts` so that whenever you will click system tray icon (when desktop app is running),
it will open a route `#/tray` which represents a file `src/apps/Tray/index.tsx`
