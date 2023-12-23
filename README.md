# ExtensionKit Starter Template

Scripts version: 1.0.0
Template last updated: January 30, 2023

## Overview

This template comes fully loaded with:

- Manifest V3 support
- React 18
- Webpack 5
- Jest
- ESLint
- TypeScript support
- And more!

## Developing with the template

1. Run `npm install` in the folder to install dependencies
2. Run `npm run dev` to start the development server
3. Navigate to `chrome://extensions` in your browser
4. Ensure `Developer mode` is `enabled` (top right)
5. Click `Load unpacked` in the top left
6. Select the `/build` folder in this directory

After completing the above steps, you should see the developer, unpacked version appear in your extension list as well as the extension icon appear in your browser bar alongside the other extensions you may have installed.

After starting the dev server via `npm run dev`, changes will be automatically rebuilt to `/build` via webpack and the unpacked Chrome extension will automatically be refreshed for you behind the scenes, meaning you don't need to press the refresh button on `chrome://extensions` after every change.

### Styling

By default the template supports importing CSS files and modules in your components. Additional styling mechanisms such as Styled Components would need to be added if you want to use them.

### Manifest

The manifest file is located in the root of the project. It will automatically be copied to the bundle on every build so there is no need to move it.

### Background scripts

To work with background scripts, create a `background` folder in the root of the project (not in the `/src` folder) with an `index.js` file. Any other files in the `/background` folder that you import into the `index.js` will automatically get bundled for you to create a final `background.js` file that you can reference in the manifest like the following:

```json
"background": {
  "service_worker": "background.js"
}
```

### Extension icons

All extension icons live in the `/icons` folder in the root of the project. Any additional icon sizes you add in here will be copied to the final build and can be referenced relative to an `icons` folder in the manifest like the following:

```json
"icons": {
  "128": "icons/icon.png"
},
```

### Environment variables

There are 3 different environment variables files you can leverage:

- `.env`: These variables apply to both development and production builds
- `.env.development`: These variables apply to the development builds
- `.env.production`: These variables apply to the production builds

To add an environment variable simply create / edit any of the above files and add your variable like the following:

```
MY_VAR=123
```

And to reference it in your code simply do `process.env.MY_VAR`.

Note: Environment variables are NOT ignored by default in the `.gitignore` but if you wish to have them ignored (good practice), add the following to it:

```
.env
.env.development
.env.production
```

### Additional configuration

ESLint is configured to use `eslint-config-react-app` by default, which is the ESLint config that `create-react-app` uses. To make changes to the ESLint config, edit `.eslintrc` in the project root.

Prettier is configured with some common defaults. You can change those defaults or add your own in `.prettierrc` in the project root.

## All available scripts

- `npm run assemble` - creates a production-ready build and zips all files needed to publish in the web store to `extension.zip`
- `npm run build` - creates a production-ready build
- `npm run dev` - starts the Webpack development server that hot refreshes changes
- `npm run format` - runs Prettier on the `/src` folder
- `npm run lint` - runs ESLint on the `/src` folder
- `npm run test` - runs the test suite via Jest

## Preparing to publish

To prepare for publish, simply run `npm run assemble` which will kick off a production-ready build step and zip all the contents to `extension.zip` in the folder root. This zip file will include all the files you need for your extension to be uploaded to the web store.

Note: if this isn't your first publish of your extension, make sure you bump up the version number in the manifest (for example, `1.0.0` to `1.0.1`), as the web store will require a new version in every update you upload.

## Using TypeScript

The scripts included with this template come with TypeScript support out-of-the-box. If you'd like to use TypeScript, simply use the TypeScript version of this template included in ExtensionKit.

If you've already started development and want to convert the current project to TypeScript, simply convert `.jsx` files to `.tsx` and `.js` files to `.ts`. Next, create a `tsconfig.json` file in the root of the project and add the following content:

```json
{
  "compilerOptions": {
    "target": "es6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "exclude": ["build", "node_modules"]
}
```

Finally, create a `react-app-env.d.ts` file in the root of the `/src` folder with the following:

```
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
  }
}
```

If you'd like a more complete type declaration file, grab the one included in the TypeScript version of this template.

## Testing

This template comes with `Jest` and `React Testing Library` out-of-the-box. To run the included `app.test.tsx` sample test, simply run `npm run test`.

The Jest config can be found in `jest.config.js` and the global setup can be found in `jest-setup.js`.

## Manifest explained

The key sections of the manifest with this template are:

### Browser Action

```
  "action": {
    "default_icon": {
      "32": "icons/icon.png"
    },
    "default_popup": "index.html",
    "default_title": "Open Popup"
  }
```

This portion of the manifest is used to define how the browser action (extension icon) should behave. In this case, when clicked it will trigger a default popup displaying the page `index.html`, which refers to the static asset in the `/build` folder that renders the React app.

### Custom Commands

```
  "commands": {
    "_execute_browser_action": {
      "suggested_key": {
        "default": "Ctrl+Shift+O",
        "mac": "MacCtrl+Shift+O"
      },
      "description": "Toggle Popup"
    }
  }
```

This portion of the manifest defines custom commands that execute the browser action mentioned above. For example, it defines `Ctrl+Shift+O` as the command that will trigger the browser action (showing the popup). This can be changed, but keep in mind, commands may conflict with other keyboard shortcuts (For example, if you set the command to `Ctrl+S`).

## Current limitations

Current limitations with the development script involve hot reloading background scripts and content scripts. Changes made to these files will still automatically rebuild, however a manual refresh is required on the extension page to see the changes reflected. This is a result of how the Chrome extension environment handles these files.


