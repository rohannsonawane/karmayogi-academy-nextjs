import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/website/PageHero";
import { getResults, getResultStatistics } from "@/lib/queries/results";

export const metadata = {
  title: "Results & Proven Track Record | Karmayogi Academy Nashik",
  description:
    "128+ Mains Qualifiers & selected post-holders across Maharashtra. View our top achievers and rank list.",
};

export default async function ResultsPage() {
  const [achievers, stats] = await Promise.all([
    getResults(),
    getResultStatistics(),
  ]);

  const avatarColors = ["#EA580C", "#1E40AF", "#D97706", "#E11D48", "#0D9488"];

  return (
    <div style={{ backgroundColor: "#FAF9F6", minHeight: "100vh" }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          background: "var(--navy)",
          padding: "4rem 1rem 3.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(31,66,149,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245,181,27,0.08) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="container-ka"
          style={{ position: "relative", zIndex: 1 }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.75rem",
            }}
          >
            HOME / RESULTS
          </p>
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 800,
              color: "white",
              marginBottom: "0.75rem",
              lineHeight: 1.2,
            }}
          >
            Results & Proven Track Record
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.75)",
              maxWidth: 650,
              margin: "0 auto 2.5rem",
              lineHeight: 1.65,
            }}
          >
            We take immense pride in announcing that the following candidates
            from Karmayogi Academy have successfully qualified for the Mains
            stage of the MPSC Combined Competitive Examination,
            <br />
            Heartiest congratulations to all the achievers! 🎉
          </p>

          {/* STATS COUNTER BAR */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "1.5rem",
              maxWidth: "900px",
              margin: "0 auto",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {stats.map((stat, idx) => (
              <div key={stat.id || idx} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                    fontWeight: 800,
                    color: "var(--gold)",
                    lineHeight: 1.1,
                    marginBottom: "0.35rem",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.85)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-ka" style={{ padding: "4.5rem 1rem" }}>
        {/* 2. OUR TOP ACHIEVERS */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--orange)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.35rem",
            }}
          >
            PRIDE OF KARMAYOGI
          </span>
          <h2
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "2.25rem",
              fontWeight: 800,
              color: "var(--navy)",
            }}
          >
            Our Top Achievers
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            marginBottom: "4.5rem",
          }}
        >
          {achievers.map((achiever, idx) => {
            const avatarBg = avatarColors[idx % avatarColors.length];

            return (
              <div
                key={achiever.id || idx}
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  padding: "2.25rem 1.5rem",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: avatarBg,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.75rem",
                    fontWeight: 800,
                    marginBottom: "0.5rem",
                  }}
                >
                  {achiever.photo_url ? (
                    <Image
                      src={achiever.photo_url}
                      alt={achiever.student_name}
                      width={72}
                      height={72}
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    achiever.student_name.charAt(0)
                  )}
                </div>

                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "var(--navy)",
                  }}
                >
                  {achiever.student_name}
                </h3>

                <div
                  style={{
                    background: "var(--orange)",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    padding: "0.25rem 0.875rem",
                    borderRadius: "9999px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {achiever.post_secured}
                </div>

                <div style={{ fontSize: "0.8125rem", color: "#6B7280" }}>
                  {achiever.batch || `${achiever.exam} (${achiever.year})`}
                </div>

                {achiever.quote && (
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "#4B5563",
                      fontStyle: "italic",
                      lineHeight: 1.6,
                      marginTop: "0.5rem",
                    }}
                  >
                    &ldquo;{achiever.quote}&rdquo;
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* 3. MAINS QUALIFIED LEADERBOARD */}
        <div
          style={{
            background: "white",
            borderRadius: "1.25rem",
            padding: "2.5rem",
            border: "1px solid #E5E7EB",
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
            maxWidth: "1000px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--navy)",
              marginBottom: "2rem",
            }}
          >
            Mains Qualified Leaderboard
          </h3>

          <div style={{ overflowX: "auto", marginBottom: "2.5rem" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                minWidth: "600px",
              }}
            >
              <thead>
                <tr style={{ background: "#1E3A8A", color: "white" }}>
                  <th
                    style={{
                      padding: "0.875rem 1.25rem",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    STUDENT NAME
                  </th>
                  <th
                    style={{
                      padding: "0.875rem 1.25rem",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    EXAM
                  </th>
                  <th
                    style={{
                      padding: "0.875rem 1.25rem",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    POST SECURED
                  </th>
                  <th
                    style={{
                      padding: "0.875rem 1.25rem",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    YEAR
                  </th>
                  <th
                    style={{
                      padding: "0.875rem 1.25rem",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      textAlign: "right",
                    }}
                  >
                    RESULT/RANK
                  </th>
                </tr>
              </thead>
              <tbody>
                {achievers.map((row, idx) => (
                  <tr
                    key={row.id || idx}
                    style={{
                      borderBottom: "1px solid #F3F4F6",
                      backgroundColor: idx % 2 === 0 ? "white" : "#F9FAFB",
                    }}
                  >
                    <td
                      style={{
                        padding: "1rem 1.25rem",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--navy)",
                      }}
                    >
                      {row.student_name}
                    </td>
                    <td
                      style={{
                        padding: "1rem 1.25rem",
                        fontSize: "0.8125rem",
                        color: "#4B5563",
                      }}
                    >
                      {row.exam}
                    </td>
                    <td
                      style={{
                        padding: "1rem 1.25rem",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--orange)",
                      }}
                    >
                      {row.post_secured}
                    </td>
                    <td
                      style={{
                        padding: "1rem 1.25rem",
                        fontSize: "0.8125rem",
                        color: "#6B7280",
                      }}
                    >
                      {row.year}
                    </td>
                    <td
                      style={{
                        padding: "1rem 1.25rem",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: "var(--navy)",
                        textAlign: "right",
                      }}
                    >
                      {row.result_rank || "Qualified"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            href="/courses"
            style={{
              display: "inline-block",
              background: "var(--orange)",
              color: "white",
              fontWeight: 600,
              fontSize: "0.9375rem",
              padding: "0.875rem 2.5rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 12px rgba(244,90,10,0.25)",
              transition: "all 0.2s",
            }}
          >
            Join Next Officer Batch
          </Link>
        </div>
      </div>
    </div>
  );
}
