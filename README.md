# Kavach — Payment-Moment Guardian

Kavach is a premium fintech safety prototype built for the **Paytm Build for India AI Hackathon — Mumbai**. It protects users during scam-coached payment moments by combining contextual risk signals, a trusted-family Guardian approval loop, Indic-language safety guidance and an AI-assisted golden-hour recovery workflow.

> **Prototype status:** This repository contains a fully interactive frontend demo. Payment, OTP, call-state detection, Guardian notifications and recovery outputs are simulated. No real money moves and no complaint is submitted automatically.

## Team

**Team:** Paneer_Chicken

- Daksh Choudhary
- Jyotirmaya Sabat
- Siddhesh Kadam

## Hackathon alignment

Kavach is primarily aligned with **Track 2: AI-Powered Financial Journeys** because it makes a high-stakes fintech journey safer, simpler and more human. The Guardian and Recovery flows also demonstrate the intent of **Track 3: Autonomous AI Teammates** because the product understands context, takes workflow actions and escalates to a trusted human only when needed.

## Product flow

```text
Login / Demo access
        ↓
Protection command center
        ↓
Simulated payment
        ↓
Risk engine: new payee + amount spike + active call
        ↓
Hard pause + localized voice guidance
        ↓
Guardian approve / block on second-phone view
        ↓
Payment allowed or blocked
        ↓
Golden-hour recovery pack if money leaves
```

## Main features

### 1. Professional login flow

- Branded Kavach login screen.
- Mobile number entry with validation.
- Simulated OTP verification.
- Demo shortcut for judges who want to enter the workspace immediately.
- Demo OTP: `123456`.

### 2. Protection command center

- Protection status and recent activity.
- At-risk amount and Guardian response metrics.
- Three-layer product story: Intercept, Guardian Loop and Golden-Hour Recovery.
- Judge Mode control panel for jumping between demo scenarios.

### 3. Transparent risk engine

The demo explains the risk instead of showing a black-box score:

- New payee: `+40`
- Amount spike: `+30`
- Active call state: `+30`
- Pause threshold: `70 / 100`

The prototype intentionally reads only simulated call state. It does not read or record call audio.

### 4. Guardian loop

- Second-phone Guardian view.
- One-tap Approve and Block actions.
- Pending, approved and denied states.
- Trusted Guardian profile for Asha Mehta.
- Decision returns to the payment experience.

### 5. Golden-hour recovery

- Recovery case timeline.
- Evidence pack status.
- Draft 1930 cybercrime complaint.
- Draft bank dispute statement.
- PDF-ready evidence output state.
- Human review boundary: AI drafts, the user approves and submits.

### 6. Trust and rollout page

- Prototype architecture.
- AI and human decision boundaries.
- Privacy-light signal explanation.
- Paytm-native rollout path.
- Track 2 and Track 3 positioning.

## Demo scenarios

Use the **Judge mode** panel at the bottom of the dashboard:

- **Safe payment:** low-risk payment with a safe outcome.
- **Scam-coached call:** triggers the risk engine and hard pause.
- **Guardian approves:** demonstrates the allowed outcome.
- **Guardian blocks:** demonstrates the blocked outcome.
- **Post-loss recovery:** opens the golden-hour recovery workspace.

## Tech stack

- React
- Vite
- JavaScript / JSX
- Lucide React icons
- CSS with responsive layouts and custom design tokens
- Vite development server
- Static production build through `dist/`

The prototype is frontend-only so that it can be run and demonstrated without external API keys. A production version can connect the same UI to Paytm-native payment context, a real risk service, Sarvam TTS, Telegram or push notifications, Supabase and a complaint workflow service.

## Run locally

### Requirements

- Node.js 18 or newer
- npm

### Installation

```bash
git clone <your-github-repository-url>
cd kavachai
npm install
```

### Start development server

```bash
npm run dev
```

Open the local Vite URL shown in the terminal. The project is configured to use port `3000` in the managed Preview environment.

### No-install demo

The repository also includes `Kavach_Standalone.html`. Double-click that file to open a self-contained version of the demo without installing Node.js or running Vite. This is the recommended file for offline judging or quick sharing.

Do not double-click the source `index.html`: it is a Vite entry file and needs `npm install` plus `npm run dev`. Opening the source entry directly with `file://` can result in a white screen because browser module loading is restricted in that mode.

### Demo login

You can select **Enter demo workspace** on the login page. If you want to show the login flow, use:

- Any 10-digit Indian mobile number
- OTP: `123456`

### Production build

```bash
npm run build
```

The production output is generated in `dist/`.

## Project structure

```text
kavachai/
├── public/
│   └── manus-routes.json       # Route manifest for the managed Preview
├── src/
│   ├── main.jsx                # App shell, login flow, dashboard and views
│   └── styles.css              # Design system, responsive UI and animations
├── index.html                  # Vite HTML entry point
├── package.json                # Scripts and dependencies
├── package-lock.json           # Locked dependency tree
├── vite.config.js              # React/Vite and Preview host configuration
├── TODO.md                     # Delivered prototype outcomes
├── README.md                   # This documentation
└── .gitignore                  # Repository ignore rules
```

## Design direction

The interface uses a **Glassline Guardian** visual direction:

- Deep midnight navy for trust and seriousness.
- Cyan for live protection signals.
- Violet for AI orchestration and future-facing surfaces.
- Amber for urgency and recovery.
- Emerald for safe outcomes.
- Mobile-first responsive panels that can be demonstrated on a laptop or phone.

## Architecture concept

```text
Paytm-style payment context
        ↓
Contextual risk rules
        ↓
AI explanation + Indic voice guidance
        ↓
Out-of-band Guardian notification
        ↓
Approve / Block decision
        ↓
Payment outcome
        ↓
Recovery agent → evidence pack + complaint drafts + case tracker
```

## Production boundary

This repository deliberately keeps the hackathon demo safe and self-contained. The following integrations are simulated:

- Login and OTP
- Paytm payment screen
- Android call-state signal
- Voice playback
- Guardian push or Telegram notification
- Complaint and bank dispute generation
- Case storage and PDF generation

In a production implementation, these should be connected through authenticated backend services, explicit consent, secure audit logs, rate limiting and human review. The product must never submit a police complaint, bank dispute or payment without the user's confirmation.

## Suggested production extensions

1. Android call-state integration inside a Paytm-owned or partner app surface.
2. Paytm-native risk signals and transaction context.
3. Sarvam or another Indic speech service for localized voice guidance.
4. Secure Guardian notifications through Paytm push, WhatsApp or Telegram.
5. Supabase/Postgres for users, Guardians, risk events and recovery cases.
6. PDF evidence generation and secure case sharing.
7. Human-reviewed workflows for cybercrime and bank dispute submission.

## License

This is a hackathon prototype created for demonstration and evaluation. Add the license required by your team or institution before public distribution.

## Reference

Hackathon listing: <https://devsemble.com/hackathons/paytm-build-for-india-ai-hackathon-mumbai-by-paytm>
