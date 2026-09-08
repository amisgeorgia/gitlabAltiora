import { Globe, Mail, Phone, MessageCircle, MapPin } from "lucide-react";

export function ContactTooltips() {
  const contacts = [
    { href: "https://www.altiora-prest.com", icon: Globe, label: "www.altiora-prest.com", external: true },
    { href: "mailto:administration@altiora-prest.com", icon: Mail, label: "administration@altiora-prest.com" },
    { href: "tel:0344454440", icon: Phone, label: "034 44 544 40" },
    { href: "https://wa.me/261343550600", icon: MessageCircle, label: "034 35 506 00", external: true },
    { href: "https://maps.google.com", icon: MapPin, label: "Antananarivo, Madagascar", external: true },
  ];

  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 mb-2 sm:mb-4">
      {contacts.map((item, index) => {
        const Icon = item.icon;
        return (
          <a
            key={index}
            href={item.href}
            aria-label={item.label}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="group relative h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-[#0B1E36] transition-all"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white text-[#0B1E36] text-xs font-bold rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none z-10 translate-y-2 group-hover:translate-y-0">
              {item.label}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
            </div>
          </a>
        );
      })}
    </div>
  );
}