# Kavach — Start Here

## Fastest option: open the demo directly

Double-click **Kavach_Standalone.html**. This is a self-contained no-install demo and should open directly in Chrome, Edge or Firefox. It includes the login screen, OTP flow and all connected dashboard pages.

For the demo login, either click **Enter demo workspace**, or use any 10-digit mobile number and OTP `123456`.

## Source-code mode

The React/Vite source is also included. Use Node.js 18+:

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal. To build the production version:

```bash
npm run build
```

## If you see a white screen

Do not open the source `index.html` directly with `file://`. It is a Vite source entry and needs the Vite dev server. Open **Kavach_Standalone.html** for the no-install version, or run `npm install` followed by `npm run dev` for source mode.
