import { addTransformations } from '@extractus/article-extractor'


addTransformations({
  patterns: [
    /([\w]+.)?abc.tld\/*/
  ],
  pre: (document) => {
    // do something with document
    return document
  },
  post: (document) => {
    // do something with document
    return document
  }
})

addTransformations([
  {
    patterns: [
      /([\w]+.)?def.tld\/*/
    ],
    pre: (document) => {
      // do something with document
      return document
    },
    post: (document) => {
      // do something with document
      return document
    }
  },
  {
    patterns: [
      /([\w]+.)?xyz.tld\/*/
    ],
    pre: (document) => {
      // do something with document
      return document
    },
    post: (document) => {
      // do something with document
      return document
    }
  }
])