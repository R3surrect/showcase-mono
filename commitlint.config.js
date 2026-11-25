import pnpmScopes from '@commitlint/config-pnpm-scopes';
import fs from 'node:fs';
import path from 'node:path';

const getDirectoryNames = (dirPath) => {
  const fullPath = path.resolve(process.cwd(), dirPath);
  if (!fs.existsSync(fullPath)) return [];

  return fs
    .readdirSync(fullPath, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name.toLowerCase());
}

export default {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'body-max-line-length': [0, 'always'],
    'scope-enum': async (ctx) => {
      const [, , pnpmPackages] = await pnpmScopes.rules['scope-enum'](ctx);
      const componentScopes = getDirectoryNames('packages/frontend/src/components/entities');
      const globalScopes = ['mono', 'root', 'release', 'ci', 'cd', 'deps', 'db', 'infra'];
      const frontendScopes = [
        'toast', 'ui', 'queries', 'scheduler', 'projects', 'tags',
        'notes', 'tasks', 'lib',
      ];

      return [2, 'always', [
        ...pnpmPackages,
        ...globalScopes,
        ...frontendScopes,
        ...componentScopes
      ]];
    },
  },
};
