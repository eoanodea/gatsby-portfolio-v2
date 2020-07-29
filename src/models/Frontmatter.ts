interface Frontmatter {
  date: string;
  path: string;
  title: string;
  categories: string[];
  tags: string[];
  excerpt: string;
  backgroundColor: string;
  pointOfInterest: number;
  featureImg: {
    publicURL: string;
  };
}

export default Frontmatter;
