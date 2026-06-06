import type { AppRouterV1 } from '@showcase-mono/backend/src/routes/api/v1/index'
import { hc } from 'hono/client';

const BASE_URL = `${process.env.VITE_BACKEND_API_URL || 'http://localhost'}:${process.env.VITE_BACKEND_API_PORT || '5173'}`;

export const apiV1 = hc<AppRouterV1>(`${BASE_URL}/api/v1`)