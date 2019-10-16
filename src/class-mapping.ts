export const classMapping: Record<string, Function> = {
  Gist: (github: any) => require('./gist/gist').default(github),
  Issue: (github: any) => require('./issue/issue').default(github),
  Markdown: (github: any) => require('./markdown/markdown').default(github),
  Organization: (github: any) => require('./organization/organization').default(github),
  Project: (github: any) => require('./project/project').default(github),
  RateLimit: (github: any) => require('./rate-limit/rate-limit').default(github),
  Repository: (github: any) => require('./repository/repository').default(github),
  Search: (github: any) => require('./search/search').default(github),
};
