import type { StatusCode } from "hono/utils/http-status";

export type StatusCodesSuccess = Extract<StatusCode, 200 | 201>;
export type StatusCodesClientError = Extract<StatusCode, 400 | 401 | 403 | 404 | 409>;
export type StatusCodeServerError = Extract<StatusCode, 500>;


export type ApiResponseSuccess<T> = {
    success: true;
    data: T;
}

export type ApiErrorItem = {
    field?: string;
    message: string;
}

export type ApiListResponseError = {
    success: false;
    errors: ApiErrorItem[]
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiListResponseError;