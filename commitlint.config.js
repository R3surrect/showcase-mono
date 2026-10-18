import pnpmScopes from '@commitlint/config-pnpm-scopes';

export default {
  extends: ['@commitlint/config-conventional', '@commitlint/config-pnpm-scopes'],
  
  rules: {
    'body-max-line-length': [0, 'always'],
    'scope-enum': async (ctx) => {
      const [, , pnpmPackages] = await pnpmScopes.rules['scope-enum'](ctx);
      
      const globalScopes = ['mono', 'root', 'release', 'ci', 'cd', 'deps', 'db', 'infra'];
      
      return [2, 'always', [...pnpmPackages, ...globalScopes]];
    },
  },
};
