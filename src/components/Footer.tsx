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
  const { contact } = property;
  const hasContact = contact.email || contact.whatsapp || contact.instagram;

  return (
    <footer className="bg-ink text-ivory pt-24 pb-10">
      <div className="container-edit">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <span className="label text-ivory/50">09 / 09 — Footer</span>
            <h2 className="mt-6 font-serif text-3xl sm:text-4xl leading-tight">
              {property.brand}
              <br />
              <span className="italic font-light">{property.location}</span>
            </h2>
          </div>

          <nav className="lg:col-span-4">
            <span className="label text-ivory/50">Explore</span>
            <ul className="mt-5 flex flex-col gap-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:opacity-60 transition-opacity">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {hasContact && (
            <div className="lg:col-span-3">
              <span className="label text-ivory/50">Contact</span>
              <ul className="mt-5 flex flex-col gap-3">
                {contact.email && (
                  <li>
                    <a href={`mailto:${contact.email}`} className="hover:opacity-60 transition-opacity">
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.whatsapp && (
                  <li>
                    <a
                      href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:opacity-60 transition-opacity"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
                {contact.instagram && (
                  <li>
                    <a
                      href={`https://instagram.com/${contact.instagram.replace(/^@/, "")}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:opacity-60 transition-opacity"
                    >
                      Instagram
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-20 border-t border-ivory/15 pt-10">
          <p className="font-serif text-2xl sm:text-3xl italic font-light leading-tight max-w-lg">
            Your stay. Your space.
            <br />
            Your city.
          </p>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 label text-ivory/50">
          <span>© {property.year} {property.brand.toUpperCase()}</span>
          <div className="flex gap-6">
            <span className="cursor-default">Privacy</span>
            <span className="cursor-default">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
