import { Context } from "hono";
import type {
    ApiErrorItem,
    ApiListResponseError,
    ApiResponseSuccess,
    StatusCodesClientError,
    StatusCodeServerError,
    StatusCodesSuccess
} from "#/shared/types/api.types.js";

export const apiResponse = {
    success: <T>(c: Context, payload: T, status: StatusCodesSuccess = 200) => c.json({
        success: true as const,
        payload
    } satisfies ApiResponseSuccess<T>, status),

    error: (
        c: Context,
        errors: ApiErrorItem[],
        status: StatusCodesClientError | StatusCodeServerError
    ) => c.json({
        success: false as const,
        errors
    } satisfies ApiListResponseError, status)
}
