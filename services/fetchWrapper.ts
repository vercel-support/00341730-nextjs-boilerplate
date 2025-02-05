// src/utils/fetchWrapper.ts

// Function to handle API requests
/**
 *
 * @param {*} endpoint
 * @param {*} options
 * @param {*} fullUrl
 * @param {*} skipAuth : Default behaviour - Add Authorization, pass true if you wanna skip Authorization
 * @param {*} isAdmin
 * @param {*} cacheApiResponse
 * @param {*} maxAge  // New parameter for cache max-age in seconds
 * @returns
 */
const fetchWrapper = async ({ endpoint }: { endpoint: string; }) => {

  // build URL
  const url = `https://jsonplaceholder.typicode.com/posts/${endpoint}`;

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600,
      },
    });
    const result = await response.json();

    result.status = response.status;
    result.ok = response.ok;

    return result;
  } catch (error) {
    console.error("Fetch error:", (error as Error).message);
    throw error;
  }
};

export default fetchWrapper;