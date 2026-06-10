import type { LineProps } from "recharts";
import { type DataProps } from "./DashboardActivityBlock.types";

export const chartsMock: DataProps[] = [
    { day: '20 апр.', completed: 0, outdated: 0, all: 0 },
    { day: '21 апр.', completed: 0, outdated: 0, all: 0 },
    { day: '22 апр.', completed: 0, outdated: 0, all: 0 },
    { day: '23 апр.', completed: 0, outdated: 0, all: 0 },
    { day: '24 апр.', completed: 1, outdated: 0, all: 1 },
    { day: '25 апр.', completed: 1, outdated: 0, all: 1 },
    { day: '26 апр.', completed: 1, outdated: 0, all: 1 },
    { day: '27 апр.', completed: 2, outdated: 0, all: 2 },
    { day: '28 апр.', completed: 1, outdated: 1, all: 2 },
    { day: '29 апр', completed: 1, outdated: 1, all: 2 },
    { day: '30 апр', completed: 1, outdated: 1, all: 2 },
    { day: '1 мая', completed: 1, outdated: 1, all: 2 },
    { day: '2 мая', completed: 2, outdated: 0, all: 2 },
    { day: '3 мая', completed: 0, outdated: 0, all: 0 },
]

export const chartsData: Partial<LineProps>[] = [
    { key: '1', dataKey: "all", name: "Всего", stroke: "var(--cold-blue-grey-400)" },
    { key: '2', dataKey: "completed", name: "Выполнено", stroke: "var(--warm-green-500)", dot: { r: 3, fill: 'var(--warm-green-500)' } },
    { key: '3', dataKey: "outdated", name: "Просрочено", stroke: "var(--warm-red-400)", strokeDasharray: "4 3" },
]