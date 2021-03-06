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
    keys.push(match[0]); // this line is never executed
  }
  return [template, keys];
};

async function fetch(keys, handler, options={}) {
  return await handler(keys);
};

function merge(template, data, options={}) {
  // console.log(data)
  console.log("\nPopulating...")
  Object.keys(data).forEach(key => {
    while(template.includes(key)) {
      if (typeof data[key] === 'string') {
        console.log(`- mapping ${key} to ${data[key]}`);
        template = template.replace(key, data[key]);
      } else {
        console.log(`- mapping ${key} to ${JSON.stringify(data[key])}`);
        template = template.replace(key, JSON.stringify(data[key]));
      }
    }
  });
  console.log("\nFinishing...");
  return template;
}

module.exports = {
  populate: populate,
  parse: parse,
  fetch: fetch,
  merge: merge,
};