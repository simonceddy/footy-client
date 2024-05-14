import ucfirst from './ucfirst';

export { default as serverUrl } from './serverUrl';

export function ucfirstAll(string = '') {
  return string.split(' ').map(ucfirst).join(' ');
}

export function renderTeamName(team = {}) {
  return `${ucfirstAll(team?.location)} ${ucfirstAll(team?.name)}`;
}

export function renderTeamFromContainer(teamContainer = {}) {
  return renderTeamName(teamContainer.team);
}

export { default as ucfirst } from './ucfirst';

export function totalScore({ goals = 0, behinds = 0 }) {
  return behinds + (goals * 6);
}
