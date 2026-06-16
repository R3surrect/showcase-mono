TRUNCATE TABLE projects RESTART IDENTITY CASCADE;
INSERT INTO projects(
        label,
        details,
        emoji,
        color,
        owner_id,
        priority,
        is_pinned
    )
VALUES (
        'Planify Frontend',
        'Refactoring project cards, progress bars, and custom emoji picker component',
        '💻',
        '{"h": 210, "s": 40, "l": 60}',
        1,
        'high',
        true
    ),
    (
        'Hono Backend Core',
        'Setting up Drizzle ORM, auth middleware, and validation schemas',
        '🔥',
        '{"h": 15, "s": 70, "l": 55}',
        1,
        'fire',
        true
    ),
    (
        'UI Kit Architecture',
        'Creating flexible and accessible modals and dialogs from scratch',
        '📐',
        '{"h": 260, "s": 35, "l": 65}',
        1,
        'high',
        false
    ),
    (
        'Database Optimization',
        'Writing migrations, indexing foreign keys, and seeding testing data',
        '📄',
        '{"h": 140, "s": 30, "l": 50}',
        1,
        'medium',
        false
    ),
    (
        'Pet Project DevOps',
        'Configuring monorepo building pipeline and Docker containers',
        '🚀',
        '{"h": 195, "s": 50, "l": 55}',
        1,
        'high',
        true
    ),
    (
        'Auth System',
        'Implementing JWT tokens, refresh sessions, and HTTP-only cookies security',
        '🔐',
        '{"h": 40, "s": 65, "l": 50}',
        1,
        'fire',
        false
    ),
    (
        'Analytics Dashboard',
        'Building charts for task completion rates and weekly productivity metrics',
        '📊',
        '{"h": 290, "s": 30, "l": 60}',
        1,
        'medium',
        false
    ),
    (
        'Notification Service',
        'Setting up SSE or WebSockets for real-time task updates and alerts',
        '🔔',
        '{"h": 45, "s": 75, "l": 55}',
        1,
        'high',
        false
    ),
    (
        'File Storage Integration',
        'Connecting S3 bucket for uploading user avatars and task attachments',
        '📁',
        '{"h": 35, "s": 45, "l": 55}',
        1,
        'medium',
        false
    ),
    (
        'Dark Mode Theme',
        'Adding CSS variables and theme provider for full system dark mode support',
        '🌙',
        '{"h": 230, "s": 35, "l": 45}',
        1,
        'low',
        false
    ),
    (
        'Localization i18n',
        'Translating the application interface into English and Russian languages',
        '🌐',
        '{"h": 170, "s": 35, "l": 55}',
        1,
        'low',
        false
    ),
    (
        'Landing Page',
        'Creating a responsive marketing homepage with features section and pricing',
        '🎨',
        '{"h": 330, "s": 45, "l": 65}',
        1,
        'medium',
        false
    ),
    (
        'Error Tracking',
        'Integrating Sentry for logging frontend crashes and backend exceptions',
        '🪲',
        '{"h": 0, "s": 50, "l": 55}',
        1,
        'high',
        false
    ),
    (
        'CI/CD Pipeline',
        'Setting up GitHub Actions for automated linting, testing, and deployment',
        '🤖',
        '{"h": 160, "s": 40, "l": 50}',
        1,
        'fire',
        false
    ),
    (
        'Keyboard Shortcuts',
        'Adding global hotkeys for fast task creation and modal navigation',
        '⌨️',
        '{"h": 20, "s": 20, "l": 60}',
        1,
        'low',
        false
    );