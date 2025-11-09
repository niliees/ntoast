import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function ImpressumPage() {
  return (
    <main className="px-6 py-32 max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-black mb-10">Impressum</h1>
      <section className="space-y-6 text-neutral-300">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Angaben gemäß § 5 TMG</h2>
          <p>
            <strong>Nils Schmidt</strong><br/>
            Deutschland
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Kontakt</h2>
          <p>
            <strong>E-Mail:</strong> nils.schmidt@nsce-management.agency oder support@nsce.fr oder nils.schmidt@nsce.fr
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: {" "}
            <a className="text-white underline" href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">https://ec.europa.eu/consumers/odr/</a>
            <br />Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
          <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </div>
      </section>

      <Analytics />
      <SpeedInsights />
    </main>
  );
}
