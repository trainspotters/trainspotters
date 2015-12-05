const obj = { ['fooo']: `${1 + 2}bar` };
console.log({...obj, hello: 'world'});
