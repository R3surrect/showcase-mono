-- TODO Вставка тягается триггером регистрации для ПРОЕКТОВ
-- ?    TEST INSERT PROJECTS STATUSES
INSERT INTO tags (label, color, type, category, owner_id)
VALUES (
        'Planning',
        '{"h": 270, "s": 40, "l": 50}',
        'project_status',
        'System',
        1
    ),
    (
        'In progress',
        '{"h": 210, "s": 65, "l": 48}',
        'project_status',
        'System',
        1
    ),
    (
        'On hold',
        '{"h": 45, "s": 20, "l": 50}',
        'project_status',
        'System',
        1
    ),
    (
        'Completed',
        '{"h": 145, "s": 45, "l": 45}',
        'project_status',
        'System',
        1
    ),
    (
        'Cancelled',
        '{"h": 10, "s": 35, "l": 50}',
        'project_status',
        'System',
        1
    ) ON CONFLICT (label, type, owner_id) DO NOTHING;