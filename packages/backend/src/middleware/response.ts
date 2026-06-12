import { Context } from "hono";
import type {
    ApiErrorItem,
    ApiListResponseError,
    ApiResponseSuccess,
    StatusCodesClientError,
    StatusCodeServerError,
    StatusCodesSuccess
} from "#/types/api.types.js";

export const apiResponse = {
    success: <T>(c: Context, data: T, status: StatusCodesSuccess = 200) => c.json({
        success: true as const,
        data
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