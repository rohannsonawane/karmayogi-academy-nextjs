"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ phoneNumber = "919325589491" }) {
  const message = encodeURIComponent(
    "Hi, I'm interested in joining Karmayogi Academy. Please share details about the courses and batches.",
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        width: 56,
        height: 56,
        background: "#25D366",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        boxShadow: "0 4px 16px rgba(37,211,102,0.45)",
        zIndex: 1000,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "scale(1.1)";
        el.style.boxShadow = "0 6px 24px rgba(37,211,102,0.6)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "scale(1)";
        el.style.boxShadow = "0 4px 16px rgba(37,211,102,0.45)";
      }}
    >
      <MessageCircle size={28} fill="white" />
    </a>
  );
}
