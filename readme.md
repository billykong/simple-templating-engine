[![Build Status](https://travis-ci.org/billykong/simple-templating-engine.svg?branch=master)](https://travis-ci.org/billykong/simple-templating-engine)
[![Coverage Status](https://coveralls.io/repos/github/billykong/simple-templating-engine/badge.svg?branch=master)](https://coveralls.io/github/billykong/simple-templating-engine?branch=master)
[![npm version](https://img.shields.io/npm/v/simple-template-engine)](https://img.shields.io/npm/v/simple-template-engine)
[![Run on Repl.it](https://repl.it/badge/github/billykong/simple-templating-engine)](https://repl.it/github/billykong/simple-templating-engine)

# Simple Template Engine

## Usage
```JavaScript
var templeteEngine = require('./simple_templating_engine.js');
var template = "Hello, <% change_me %>";


var handler = function(key) { return { '<% change_me %>': 'World' } };
templeteEngine.populate(template, handler).then(populated => {
    console.log(populated);
});


handler = function(key) { return { '<% change_me %>': 'Async World' } };

(async function() {
  let populated = await templeteEngine.populate(template, handler);
  console.log(populated);
})();

```

