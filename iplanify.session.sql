CREATE TYPE task_status_enum AS ENUM (
    "completed" | "pending" | "overdue" | "scheduled" | 'in_progress'
);
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username varchar(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash varchar(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    label VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    owner_id INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT fk_tags_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    label VARCHAR(50) NOT NULL,
    details TEXT,
    color VARCHAR(50),
    owner_id INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT fk_projects_owner FOREIGN KEY owner_id REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title varchar(50) not null,
    details TEXT,
    status task_status_enum DEFAULT 'scheduled' NOT NULL,
    deadline TIMESTAMPTZ,
    notify_at TIMESTAMPTZ,
    owner_id INT NOT NULL,
    tags INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMETIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT fk_tasks_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS tasks_tags_pivot (
    task_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (task_id, tag_id),
    CONSTRAINT fk_pivot_task FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    CONSTRAINT fk_pivot_tag FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(32),
    content TEXT NOT NULL,
    owner_id INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT fk_notes_owner FOREIGN KEY owner_id REFERENCES users(id) ON DELETE CASCADE
);
INSERT INTO projects (title, details, owner_id)
VALUES (
        'Life',
        'Your default projects',
        user_id
    );