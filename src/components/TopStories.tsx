
const TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const ITEM_URL = (id) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
const STORY_LIMIT = 10;

async function fetchTopStoryIds() {
  const response = await fetch(TOP_STORIES_URL);
  if (!response.ok) {
    throw new Error("Unable to fetch top stories.")
  }
  return response.json()
}



function TopStories() {

}

export default TopStories;
