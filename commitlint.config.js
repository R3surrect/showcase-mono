import pnpmScopes from '@commitlint/config-pnpm-scopes';

export default {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'body-max-line-length': [0, 'always'],
    'scope-enum': async (ctx) => {
      const [, , pnpmPackages] = await pnpmScopes.rules['scope-enum'](ctx);

      const globalScopes = ['mono', 'root', 'release', 'ci', 'cd', 'deps', 'db', 'infra'];
      const frontendScopes = ['toast', 'ui', 'queries', 'scheduler', 'projects'];

      return [2, 'always', [...pnpmPackages, ...globalScopes, ...frontendScopes]];
    },
  },
};
