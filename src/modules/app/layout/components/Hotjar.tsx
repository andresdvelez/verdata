"use client";
import Script from "next/script";

export function Hotjar() {
  const id = process.env.NEXT_PUBLIC_HOTJAR_ID;
  if (!id || process.env.NODE_ENV !== "production") return null;

  return (
    <Script
      id="hotjar"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function(h,o,t,j,a,r){
            h.hj = h.hj || function(){ (h.hj.q = h.hj.q || []).push(arguments) };
            h._hjSettings = { hjid: ${id}, hjsv: 6 };
            a = o.getElementsByTagName('head')[0];
            r = o.createElement('script'); r.async = 1;
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
      }}
    />
  );
}
