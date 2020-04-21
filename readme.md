[![Build Status](https://travis-ci.org/billykong/simple-templating-engine.svg?branch=master)](https://travis-ci.org/billykong/simple-templating-engine)
[![Coverage Status](https://coveralls.io/repos/github/billykong/simple-templating-engine/badge.svg?branch=master)](https://coveralls.io/github/billykong/simple-templating-engine?branch=master)


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

