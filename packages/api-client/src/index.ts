import type { AppRouterV1 } from '@showcase-mono/backend/src/routes/api/v1/index'
import { hc } from 'hono/client';

export const createApiClient = (baseUrl: string, options?: Parameters<typeof hc>[1]) => hc<AppRouterV1>(`${baseUrl}/api/v1`, options);