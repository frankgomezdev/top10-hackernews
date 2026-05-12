import { useQueries, useQuery, type UseQueryResult } from "@tanstack/react-query";
interface Story {
  id: number;
  by: string;
  score: number;
  title: string;
  url?: string;
  time: number;
  type: string;
}

const TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const ITEM_URL = (id: number) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
const STORY_LIMIT = 10;

async function fetchTopStoryIds() {
  const response = await fetch(TOP_STORIES_URL);
  if (!response.ok) {
    throw new Error("Unable to fetch top stories.");
  }
  return response.json();
}

async function fetchStory(id: number) {
  const response = await fetch(ITEM_URL(id));
  if (!response.ok) {
    throw new Error(`Unable to fetch story ${id}.`);
  }
  return response.json();
}

function TopStories() {
  const {
    data: storiesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["topstories"],
    queryFn: fetchTopStoryIds,
  });

  const topIds = storiesData?.slice(0, STORY_LIMIT) ?? [];

  const topStoriesQueries = useQueries<UseQueryResult<Story>[]>({
    queries: topIds.map((id: number) => ({
      queryKey: ["story", id],
      queryFn: () => fetchStory(id),
    })),
  });

  const allLoaded = topStoriesQueries.every((q) => q.isLoading === false);
  const storyError = topStoriesQueries.find((q) => q.isError);

  if (isLoading) return <p>Loading...</p>;
  if (!allLoaded) return <p>Loading...</p>;
  if (storyError) return <p>Error: {(storyError.error as Error).message}</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {topStoriesQueries.map((story) => (
        <li key={story.data?.id}>
          {story.data?.url ? (
            <a href={story.data?.url} target="_blank" rel="noopener noreferrer">
              {story.data?.title}
            </a>
          ) : (
            story.data?.title
          )}{" "}
          <strong>({story.data?.score})</strong>
          {" "}
          by {story.data?.by}
        </li>
      ))}
    </ul>
  );
}

export default TopStories;
