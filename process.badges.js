const fs = require('fs-extra');
const { makeBadge } = require('badge-maker');
const packageJson = require('./package.json');

const projectVersion = packageJson.version;

let coverageJson;

try {
  coverageJson = require('./__tests__/coverage/coverage-summary.json');
} catch (e) {
  coverageJson = false;
}

  try {
    console.log('Generating Badges for this branch...');
    const projectVersionBadge = makeBadge({
      label: 'version',
      message: `v${projectVersion}`,
      color: 'f82e52',
    });
    fs.outputFileSync('./badges/project-version.svg', projectVersionBadge);
    let percentage = 'unknown';
    let color = 'lightgrey';
    if (coverageJson) {
      const { lines } = coverageJson.total;
      const average = lines.pct;
      color = (average >= 80) ? 'green' : 'red';
      percentage = `${average}%`;
    }
    const coverageBadge = makeBadge({
      label: 'coverage',
      color,
      message: percentage,
    });
    fs.outputFileSync('./badges/coverage.svg', coverageBadge);
    console.log('Badges generated successfully!');
  } catch (e) {
    console.error(e);
  }
