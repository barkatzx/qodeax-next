import { groq } from "next-sanity";

export const projectDetailQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    body,
    mainImage {
      asset-> {
        url
      }
    },
    features,
    categories,
    technologies,
    liveLink,
    clientRepo,
    serverRepo,
    slug {
      current
    }
  }
`;
