# United Auto Spa

This is the repository for the [United Auto Spa website](http://unitedautospa.com). It features a simple static node.js server written in Express and also a static directory containing the HTML, JavaScript, and CSS files themselves.

### Set up

Clone the git repo and run `npm install` to install dependencies.

### Project Structure

`package.json` - the settings and metadata for Node

`server.js` - the static HTTP server

`static/` - the static directory
* `assets/` - images and other resources
* `css/` - stylesheets
* `js/` - scripts


`views` - webpages
* `index.ejs` - the main webpage

### Running the project

Run `npm start` to start the server.

You will need to optionally specify `MAPS_API_KEY` as an environment variable if you would like to add Google Maps API
keys.


