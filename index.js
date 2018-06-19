async function populate(template, handler, options={}) {
  [template, keys] = parse(template, options);
  let data = await fetch(keys, handler, options);
  let populated = merge(template, data, options);
  return populated;
}

function parse(template, options={}) {
  let keys = [];
  let re = options.matcher || /"<%([^%>]+)?%>"/g;
  let match;
  while(match = re.exec(template)) {
    keys.push(match[1].trim())
  }
  return [template, keys];
};

async function fetch(keys, handler, options={}) {
  return await handler(keys);
};

function merge(template, data, options={}) {
  console.log("\nPopulating...")
  Object.keys(data).forEach(key => {
    let re = /"<%([^%>]+)?%>"/g;
    let match;
    while(match = re.exec(template)) {
      console.log(match[0] + ": " + JSON.stringify(data[key]))
      template = template.replace(match[0], JSON.stringify(data[key]))
    }
  });
  console.log("\nFinishing...");
  console.log(template);
  return template;
}

module.exports = {
  populate: populate,
  parse: parse,
  fetch: fetch,
  merge: merge,
};