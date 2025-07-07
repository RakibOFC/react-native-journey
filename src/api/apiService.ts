export const fetchShows = async (query: string): Promise<any[]> => {
  try {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    if (!res.ok) throw new Error('Failed to fetch shows');
    return await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};
