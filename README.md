# Securizer
![](https://icon-library.com/images/key-icon-android/key-icon-android-7.jpg)

Securizer is a encryption and decryption tool which uses AES-256 algorithm and your SSH Public Keys to encrypt ZIP files and

### Current limitations
  - Accepted file size up to 1GB
  - Maximum file count you can upload is 20 files.


Securizer uses a number of open source projects to work properly:

* [edcrypt](https://www.npmjs.com/package/edcrypt) 
* [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
* [Material-UI](https://material-ui.com/)
* [OpenSSL](https://www.openssl.org/)
* [Electron](https://www.electronjs.org/)
* [Webpack](https://webpack.js.org/)

And of course Securizer itself is open source with a [public repository](https://github.com/tyserract/securizer) on GitHub.

### Installation

Securizer requires [Node.js](https://nodejs.org/) v4+ and [Electron](https://www.electronjs.org/) + v8.x+ to run.

Install the dependencies and start either in production mode or development mode.

For development:
```sh
$ npm install
$ npm run dev
```

For production:
```sh
$ npm install
$ npm start
```

### Issues

Is this project is still under development and not stable, you may enconter with errors or bugs. If you experience any bug, issue, or error please feel free to notify me by creating new issue.

### Todos

 - Fix no file preservation when changing sections.

License
----

MIT


