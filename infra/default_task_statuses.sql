-- TODO Вставка тягается триггером регистрации
-- ?    TEST INSERT 
INSERT INTO tags (label, color, type, category, owner_id)
VALUES (
        'Completed',
        '{"h": 145, "s": 45, "l": 45}',
        'task_status',
        'System',
        1
    ),
    (
        'Pending',
        '{"h": 40, "s": 65, "l": 48}',
        'task_status',
        'System',
        1
    ),
    (
        'Overdue',
        '{"h": 0, "s": 65, "l": 50}',
        'task_status',
        'System',
        1
    ),
    (
        'Scheduled',
        '{"h": 210, "s": 25, "l": 50}',
        'task_status',
        'System',
        1
    ),
    (
        'In progress',
        '{"h": 200, "s": 60, "l": 48}',
        'task_status',
        'System',
        1
    ) ON CONFLICT (label, type, owner_id) DO NOTHING;