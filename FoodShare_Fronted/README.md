# FoodShare — React.js Frontend

Converted from the supplied HTML/CSS/JavaScript FoodShare frontend into a Vite + React project.

## Run

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

### Notes
- All original HTML pages are represented as React-rendered page content.
- Existing CSS is included in `src/styles.css`.
- Original assets are in `public/assets`.
- Existing FoodShare demo JavaScript/localStorage behavior is preserved and runs after React mounts.
- The existing demo accounts/data are kept as provided by the original project.
- This is a compatibility-first conversion: the UI is React-rendered while the original DOM logic remains available. The next step for a production app would be replacing the DOM scripts with React components/state and connecting the Spring Boot microservices APIs.
