const BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}/${import.meta.env.VITE_BACKEND_API_PORT}`;

export const fetchApi = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch (`${BASE_URL}/${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-By': 'XMLHttpRequest',
      ...options.headers
    },
  });
  
  if (!res.ok) {
    console.log(`not ok due ${res.status} - ${res.statusText}`);
  }

  return res.json();
}
