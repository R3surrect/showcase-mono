import type { ContentfulStatusCode } from "hono/utils/http-status";

export interface PgErrorConfig {
    message: string;
    httpCode: ContentfulStatusCode;
}

export const POSTRES_ERRORS: Record<string, PgErrorConfig> = {
    // 23xxx: Integrity Constraint Violations (Нарушения правил базы)
    '23505': { message: 'A record with this data already exists.', httpCode: 409 },
    '23503': { message: 'Cannot complete operation because data is referenced elsewhere.', httpCode: 409 },
    '23502': { message: 'A required field is missing.', httpCode: 400 },
    '23514': { message: 'Data validation rule failed.', httpCode: 400 },
    '23000': { message: 'Database constraint violation.', httpCode: 400 },
    // 22xxx: Data Exceptions (Ошибки в типах/форматах данных)
    '22P02': { message: 'Invalid input format for column type.', httpCode: 400 },
    '22001': { message: 'String value exceeds maximum allowed length.', httpCode: 400 },
    '22007': { message: 'Invalid date or time format.', httpCode: 400 },
    // 42xxx: Syntax / Schema Errors (Ошибка бэкенда — запросили несуществующую колонку/таблицу)
    '42703': { message: 'Requested database column does not exist.', httpCode: 500 },
    '42P01': { message: 'Requested database table does not exist.', httpCode: 500 },
    '42501': { message: 'Insufficient database permissions.', httpCode: 500 },
    // 40xxx: Transaction Rollbacks (Проблемы с параллельными транзакциями)
    '40001': { message: 'Transaction conflict, please try again.', httpCode: 503 },
    '40P01': { message: 'Database deadlock detected, operation aborted.', httpCode: 503 },
    // 08xxx: Connection Exceptions (База «упала» или недоступна)
    '08003': { message: 'Database connection does not exist.', httpCode: 503 },
    '08006': { message: 'Database connection failed.', httpCode: 503 },
};