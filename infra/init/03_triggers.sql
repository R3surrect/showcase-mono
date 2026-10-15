CREATE OR REPLACE FUNCTION initialize_new_user()
    RETURNS TRIGGER AS $$
    BEGIN

        INSERT INTO tags (label, color, type, category, owner_id)
        VALUES 
            ('Low', '{"h": 207, "s": 10, "l": 50}', 'priority', 'System', NEW.id),
            ('Medium', '{"h": 40, "s": 60, "l": 50}', 'priority', 'System', NEW.id),
            ('High', '{"h": 15, "s": 65, "l": 50}', 'priority', 'System', NEW.id),
            ('Fire', '{"h": 0, "s": 75, "l": 48}', 'priority', 'System', NEW.id)
        ON CONFLICT (label, type, owner_id) DO NOTHING;

        INSERT INTO tags (label, color, type, category, owner_id)
        VALUES (
                'Planning',
                '{"h": 270, "s": 40, "l": 50}',
                'project_status',
                'System',
                NEW.id
            ),
            (
                'In progress',
                '{"h": 210, "s": 65, "l": 48}',
                'project_status',
                'System',
                NEW.id
            ),
            (
                'On hold',
                '{"h": 45, "s": 20, "l": 50}',
                'project_status',
                'System',
                NEW.id
            ),
            (
                'Completed',
                '{"h": 145, "s": 45, "l": 45}',
                'project_status',
                'System',
                NEW.id
            ),
            (
                'Cancelled',
                '{"h": 10, "s": 35, "l": 50}',
                'project_status',
                'System',
                NEW.id
            ) ON CONFLICT (label, type, owner_id) DO NOTHING;

        INSERT INTO tags (label, color, type, category, owner_id)
        VALUES (
                'Completed',
                '{"h": 145, "s": 45, "l": 45}',
                'task_status',
                'System',
                NEW.id
            ),
            (
                'Pending',
                '{"h": 40, "s": 65, "l": 48}',
                'task_status',
                'System',
                NEW.id
            ),
            (
                'Overdue',
                '{"h": 0, "s": 65, "l": 50}',
                'task_status',
                'System',
                NEW.id
            ),
            (
                'Scheduled',
                '{"h": 210, "s": 25, "l": 50}',
                'task_status',
                'System',
                NEW.id
            ),
            (
                'In progress',
                '{"h": 200, "s": 60, "l": 48}',
                'task_status',
                'System',
                NEW.id
            ) ON CONFLICT (label, type, owner_id) DO NOTHING;

        INSERT INTO tags (label, color, type, category, owner_id)
        VALUES 
            ('🧪 Дом', '{"h": 43, "s": 12, "l": 42}', 'default', 'Личное & Окружение', NEW.id),
            ('🛒 Покупки', '{"h": 42, "s": 12, "l": 55}', 'default', 'Личное & Окружение', NEW.id),
            ('🏖️ Отдых', '{"h": 67, "s": 41, "l": 75}', 'default', 'Личное & Окружение', NEW.id),
            
            ('📊 Итоги', '{"h": 41, "s": 23, "l": 43}', 'default', 'Управление & Процессы', NEW.id),
            ('🔄 Рутина', '{"h": 37, "s": 13, "l": 56}', 'default', 'Управление & Процессы', NEW.id),
            ('📞 Созвон', '{"h": 37, "s": 13, "l": 56}', 'default', 'Личное & Окружение', NEW.id),

            ('🍏 Здоровье', '{"h": 67, "s": 26, "l": 35}', 'default', 'Здоровье & Спорт', NEW.id),
            ('📚 Обучение', '{"h": 67, "s": 22, "l": 50}', 'default', 'Обучение', NEW.id),
            ('🪙 Финансы', '{"h": 26, "s": 22, "l": 30}', 'default', 'Финансы & Юриспруденция', NEW.id),
            ('🎨 Творчество', '{"h": 35, "s": 39, "l": 53}', 'default', 'Медиа & Контент', NEW.id)
        ON CONFLICT (label, type, owner_id) DO NOTHING;

    RETURN NEW; 
    END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_after_user_signup ON users;

CREATE TRIGGER trg_after_user_signup
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION initialize_new_user();
