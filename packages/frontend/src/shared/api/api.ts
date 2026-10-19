import { createApiClient } from "@showcase-mono/api-client";

export const api = createApiClient(window.location.origin, {
    init: { credentials: 'include' }
});