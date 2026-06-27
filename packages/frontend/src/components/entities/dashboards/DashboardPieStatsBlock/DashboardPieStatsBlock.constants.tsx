import type { StatusPieMock } from "./DashboardPieStatsBlock.types";

export const statusMock: StatusPieMock[] = [
    { name: 'Ожидание', value: 6, fill: 'var(--neutral-400)', subValue: '4 задач · 16%' },
    { name: 'В работе', value: 4, fill: 'var(--cold-blue-gray-400)', subValue: '6 задач · 24%' },
    { name: 'Выполнено', value: 11, fill: 'var(--warm-green-600)', subValue: '4 задач · 16%' },
    { name: 'Просрочено', value: 4, fill: 'var(--warm-red-400)', subValue: '11 задач · 44%' },
]