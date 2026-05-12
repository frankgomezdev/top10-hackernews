import { useQueries, useQuery } from "@tanstack/react-query";

const TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const ITEM_URL = (id: number) =>
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
const STORY_LIMIT = 10;

async function fetchTopStoryIds() {
    const response = await fetch(TOP_STORIES_URL);
    if (!response.ok) {
    throw new Error("Unable to fetch top stories.")
    }
    return response.json()
}

async function fetchStory(id: number) {
    const response = await fetch(ITEM_URL(id));
    if (!response.ok) {
        throw new Error(`Unable to fetch story ${id}.`)
    }
    return response.json()
}


function TopStories() {
    const { data: storiesData, isLoading, isError, error} = useQuery({
        queryKey: ["topstories"],
        queryFn: fetchTopStoryIds
    })

    const topIds = storiesData?.slice(0, STORY_LIMIT) ?? [];

    const topStoriesQueries = useQueries({
        queries: topIds.map((id) => ({
            queryKey: ["story", id],
            queryFn: () => fetchStory(id) ,

        })),
    })
}

export default TopStories;
