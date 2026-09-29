"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { AdmissionBadge } from "./CourseCard";

export default function CoursesClient({
  initialCourses = [],
  categories = [],
}) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCourses =
    activeCategory === "all"
      ? initialCourses
      : initialCourses.filter(
          (c) =>
            c.category_slug === activeCategory ||
            c.course_categories?.slug === activeCategory,
        );

  const bannerStyles = [
    { bg: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)", text: "MPSC" },
    { bg: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)", text: "ASO" },
    {
      bg: "linear-gradient(135deg, #065F46 0%, #10B981 100%)",
      text: "RAJYASEVA",
    },
    {
      bg: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
      text: "SARALSEVA",
    },
    {
      bg: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
      text: "SR EXAM",
    },
    { bg: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)", text: "PSI" },
    {
      bg: "linear-gradient(135deg, #1E40AF 0%, #1D4ED8 100%)",
      text: "GROUP B&C",
    },
    {
      bg: "linear-gradient(135deg, #B45309 0%, #D97706 100%)",
      text: "TALATHI",
    },
  ];

  return (
    <>
      {/* FILTER TABS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "0.625rem",
          marginBottom: "3rem",
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.id || cat.slug}
              type="button"
              onClick={() => setActiveCategory(cat.slug)}
              style={{
                padding: "0.45rem 1.25rem",
                borderRadius: "9999px",
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                border: isActive ? "none" : "1px solid #E5E7EB",
                background: isActive ? "var(--orange)" : "white",
                color: isActive ? "white" : "#4B5563",
                boxShadow: isActive ? "0 2px 8px rgba(244,90,10,0.25)" : "none",
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* 4-COLUMN COURSE CARDS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.75rem",
          marginBottom: "4rem",
        }}
      >
        {filteredCourses.map((course, idx) => {
          const banner = bannerStyles[idx % bannerStyles.length];
          const catName =
            course.category || course.course_categories?.name || "MPSC Batch";

          return (
            <div
              key={course.id || course.slug || idx}
              style={{
                background: "white",
                borderRadius: "1rem",
                overflow: "hidden",
                border: "1px solid #E5E7EB",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Card Banner */}
              {/* <div
                style={{
                  height: '140px',
                  background: course.banner_color || banner.bg,
                  position: 'relative',
                  padding: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              > */}
              {/* Admissions Open badge */}
              {/* <div
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    background: '#EA580C',
                    color: 'white',
                    fontSize: '0.625rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                  }}
                >
                  Admissions Open
                </div>

                <span
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    color: 'white',
                    opacity: 0.85,
                    letterSpacing: '0.05em'
                  }}
                >
                  {banner.text}
                </span>
              </div> */}

              <div style={{ position: 'relative', height: 180, background: 'var(--navy)', overflow: 'hidden', flexShrink: 0 }}>
        {course.image_url ?
        <Image
          src={course.image_url}
          alt={course.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" /> :


        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          
            <span style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: 'var(--gold)', fontWeight: 800, opacity: 0.5 }}>KY</span>
          </div>
        }
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
          <AdmissionBadge status={course.admission_status} />
        </div>
      </div>

              {/* Card Content */}
              <div
                style={{
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: "0.625rem",
                }}
              >
                {/* Category & Duration */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.75rem",
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#4B5563" }}>
                    {catName}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      color: "#6B7280",
                    }}
                  >
                    <Clock size={12} />
                    {course.duration || "52 Weeks"}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--navy)",
                    lineHeight: 1.35,
                  }}
                >
                  {course.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "#6B7280",
                    lineHeight: 1.55,
                    flex: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {course.short_description}
                </p>

                {/* Button */}
                <Link
                  href={`/courses/${course.slug}`}
                  style={{
                    marginTop: "0.75rem",
                    padding: "0.55rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #E5E7EB",
                    background: "white",
                    color: "#1F2937",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    textAlign: "center",
                    transition: "all 0.15s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.35rem",
                  }}
                  className="hover:border-gray-400 hover:bg-gray-50"
                >
                  <span>More Info & Syllabus</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
