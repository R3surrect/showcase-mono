import pnpmScopes from '@commitlint/config-pnpm-scopes';

export default {
  extends: ['@commitlint/config-conventional', '@commitlint/config-pnpm-scopes'],
  
  rules: {
    'scope-enum': async (ctx) => {
      const [, , pnpmPackages] = await pnpmScopes.rules['scope-enum'](ctx);
      
      const globalScopes = ['mono', 'root', 'release', 'ci', 'cd', 'deps'];
      
      return [2, 'always', [...pnpmPackages, ...globalScopes]];
    },
  },
};
