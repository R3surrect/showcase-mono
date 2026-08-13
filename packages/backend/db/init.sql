DO $$ BEGIN -- IF NOT EXISTS (
--     SELECT 1
--     FROM pg_type
--     WHERE typname = 'task_status_enum'
-- ) THEN CREATE TYPE task_status_enum AS ENUM (
--     'completed',
--     'pending',
--     'overdue',
--     'scheduled',
--     'in_progress'
-- );
-- END IF;
-- IF NOT EXISTS (
--     SELECT 1
--     FROM pg_type
--     WHERE typname = 'priority_enum'
-- ) THEN CREATE TYPE priority_enum AS ENUM ('low', 'medium', 'high', 'fire');
-- END IF;
-- IF NOT EXISTS (
--     SELECT 1
--     FROM pg_type
--     WHERE typname = 'tag_type_enum'
-- ) THEN CREATE TYPE tag_type_enum AS ENUM ('default', 'priority', 'status', 'time', 'people');
-- END IF;
IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'user_role_enum'
) THEN CREATE TYPE user_role_enum AS ENUM ('user', 'worker', 'manager', 'director');
END IF;
END $$;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(128) UNIQUE NOT NULL,
    password_hash varchar(256) NOT NULL,
    role user_role_enum DEFAULT 'user' NOT NULL,
    timezone TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    label VARCHAR(64) NOT NULL,
    color JSONB DEFAULT '{"h": 207, "s": 10, "l": 42}' NOT NULL,
    type varchar(32) NOT NULL,
    category varchar(32) NOT NULL,
    owner_id INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT fk_tags_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_tag_per_owner UNIQUE (label, type, owner_id)
);
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    label VARCHAR(64) NOT NULL,
    details TEXT,
    color JSONB DEFAULT '{"h": 0, "s": 0, "l": 50}' NOT NULL,
    emoji VARCHAR(64) DEFAULT '📁',
    priority_tag_id INT NOT NULL,
    status_tag_id INT NOT NULL,
    owner_id INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    is_archived BOOLEAN DEFAULT FALSE NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE NOT NULL,
    pinned_at TIMESTAMPTZ,
    CONSTRAINT fk_projects_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_project_priority_tag FOREIGN KEY (priority_tag_id) REFERENCES tags(id) ON DELETE RESTRICT,
    CONSTRAINT fk_projects_status_tag FOREIGN KEY (status_tag_id) REFERENCES tags(id) ON DELETE RESTRICT
);
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    label varchar(64),
    details TEXT NOT NULL,
    deadline TIMESTAMPTZ,
    notify_at TIMESTAMPTZ,
    owner_id INT NOT NULL,
    project_id INT NOT NULL,
    priority_tag_id INT NOT NULL,
    status_tag_id INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    is_archived BOOLEAN DEFAULT FALSE NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE NOT NULL,
    pinned_at TIMESTAMPTZ,
    CONSTRAINT fk_tasks_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_tasks_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    CONSTRAINT fk_tasks_priority_tag FOREIGN KEY (priority_tag_id) REFERENCES tags(id) ON DELETE RESTRICT,
    CONSTRAINT fk_tasks_status_tag FOREIGN KEY (status_tag_id) REFERENCES tags(id) ON DELETE RESTRICT
);
CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    label VARCHAR(32),
    content TEXT NOT NULL,
    owner_id INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    is_archived BOOLEAN DEFAULT FALSE NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE NOT NULL,
    task_id INT,
    pinned_at TIMESTAMPTZ,
    project_id INT NOT NULL,
    CONSTRAINT fk_notes_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_notes_projects FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    CONSTRAINT fk_notes_task FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE
    SET NULL --? fk_notes_task можно реализовать удаление с вопросом "удалить связанные заметки?"
);
CREATE TABLE IF NOT EXISTS pivot_tasks_tags (
    task_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (task_id, tag_id),
    CONSTRAINT fk_pivot_task FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    CONSTRAINT fk_pivot_tag FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS pivot_projects_tags (
    project_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (project_id, tag_id),
    CONSTRAINT fk_pivot_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    CONSTRAINT fk_pivot_tag FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
-- CREATE TABLE IF NOT EXISTS PIVOT_NOTES_TAGS (
--     note_id INT NOT NULL,
--     tag_id INT NOT NULL,
--     PRIMARY KEY (note_id, tag_id),
--     CONSTRAINT fk_pivot_note FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
--     CONSTRAINT fk_pivot_tag FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
-- );
-- CREATE TABLE IF NOT EXISTS PIVOT_NOTES_TASKS (
--     note_id INT NOT NULL,
--     task_id INT NOT NULL,
--     PRIMARY KEY (note_id, task_id),
--     CONSTRAINT fk_pivot_note FOREIGN KEY (note_id) REFERENCES note(id) ON DELETE CASCADE,
--     CONSTRAINT fk_pivot_task FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
-- );