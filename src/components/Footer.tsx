import { property } from "../config/property";

const LINKS = [
  { href: "#residence", label: "The Residence" },
  { href: "#space", label: "The Space" },
  { href: "#experience", label: "Experience" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "#book", label: "Book" },
];

export default function Footer() {
  const { email, whatsapp, instagram } = property.contact;
  const hasContact = email || whatsapp || instagram;
  const year = new Date().getFullYear();

  function handleClick(href: string) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <footer className="bg-ivory text-ink px-6 sm:px-10 pt-20 sm:pt-28 pb-10 border-t border-ink/10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6">
          <div className="md:col-span-5">
            <p className="font-display text-3xl sm:text-4xl leading-tight">
              {property.brandName}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-widest2 text-stone">
              {property.locationLabel}
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3">
            {LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-left text-[13px] uppercase tracking-widest2 text-stone hover:text-ink transition-colors w-fit"
              >
                {link.label}
              </button>
            ))}
          </div>

          {hasContact && (
            <div className="md:col-span-4 flex flex-col gap-3">
              <p className="text-[11px] uppercase tracking-widest2 text-stone mb-1">
                Contact
              </p>
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="text-[13px] text-ink hover:text-stone transition-colors w-fit"
                >
                  {email}
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-ink hover:text-stone transition-colors w-fit"
                >
                  WhatsApp
                </a>
              )}
              {instagram && (
                <a
                  href={`https://instagram.com/${instagram.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-ink hover:text-stone transition-colors w-fit"
                >
                  Instagram
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-20 sm:mt-28">
          <p className="font-display text-[10vw] sm:text-6xl md:text-7xl leading-[0.95] text-ink">
            Your stay.
            <br />
            Your space.
            <br />
            Your city.
          </p>
        </div>

        <div className="mt-16 pt-6 border-t border-ink/10 flex flex-col sm:flex-row justify-between gap-4 text-[11px] uppercase tracking-widest2 text-stone">
          <span>© {year} {property.brandName}</span>
          <div className="flex gap-6">
            <span className="cursor-default">Privacy</span>
            <span className="cursor-default">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
