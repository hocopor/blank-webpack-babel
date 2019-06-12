/*

  const modals = findComponents("modal");

*/

const componentSelector = "data-component";
const roleSelector = "data-role";

const findByAttribute = function({ attribute, value, scope, eager = true }) {
  const params = [attribute, value].filter(e => e);
  const selector = `[${params.join("=")}]`;
  const f = `querySelector${eager ? "All" : ""}`;
  const result = (scope || document)[f](selector);
  return result;
};

export function find(selector, scope) {
  return (scope || document).querySelector(selector);
}

export function findAll(selector, scope) {
  return (scope || document).querySelectorAll(selector);
}

export function findComponents(name, scope) {
  return findByAttribute({
    attribute: componentSelector,
    name,
    scope,
    eager: true
  });
}

export function findComponent(name, scope) {
  return findByAttribute({
    attribute: componentSelector,
    name,
    scope,
    eager: false
  });
}

export function findRoles(name, scope) {
  return findByAttribute({
    attribute: roleSelector,
    name,
    scope,
    eager: true
  });
}

export function findRole(name, scope) {
  return findByAttribute({
    attribute: roleSelector,
    name,
    scope,
    eager: false
  });
}
