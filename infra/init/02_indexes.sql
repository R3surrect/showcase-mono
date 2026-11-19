CREATE INDEX IF NOT EXISTS idx_tasks_owner               ON tasks(owner_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project             ON tasks(project_id);
             
CREATE INDEX IF NOT EXISTS idx_projects_owner            ON projects(owner_id);
             
CREATE INDEX IF NOT EXISTS idx_notes_owner               ON notes(owner_id);
CREATE INDEX IF NOT EXISTS idx_notes_project             ON notes(project_id);
CREATE INDEX IF NOT EXISTS idx_notes_task                ON notes(task_id);

CREATE INDEX IF NOT EXISTS idx_tags_owner                ON tags(owner_id);
CREATE INDEX IF NOT EXISTS idx_projects_priority_tag     ON projects(priority_tag_id);
CREATE INDEX IF NOT EXISTS idx_projects_status_tag       ON projects(status_tag_id);
CREATE INDEX IF NOT EXISTS idx_tasks_priority_tag        ON tasks(priority_tag_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status_tag          ON tasks(status_tag_id);

CREATE INDEX IF NOT EXISTS idx_pivot_tasks_tags_tag      ON pivot_tasks_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_pivot_tasks_tags_owner    ON pivot_tasks_tags(owner_id);

CREATE INDEX IF NOT EXISTS idx_pivot_projects_tags_tag   ON pivot_projects_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_pivot_projects_tags_owner ON pivot_projects_tags(owner_id);