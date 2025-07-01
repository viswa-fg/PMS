# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Micro Frontend Architecture Plan

This project is structured to support a micro frontend architecture, replicating the core structure and user experience of the Goibibo Hotels page (https://www.goibibo.com/hotels/).

### Planned Micro Frontends
- **Search**: Handles hotel search functionality.
- **Listing**: Displays a list of hotels based on search/filter criteria.
- **Hotel Details**: Shows detailed information for a selected hotel.

Each micro frontend will be developed as a separate module under `src/modules/` for easy integration and independent development.
