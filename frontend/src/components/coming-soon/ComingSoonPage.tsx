import React from "react";
import Image from "next/image";

export function ComingSoonPage() {
  const whatsappNumber = "2613407106333";
  const phoneDisplay = "034 07 10 63 33";
  const emailAddress = "contact@altioraconnect.mg";

  return (
    <div className="relative min-h-screen lg:h-screen w-screen overflow-x-hidden lg:overflow-hidden bg-[#f8fafc] flex flex-col items-center justify-center p-3 sm:p-6">
        {/* Background Ambient Glowing Lights */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#C59B27]/10 blur-[100px] animate-pulse-glow" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#0F223D]/10 blur-[120px] animate-pulse-glow" />

        {/* Background Vector Art - Subtle Soft Gray Lines */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-40">
          <svg
            className="h-full w-full stroke-slate-300/60"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Soft Gray Curved Waves */}
            <path
              d="M-200 -50 C 150 200, 600 -100, 1600 250"
              strokeWidth="1.5"
            />
            <path
              d="M-100 350 C 350 100, 800 650, 1650 150"
              strokeWidth="1.5"
            />
            <path
              d="M-50 850 C 450 400, 950 950, 1550 450"
              strokeWidth="1.5"
            />
            <path
              d="M100 -100 C 500 500, 200 800, 1200 1000"
              strokeWidth="1.5"
            />
            <path
              d="M600 -50 C 900 450, 1300 100, 1700 800"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* DESKTOP LAYOUT (lg and up) */}
        <div className="relative z-10 hidden lg:flex h-full w-full max-w-[1800px] flex-row items-center justify-center gap-8">
          {/* Central Mockup Image (Web) with floating gentle animation */}
          <div className="relative flex max-h-[92vh] w-full flex-1 items-center justify-center overflow-hidden">
            <div className="animate-float-gentle transition-transform duration-700 ease-out">
              <Image
                src="/images/comming1-web.webp"
                alt="Site ALTIORA PREST en cours de préparation"
                width={1920}
                height={1080}
                priority
                className="max-h-[88vh] w-auto max-w-full object-contain drop-shadow-[0_20px_35px_rgba(15,34,61,0.15)] transition-all duration-500 hover:scale-[1.01]"
              />
            </div>
          </div>

          {/* Side Contact Bar (Right side on desktop) */}
          <div className="flex flex-col items-center justify-center gap-3 shrink-0 lg:pl-2">
            <span className="text-base font-bold tracking-widest text-[#C59B27] uppercase drop-shadow-sm">
              Contact
            </span>
            <div className="flex flex-col items-center gap-5">
              {/* WhatsApp Link Button with Ripple Effect */}
              <div className="relative flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-[#C59B27]/40 animate-ripple pointer-events-none" />
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`WhatsApp: ${phoneDisplay}`}
                  aria-label={`Contacter par WhatsApp au ${phoneDisplay}`}
                  className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0F223D] text-white shadow-lg transition-all duration-300 hover:bg-[#16335a] hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#C59B27] focus:ring-offset-2"
                >
                  <svg
                    className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:block group-hover:opacity-100">
                    WhatsApp ({phoneDisplay})
                  </span>
                </a>
              </div>

              {/* Email Link Button */}
              <div className="relative flex items-center justify-center">
                <a
                  href={`mailto:${emailAddress}`}
                  title={`Email: ${emailAddress}`}
                  aria-label={`Envoyer un email à ${emailAddress}`}
                  className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0F223D] text-white shadow-lg transition-all duration-300 hover:bg-[#16335a] hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#C59B27] focus:ring-offset-2"
                >
                  <svg
                    className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:block group-hover:opacity-100">
                    {emailAddress}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE / TABLET LAYOUT (below lg) */}
        <div className="relative z-10 flex lg:hidden h-full w-full flex-col items-center justify-between py-4 px-2">
          {/* Top Contact Bar (Above the Phone Mockup on Mobile) */}
          <div className="flex flex-col items-center justify-center gap-2 mb-3">
            <span className="text-base font-bold tracking-widest text-[#C59B27] uppercase">
              Contact
            </span>
            <div className="flex flex-row items-center gap-4">
              {/* WhatsApp Link Button with subtle wave */}
              <div className="relative flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-[#C59B27]/30 animate-ripple pointer-events-none" />
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`WhatsApp: ${phoneDisplay}`}
                  aria-label={`Contacter par WhatsApp au ${phoneDisplay}`}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F223D] text-white shadow-md transition-all duration-300 active:scale-95"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>

              {/* Email Link Button */}
              <div className="relative flex items-center justify-center">
                <a
                  href={`mailto:${emailAddress}`}
                  title={`Email: ${emailAddress}`}
                  aria-label={`Envoyer un email à ${emailAddress}`}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F223D] text-white shadow-md transition-all duration-300 active:scale-95"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Mockup Image (Phone in Hand) with floating animation */}
          <div className="relative flex flex-1 w-full items-center justify-end overflow-hidden -mr-6 sm:-mr-12">
            <div className="animate-float-mobile">
              <Image
                src="/images/comming-mobile.webp"
                alt="Site ALTIORA PREST mobile en cours de préparation"
                width={1080}
                height={1920}
                priority
                className="max-h-[75vh] w-auto max-w-full object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
  );
}

