import { createClient } from "contentful";

const createContentfulClient = createClient({
  space: process.env.REACT_APP_SPACE_ID,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
});

export default createContentfulClient;
