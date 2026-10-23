# Project Context

## Overview
Project name: Quorum
This project is a web platform exclusively for students and staff of a Computer Science Department.

It provides two primary features:

- **Library:** Access to academic and departmental learning resources.
- **Community:** A space where department members can create and view posts.

This repository contains the frontend application. The backend is a separately maintained service.

## Technology Stack

- React 19 with TypeScript 6
- Vite 8
- Tailwind CSS 4
- React Router 7
- Axios for HTTP communication
- Formik and Yup for forms and validation
- Tiptap 3 for rich-text editing
- React Markdown and remark-gfm for Markdown rendering
- Framer Motion for animations
- Lucide React for icons

Do not assume additional libraries are installed.

## Architecture and Conventions

- Inspect the existing repository structure before making changes.
- Follow existing component, hook, routing, and API integration patterns.
- Prefer functional React components and hooks.
- Reuse existing components and utilities when appropriate.
- Keep TypeScript types explicit and meaningful.
- Avoid `any` unless justified.
- Do not introduce unnecessary abstractions, dependencies, or architectural layers.
- Preserve established styling and responsive behavior.
- Use Tailwind CSS 4 conventions, not assumptions from earlier versions.

## Backend Integration

- The backend is maintained separately.
- Use the existing Axios configuration and API integration patterns.
- Do not invent endpoints, request payloads, response fields, or authentication behavior.
- Treat documented API contracts as authoritative.
- Report missing or unclear backend functionality.
- Handle loading, error, and empty states where relevant.
- Never treat frontend validation or access restrictions as sufficient backend security.

## Product Boundaries

- The platform is intended for authorized Computer Science Department students and staff.
- The Library and Community are distinct product domains.
- Do not invent user roles, permission levels, or business rules.
- Implement only behavior supported by requirements or existing code.

## Development Workflow

### Exploration
Before substantial changes:
1. Read relevant project documentation.
2. Inspect affected components, hooks, routes, and services.
3. Identify existing behavior and dependencies.

### Planning
For substantial or ambiguous tasks:
1. Summarize requirements.
2. Identify affected files.
3. Propose a minimal implementation approach.
4. Identify edge cases and risks.
5. Wait for approval before implementation.

### Implementation
- Follow the approved scope.
- Preserve existing functionality.
- Avoid unrelated refactoring.
- Do not install dependencies without approval.

### Verification
Run relevant checks:

- `npm run build`
- `npm run lint`

Where practical, verify affected behavior manually or with existing tests.

Do not claim tests passed unless they were executed successfully.

### Reporting
After implementation, summarize:
- Files changed
- Behavior implemented
- Validation performed
- Remaining issues or limitations

## Restrictions

- Do not modify unrelated files.
- Do not change API contracts without approval.
- Do not modify secrets or environment configuration without approval.
- Do not commit or push unless explicitly requested.
- Do not introduce state management or data-fetching libraries without justification and approval.

## Documentation

Consult relevant documentation when it exists:

- `docs/architecture.md`
- `docs/features/library.md`
- `docs/features/community.md`

If documentation conflicts with implementation, report the discrepancy.

Do not assume missing documentation defines behavior.


## Feature Prioritization

- Prioritize approved product features over unrelated technical debt.
- Do not treat every code review finding as an immediate task.
- When implementing a feature, fix existing defects that directly affect the feature or its acceptance criteria.
- Avoid unrelated refactoring and opportunistic changes outside the approved scope.
- Do not expand a feature's scope merely because nearby code could be improved.
- Flag unrelated defects when they pose a significant security, data-integrity, or stability risk, but do not automatically fix them.
- Verify both the new behavior and any existing behavior affected by the changes.
