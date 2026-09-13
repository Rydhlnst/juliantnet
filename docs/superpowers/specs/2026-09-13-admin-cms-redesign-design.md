# Admin CMS redesign and editable homepage

## Goal

Replace the dated CMS shell with a clean, operations-focused dashboard inspired by Watermelon UI's Bionis dashboard registry. Make the homepage content genuinely editable without introducing an unsafe freeform page builder.

## Decisions

- The desktop sidebar is fixed, full-height, and independently scrollable.
- Mobile navigation uses the existing Sheet primitive instead of squeezing the desktop sidebar into the viewport.
- The Bionis registry contributes the dashboard shell, hierarchy, card density, and data-presentation patterns. Its health and wellness content is not imported.
- Homepage content is structured, editable, visibility-controlled, and reorderable. Arbitrary section types are not supported because the public frontend needs a known rendering contract.

## Current gap

The Website route only renders static labels. Although the database already has `pages` and `page_sections`, no route reads or writes them, and the public homepage is hard-coded. Therefore, an administrator has no content editing capability.

## Dashboard shell

- Add an admin app shell with a fixed left sidebar on `lg` and above.
- Use a simple top bar in the content area for page title, account context, and a Preview website action.
- Group navigation into Operations (Overview, Leads, Coverage), Content (Website, Plans, FAQ, Testimonials, Media), and System (SEO, Settings).
- Preserve existing routes and access control.
- Rebuild the overview page using Bionis-style summary blocks, compact trend/pipeline panels, and action cards populated only from existing operational data.

## Website editor

### Editor layout

- Route: `/admin/website`.
- Left pane: ordered list of homepage sections, visible/hidden state, and selected section.
- Main pane: fields for the selected section with explicit Save changes and error/success feedback.
- Header: Open preview and Save changes actions.
- Mobile: section selector becomes a compact horizontal control or Sheet.

### Supported section schema

The initial homepage schema uses existing visual sections:

| Section | Editable values |
| --- | --- |
| Hero | eyebrow, heading, body, three benefit labels, primary/secondary CTA labels and links, image URL and alt text |
| Coverage | eyebrow, heading |
| Use cases | eyebrow, heading, four use-case labels |
| Network | eyebrow, heading, four value labels, image URL and alt text |
| Installation | eyebrow, heading, six process steps |
| Final CTA | eyebrow, heading, CTA label and link |
| Footer | copy, contact/WhatsApp label |

Plans and FAQ remain managed through their existing CMS routes because they already render from their own database records.

### Data contract

- Use the existing `pages` record with slug `home`.
- Store each supported section in `page_sections` using its stable section key, JSON content, sort order, and visibility.
- On first read, provision missing home/page-section records using safe defaults derived from the existing public homepage.
- Validate every section payload on the server with Zod. Only known fields and known section keys are accepted.
- Allow `SUPER_ADMIN`, `ADMIN`, and `EDITOR` to update content, visibility, and order. Preserve the existing role check pattern and audit each update.

### Public rendering

- Add a typed homepage-content service that reads the sections in sort order.
- Merge stored content with defaults so an empty or partially seeded database cannot break the public site.
- Render visibility and sort order on the public homepage.
- Keep interactive components (coverage form, plan cards, FAQ accordion) in their current positions; only surrounding editorial copy and imagery become editable.

## Error states and safety

- Editor shows loading, empty/bootstrap, validation, save-pending, save-success, and save-error states.
- A failed save keeps local field values intact.
- Invalid image URLs and malformed links are rejected server-side.
- Content changes are scoped to the home page and audited.

## Registry integration

Use the registry's documented shadcn entry point only if its generated components are compatible with the current shadcn setup:

```sh
npx shadcn@latest add https://registry.watermelon.sh/r/bionis-dashboard.json
```

Adapt generated presentation components into the existing admin shell instead of adopting the registry's mock data, routes, or wellness terminology.

## Verification

- Add focused tests for default content merging and section-payload validation.
- Verify an authorized editor can fetch, update, hide, and reorder home sections.
- Verify unauthorized requests are rejected.
- Run lint, production build, and a browser-level check that saved content renders on the public homepage.

## Out of scope

- Arbitrary drag-and-drop page building.
- Creating new public section types from the CMS.
- Reworking unrelated public pages.
