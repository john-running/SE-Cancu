declare namespace Enhancers {
  interface Image {
    src: string;
    alt: string;
    width: string;
    height: string;
  }

  interface Benefits {
    internalName: string;
    smallIntroHeader: string;
    header: string;
    benefits: {
      internalName: string;
      header: string;
      copy: string;
    }[];
  }

  interface Hero {
    title: string;
    subtitle: string;
    buttonUrl: string;
    buttonCopy: string;
  }

  interface Story {
    internalName: string;
    title: string;
    tagLine: string;
    intro: string;
    backgroundImage: Image;
    stories: {
      internalName: string;
      introHeader: string;
      header: string;
      copy: string;
    }[];
  }

  interface SpotlightItem {
    heading: string;
    description: string;
    image: Image;
  }

  interface Article {
    slug: string;
  }
}
