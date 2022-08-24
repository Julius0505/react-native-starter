const COLOR = {
  red: '#EE5339',
  orange: '#F38E3A',
  yellow: '#F6D243',
  lightGreen: '#CDD649',
  green: '#5BAE50'
}

export const INDICATORS = {
  quality: {
    title: 'Informative language',
    description: `A supervised NLP model trained to rank articles along a continuum ranging from\npurely-informative (like encyclopedia entries) to pure-conjecture (like fake news or\nfan fiction). This score tends to have an inverse correlation with the level of\n"opinionatedness" the article's author exhibits in his/her writing, i.e. editorials and\nopinion pieces will generally score lower than factual news reports.`,
    maxScore: 100
  },
  biasedLanguage: {
    title: 'Neutral language',
    description: `A supervised NLP model trained on a dataset of wikipedia edits rejected for being subjective\nor exhibiting bias. The scale is inverted: a low score indicates subjectivity or bias, whereas a\nhigh score indicates a neutral tone.`,
    maxScore: 100
  },
  propagandaLikelihood: {
    title: 'Use of known propaganda techniques',
    description: `A supervised NLP model trained on the QCRI dataset of 17 known propaganda techniques\nthat are used by repressive governments and state news agencies.`,
    maxScore: 100,
    scoreToColor: (score: number) => {
      if (score > 40) {
        return undefined
      } else {
        return COLOR.red
      }
    }
  },
  affiliatedLinks: {
    title: 'Affiliate links',
    description: `The number of affiliate links on the page (i.e. links that will take the reader to the\nlanding page of an online store or commercial service, and from which the writer\nwill receive an affiliate fee or other commercial incentive). Any number other than 0\ngenerally indicates that the writer of the article has a financial interest and does not\nmerely seek to inform the reader.`,
    scoreToColor: (score: number) => {
      if (score === 100) {
        return undefined
      } else {
        return COLOR.red
      }
    }
  },
  hateSpeech: {
    title: 'Hate speech',
    description: `A supervised NLP model trained to detect prejudicial or insulting language against\na particular group, particularly on the basis of race, religion, or sexual orientation.`,
    maxScore: 100,
    scoreToColor: (score: number) => {
      if (score > 95) {
        return undefined
      } else if (score > 85) {
        return COLOR.orange
      } else {
        return COLOR.red
      }
    }
  },
  offensiveLanguage: {
    title: 'Offensive language',
    description: `A supervised NLP model trained to detect offensive language\nin all its common varieties - insults, obscenities, threats, racism, etc.`,
    maxScore: 100,
    scoreToColor: (score: number) => {
      if (score > 88) {
        return undefined
      } else if (score > 76) {
        return COLOR.orange
      } else {
        return COLOR.red
      }
    }
  },
  tone: {
    title: 'Article tone',
    description: `Calculated as the relative difference between the number of pronouns\n(I, she, you) and the number of proper nouns used in the text. A high\nvalue indicates an informal or opinionated tone.`,
    maxScore: 100
  },
  readability: {
    title: 'Language complexity',
    description: `A measurement of the complexity of the language used. This model roughly\ncorresponds to the "grade-level" ranking used by many creator tools, but has\nbeen calibrated to work better for the type of content generally found online.`,
    maxScore: 100
  },
  externalReferences: {
    title: 'External references',
    description: `The number of references to external sources of information. This number does not include\naffiliate links, ads, or links to URLs that are hosted on the same domain as the host article\n(self-referencing); only non-commercial references to OTHER sources count.`,
    scoreToColor: (score: number) => {
      if (score === 0) {
        return COLOR.red
      } else {
        return undefined
      }
    }
  },
  sourceDiversity: {
    title: 'Source diversity',
    description: `The number of UNIQUE sources used as references. Using a broad range of sources\nas references generally indicates that the article is well researched.`,
    scoreToColor: (score: number) => {
      if (score === 0) {
        return COLOR.red
      } else {
        return undefined
      }
    }
  },
  clickbait: {
    title: 'Attention-grabbing headline',
    description: `A supervised NLP model trained on a dataset of headlines that were labeled\nby human annotators as "clickbait" or "not clickbait". In this model, we have\nsoftened the criteria for what constitutes clickbait to anything that was meant\nto attract attention rather than just summarize the text that follows the\nheadline accurately.`,
    maxScore: 100,
    scoreToColor: (score: number) => {
      if (score > 50) {
        return undefined
      } else {
        return COLOR.red
      }
    }
  },
  languageStats: {
    title: 'Language stats',
    data: {
      properNouns: {
        title: 'Proper nouns',
        description: `The prevalence of proper nouns in the text, as a percentage of total words used.`
      },
      pronouns: {
        title: 'Pronouns',
        description: `The prevalence of pronouns in the text, as a percentage of total words used.`
      },
      adjectives: {
        title: 'Adjectives',
        description: `The prevalence of adjectives in the text, as a percentage of total words used.`
      },
      adverbs: {
        title: 'Adverbs',
        description: `The prevalence of adverbs in the text, as a percentage of total words used.`
      }
    },
    toString: (p: number) => `${p}%`
  },
  timeValue: {
    title: 'Time-value',
    description: `A supervised NLP model that classifies content on the scale from short-lived (e.g. breaking news) to long-living (e.g. encyclopedia entries).\nNote that content is not ranked in relation to current event,\ne.g. breaking news from 1922 and breaking news from 2022 are both "short-lived".`,
    maxScore: 100
  },
  textLanguage: {
    title: 'Language',
    description: `A supervised model trained to recognize the language in which this text is mostly likely written.`,
    maxScore: 100
  }
}
