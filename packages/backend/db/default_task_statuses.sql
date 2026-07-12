INSERT INTO tags (type, label, color, owner_id)
VALUES (
        'task_status',
        'Completed',
        '{"h": 200, "s": 30, "l": 50}',
        1
    ),
    (
        'task_status',
        'Pending',
        '{"h": 45, "s": 70, "l": 50}',
        1
    ),
    (
        'task_status',
        'Overdue',
        '{"h": 140, "s": 50, "l": 45}',
        1
    ),
    (
        'task_status',
        'Scheduled',
        '{"h": 140, "s": 50, "l": 45}',
        1
    ),
    (
        'task_status',
        'In progress',
        '{"h": 0, "s": 70, "l": 50}',
        1
    ) ON CONFLICT (id, type) DO NOTHING;