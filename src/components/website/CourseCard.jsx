"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";

export function AdmissionBadge({ status }) {
  const config = {
    open: { label: "Admissions Open", class: "badge-open" },
    closed: { label: "Admissions Closed", class: "badge-closed" },
    limited: { label: "Limited Seats", class: "badge-limited" },
    upcoming: { label: "Upcoming", class: "badge-upcoming" },
  };
  const c = config[status] || config.open;
  return <span className={c.class}>{c.label}</span>;
}

export default function CourseCard({ course }) {
  const category = course.course_categories;

  return (
    <div
      className="card"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* Course image */}
      <div
        style={{
          position: "relative",
          height: 180,
          background: "var(--navy)",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {course.image_url ? (
          <Image
            src={course.image_url}
            alt={course.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "2.5rem",
                fontFamily: "Playfair Display, serif",
                color: "var(--gold)",
                fontWeight: 800,
                opacity: 0.5,
              }}
            >
              KY
            </span>
          </div>
        )}
        <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}>
          <AdmissionBadge status={course.admission_status} />
        </div>
      </div>

      {/* Card body */}
      <div
        style={{
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "0.5rem",
        }}
      >
        {/* Category + Duration */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {category && (
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--orange)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {category.name}
            </span>
          )}
          {course.duration && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.75rem",
                color: "var(--gray-500)",
              }}
            >
              <Clock size={12} />
              {course.duration}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--navy)",
            lineHeight: 1.35,
          }}
        >
          {course.title}
        </h3>

        {/* Short description */}
        {course.short_description && (
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--gray-600)",
              lineHeight: 1.6,
              flex: 1,
            }}
          >
            {course.short_description}
          </p>
        )}

        {/* CTA */}
        <Link
          href={`/courses/${course.slug}`}
          className="btn-primary"
          style={{
            marginTop: "0.75rem",
            fontSize: "0.8125rem",
            padding: "0.6rem 1rem",
            justifyContent: "center",
          }}
        >
          More Info & Syllabus
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
