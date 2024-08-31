"use client";

import { useEffect } from "react";

export default function AdSense({ ad_slot }: { ad_slot: string }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-format="fluid"
      data-ad-layout-key="-fb+5w+4e-db+86"
      data-ad-client="ca-pub-4263359409265449"
      data-ad-slot={ad_slot}
    ></ins>
  );
}
