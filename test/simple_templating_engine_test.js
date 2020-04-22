var assert = require('assert');
var _ = require('lodash');
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
      assert.equal(populated, 'Hello, World');
    });
  });

  context('populate JSON template with default matcher', function() {
    let template, handler;
    beforeEach(function() {
      template= `{ "root": <% change_me %> }`;
      handler = function(key) { 
        return { 
          '<% change_me %>': { 
            'key1': 'value1',
            'key2': 'value2'
          }
        } 
      };
    });

    it('should replace the placeholder with the handler', async function() {
      let populated = await templeteEngine.populate(template, handler);
      assert(_.isEqual(JSON.parse(populated), { root: { key1: 'value1', key2: 'value2' }}));
    });
  });

  context('with async handler function', function() {
    let template, handler;
    beforeEach(function() {
      template= `{ "root": <% change_me %> }`;
      handler = async function(key) { 
        return await { 
          '<% change_me %>': { 
            'key1': 'value1',
            'key2': 'value2'
          }
        } 
      };
    });

    it('should replace the placeholder with the async handler', async function() {
      let populated = await templeteEngine.populate(template, handler);
      assert(_.isEqual(JSON.parse(populated), { root: { key1: 'value1', key2: 'value2' }}));
    });
  });

  context('with custom matcher regex in options', function() {
    let template, options, handler;
    beforeEach(function() {
      template = "Hello, {_ change_me _}";
      options = { matcher: /"{_([^%>]+)?_}"/g}
      handler = function(key) { return { '{_ change_me _}': 'World' } }
    });

    it('should replace the placeholder with the async handler', async function() {
      let populated = await templeteEngine.populate(template, handler, options);
      assert.equal(populated, 'Hello, World');
    });
  });
});