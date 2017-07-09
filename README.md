# Universal React Demo

This is a demo of how to create a universal React app.

## Setup

Clone the repository and install the dependencies.

```sh
git clone https://github.com/mmiller42/universal-react-demo.git
cd universal-react-demo
npm install
```

## Commands

### `NODE_ENV=development npm run dev`

This command starts the hot-reloading dev server and listens on [port 8080](http://localhost:8080/).

### `NODE_ENV=production npm run build`

This command creates two Webpack builds, one for the client and one for the server, in the `dist` directory.

### `npm run serve`

This command starts the universal server (`dist/server.js`) and serves it on `process.env.PORT` or [port 8000](http://localhost:8000/) by default.
