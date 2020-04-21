var asset = require('assert');
var templeteEngine = require('../simple_templating_engine.js');

describe('templateEngine#populate()', function() {

  context('populate template with default matcher', function() {
    let template, handler;
    beforeEach(function() {
      template = "Hello, <% change_me %>";
      handler = function(key) { return { '<% change_me %>': 'World' } }
    });

    it('should replace the placeholder with the handler', async function() {
      let populated = await templeteEngine.populate(template, handler);
      asset.equal(populated, 'Hello, World');
    });
  });

});