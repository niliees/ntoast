This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy mit Firebase Hosting (Windows / cmd.exe)

Voraussetzungen:
- Node.js installiert
- Firebase CLI installieren (einmalig):

```cmd
npm install -g firebase-tools
```

1) In Firebase einloggen und Projekt wählen
```cmd
firebase login
firebase use nsce-fr1
```

2) Firestore-Sicherheitsregeln deployen
```cmd
firebase deploy --only firestore:rules
```

3) App als Production-Build bauen (Next.js)
```cmd
npm run build
```

4) Deploy zu Firebase Hosting
- Diese Repo ist bereits mit `firebase.json` konfiguriert. Für Next.js 15+/16 unterstützt Firebase die Web-Frameworks automatisch.
```cmd
firebase deploy --only hosting
```

Nach dem Deploy erhältst du deine Hosting-URL. Stelle sicher, dass in der Firebase Console unter Authentication folgende Provider aktiviert sind:
- Google
- E-Mail/Passwort

Und lege für das Portal mindestens einen Admin-UID-Datensatz an:
- Firestore Collection: `admin-uids`
- Document-ID: `<deine-auth-uid>` (Inhalt kann leer sein)

Optional: Caching
- Turbopack/Next.js Cache liegt in `.next/`. Für saubere Builds kannst du ihn leeren:
```cmd
rmdir /s /q .next
npm run build
```
