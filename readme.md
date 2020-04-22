[![Build Status](https://travis-ci.org/billykong/simple-templating-engine.svg?branch=master)](https://travis-ci.org/billykong/simple-templating-engine)
[![Coverage Status](https://coveralls.io/repos/github/billykong/simple-templating-engine/badge.svg?branch=master)](https://coveralls.io/github/billykong/simple-templating-engine?branch=master)
[![npm version](https://img.shields.io/npm/v/simple-template-engine)](https://img.shields.io/npm/v/simple-template-engine)
[![Run on Repl.it](https://repl.it/badge/github/billykong/simple-templating-engine)](https://repl.it/github/billykong/simple-templating-engine)

# Simple Template Engine

## Usage

```JavaScript
var templeteEngine = require('./simple_templating_engine.js');
var template = "Hello, <% change_me %>";


var handlerWorld = function(key) { return { '<% change_me %>': 'World' } };
templeteEngine.populate(template, handlerWorld).then(populated => {
    console.log(populated); // "Hello, World"
});


var handlerAsyncWorld = function(key) { return { '<% change_me %>': 'Async World' } };
(async function() {
  let populated = await templeteEngine.populate(template, handlerAsyncWorld);
  console.log(populated); // Hello, Async World
})();

```

It also work with JSON template:
```JavaScript
var templateJSON = `{ "root": <% change_me %> }`;

var handlerJSON = function(key) { 
  return { 
    '<% change_me %>': { 
      'key1': 'value1',
      'key2': 'value2'
    } 
  } 
};

templeteEngine.populate(templateJSON, handlerJSON).then(populated => {
    console.log(JSON.parse(populated)); 
    // { "root": {"key1":"value1","key2":"value2"} }
});
```

The handler can be an async function when we need to call remote APIs to get data:
```JavaScript
var handlerJSON = async function(key) { 
  return await {
    '<% change_me %>': { 
      'key1': 'value1',
      'key2': 'value2'
    } 
  } 
};
templeteEngine.populate(templateJSON, handlerJSON).then(populated => {
    console.log(populated); 
});
```
