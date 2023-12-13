export const allTags = {
  Blog() {
    return Tag.byIdentifier("xxx")!; // tagNamed('Blog')
  },
} as const;

export const allProjects = {
  Planned() {
    return Project.byIdentifier("xxx")!; // projectNamed('Planned')
  },
};
