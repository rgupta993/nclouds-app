# Nclouds Nodejs Express App

This is node.js application with redis as a backend. Two API's are available. One POST api for adding key value to redis and one GET api for fetching value of a particular key.

## Requirements

* NodeJs
* Redis

## Pre requisites

Edit `config.js` after cloning the repo and specify host(& port) on which redis is running in the `host`(& `port`) field.

## Install

```sh
$ git clone https://github.com/rgupta993/nclouds-app.git
$ export NODE_ENV=production
$ cd nclouds-app
$ npm install
$ node app.js
```

## API's

*default service port of this NodeJs application is 4000.

POST API:

For adding key/value to redis:

Endpoint: `<machine_ip>:<service_port>/feed/`

Example:

Endpoint(POST request):<br />
`
1.1.1.1:4000/feed/
`

Body Content(application/json):  
`{
"key": "nclouds",
"value": "application"
}`

GET API:

For accessing value of a key stored in redis:

Endpoint: `<machine_ip>:<service_port>/feed?key=<key_name>`

Example:

Endpoint(GET request):<br />
`
1.1.1.1:4000/feed?key=nclouds
`

*for updating existing key, should use the post api with existing key name and new value.



More API's coming soon...
