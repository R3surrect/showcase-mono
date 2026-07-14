INSERT INTO tags (label, color, type, category, owner_id)
VALUES 
    ('Low', '{"h": 207, "s": 10, "l": 50}', 'priority', 'System', 1),
    ('Medium', '{"h": 40, "s": 60, "l": 50}', 'priority', 'System', 1),
    ('High', '{"h": 15, "s": 65, "l": 50}', 'priority', 'System', 1),
    ('Fire', '{"h": 0, "s": 75, "l": 48}', 'priority', 'System', 1)
ON CONFLICT (label, type, owner_id) DO NOTHING;