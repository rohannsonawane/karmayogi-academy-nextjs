import Link from "next/link";
import Image from "next/image";
import { BookOpen, CheckCircle, Award } from "lucide-react";
import PageHero from "@/components/website/PageHero";
import { getFaculty } from "@/lib/queries/faculty";

export const metadata = {
  title: "Post-Holder Faculty & Mentors | Karmayogi Academy Nashik",
  description:
    "Learn from post-holders and serving officers who cleared MPSC Rajyaseva, PSI, STI, and Talathi exams themselves.",
};

export default async function FacultyPage() {
  const allFaculty = await getFaculty();
  const founders = allFaculty.filter((f) => f.is_founder);
  const educators = allFaculty.filter((f) => !f.is_founder);

  return (
    <div style={{ backgroundColor: "#FAF9F6", minHeight: "100vh" }}>
      {/* 1. HERO SECTION */}
      <PageHero
        breadcrumb="FACULTY & STAFF"
        title="Our Post-Holder Faculty & Mentors"
        subtitle="Post-holders who cleared the very exams they now teach."
      />

      <div className="container-ka" style={{ padding: "4rem 1rem" }}>
        {/* 2. OUR FOUNDERS SECTION */}
        <div style={{ marginBottom: "4.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "var(--navy)",
                  marginBottom: "0.35rem",
                }}
              >
                Our Founders
              </h2>
              <p style={{ color: "var(--gray-600)", fontSize: "0.9375rem" }}>
                The visionaries and officer-mentors behind Karmayogi Academy.
              </p>
            </div>
            <div
              style={{
                background: "#FEF3C7",
                color: "#92400E",
                border: "1px solid #FDE68A",
                padding: "0.35rem 0.875rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Founding Mentors
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "2rem",
            }}
          >
            {founders.map((founder, idx) => (
              <div
                key={founder.id || idx}
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  padding: "2rem",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: "50%",
                      background: idx === 0 ? "#E05A1B" : "#FEF3C7",
                      color: idx === 0 ? "white" : "#1E3A8A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.625rem",
                      fontWeight: 800,
                      flexShrink: 0,
                      border: idx === 1 ? "2px solid #D97706" : "none",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {founder.image_url ? (
                      <Image
                        src={founder.image_url}
                        alt={founder.name}
                        fill
                        sizes="68px"
                        style={{ objectFit: "cover" }}
                        unoptimized
                      />
                    ) : (
                      founder.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--navy)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {founder.name}
                    </h3>
                    <div
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "var(--orange)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {founder.designation}
                    </div>
                    {founder.badge && (
                      <span
                        style={{
                          display: "inline-block",
                          background: "#FEF3C7",
                          color: "#92400E",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          padding: "0.15rem 0.5rem",
                          borderRadius: "0.25rem",
                        }}
                      >
                        {founder.badge}
                      </span>
                    )}
                  </div>
                </div>

                {founder.subject && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.8125rem",
                      color: "#92400E",
                      fontWeight: 600,
                    }}
                  >
                    <BookOpen
                      size={14}
                      style={{ color: "var(--orange)", flexShrink: 0 }}
                    />
                    <span>Subject: {founder.subject}</span>
                  </div>
                )}

                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#4B5563",
                    lineHeight: 1.65,
                  }}
                >
                  {founder.description}
                </p>

                <div
                  style={{
                    marginTop: "auto",
                    padding: "0.625rem 0.875rem",
                    background: "#FDF8F0",
                    border: "1px solid #FDE3B7",
                    borderRadius: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#B45309",
                  }}
                >
                  <CheckCircle
                    size={14}
                    style={{ color: "var(--orange)", flexShrink: 0 }}
                  />
                  <span>
                    {idx === 0
                      ? "Serving Gram Mahasul Adhikari · Talathi Exam Qualifier"
                      : "Architect of the 52-Week Karmayogi Preparation System"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. OUR FACULTY SECTION */}
        <div style={{ marginBottom: "4.5rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "2rem",
                fontWeight: 800,
                color: "var(--navy)",
                marginBottom: "0.35rem",
              }}
            >
              Our Faculty
            </h2>
            <p style={{ color: "var(--gray-600)", fontSize: "0.9375rem" }}>
              Experienced educators, subject experts, and selected
              officer-mentors.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.75rem",
            }}
          >
            {educators.map((faculty, idx) => {
              const bgColors = ["#1F4295", "#EA580C", "#D97706", "#1E3A8A"];
              const avatarBg = bgColors[idx % bgColors.length];

              return (
                <div
                  key={faculty.id || idx}
                  style={{
                    background: "white",
                    borderRadius: "1rem",
                    padding: "1.75rem",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: 58,
                        height: 58,
                        borderRadius: "50%",
                        background: avatarBg,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.35rem",
                        fontWeight: 800,
                        flexShrink: 0,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      {faculty.image_url ? (
                        <Image
                          src={faculty.image_url}
                          alt={faculty.name}
                          fill
                          sizes="58px"
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      ) : (
                        faculty.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: "1.0625rem",
                          fontWeight: 700,
                          color: "var(--navy)",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {faculty.name}
                      </h3>
                      {faculty.badge && (
                        <span
                          style={{
                            display: "inline-block",
                            background: "#FEF3C7",
                            color: "#92400E",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            padding: "0.15rem 0.5rem",
                            borderRadius: "0.25rem",
                          }}
                        >
                          {faculty.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {faculty.subject && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.8125rem",
                        color: "#92400E",
                        fontWeight: 600,
                      }}
                    >
                      <BookOpen
                        size={14}
                        style={{ color: "var(--orange)", flexShrink: 0 }}
                      />
                      <span>Subject: {faculty.subject}</span>
                    </div>
                  )}

                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "#6B7280",
                      lineHeight: 1.65,
                    }}
                  >
                    {faculty.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. CALLOUT BOX */}
        <div
          style={{
            background: "#FFFBEB",
            border: "1px solid #FDE68A",
            borderRadius: "1rem",
            padding: "2.5rem 1.5rem",
            textAlign: "center",
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.375rem",
              fontWeight: 700,
              color: "var(--navy)",
              marginBottom: "0.5rem",
            }}
          >
            Want to interact with our mentors?
          </h3>
          <p
            style={{
              color: "#6B7280",
              fontSize: "0.875rem",
              marginBottom: "1.5rem",
            }}
          >
            Visit our Ashok Stambh, Nashik center for 1-on-1 career strategy
            sessions.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              background: "var(--orange)",
              color: "white",
              fontWeight: 600,
              fontSize: "0.875rem",
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              transition: "all 0.2s",
              boxShadow: "0 4px 10px rgba(244,90,10,0.2)",
            }}
          >
            Book Officer Guidance Session
          </Link>
        </div>
      </div>
    </div>
  );
}
