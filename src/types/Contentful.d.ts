declare namespace Contentful {
  interface CallToAction {
    title: string;
    text: string;
  }

  interface Image {
    fields: {
      file: {
        title: string;
        url: string;
        details: {
          image: {
            width: string;
            height: string;
          };
        };
      };
    };
  }

  interface Hero {
    header: string;
    internalName: string;
    verticalTitle: string;
    shortCopy: string;
    image: Image;
  }

  interface StoryItem {
    fields: {
      internalName: string;
      introHeader: string;
      header: string;
      copy: string;
    };
  }

  interface Story {
    title: string;
    internalName: string;
    tagLine: string;
    intro: string;
    backgroundImage: Image;
    stories: StoryItem[];
  }

  interface AccordionItem {
    fields: {
      question: string;
      answer: string;
    };
  }

  interface Accordion {
    heading: string;
    subHeading: string;
    faQs: AccordionItem[];
  }

  interface EmailCallToAction {
    title: string;
    subtitle?: string;
    description?: string;
    ctaTitle?: string;
    ctaLink?: string;
    image?: Image;
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
