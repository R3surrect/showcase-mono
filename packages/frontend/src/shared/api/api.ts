import { createApiClient } from "@showcase-mono/api-client";

export const api = createApiClient(`${import.meta.env.VITE_BACKEND_API_URL}:${import.meta.env.VITE_BACKEND_API_PORT}`);