"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Search, ArrowRight, BookOpen } from "lucide-react";

export default function BlogClient({ initialBlogs = [], categories = [] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = initialBlogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "all" ||
      blog.category_slug === activeCategory ||
      blog.blog_categories?.slug === activeCategory;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      blog.title.toLowerCase().includes(query) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const categoryColors = {
    recruitment: { bg: "#1E3A8A", text: "#BFDBFE" },
    "syllabus-guide": { bg: "#0369A1", text: "#BAE6FD" },
    "exam-strategy": { bg: "#92400E", text: "#FEF3C7" },
    "preparation-tips": { bg: "#5B21B6", text: "#DDD6FE" },
  };

  const gradients = [
    "linear-gradient(135deg, #B45309 0%, #D97706 50%, #DC2626 100%)",
    "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 50%, #1E3A8A 100%)",
    "linear-gradient(135deg, #047857 0%, #10B981 50%, #065F46 100%)",
    "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 50%, #4C1D95 100%)",
    "linear-gradient(135deg, #0284C7 0%, #38BDF8 50%, #0369A1 100%)",
  ];

  return (
    <>
      {/* FILTER PILLS & SEARCH BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.25rem",
          marginBottom: "3rem",
        }}
      >
        {/* Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id || cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                style={{
                  padding: "0.45rem 1.15rem",
                  borderRadius: "9999px",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  border: isActive ? "none" : "1px solid #E5E7EB",
                  background: isActive ? "var(--orange)" : "white",
                  color: isActive ? "white" : "#4B5563",
                  boxShadow: isActive
                    ? "0 2px 8px rgba(244,90,10,0.25)"
                    : "none",
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div style={{ position: "relative", minWidth: "240px" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "0.875rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9CA3AF",
            }}
          />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 1rem 0.5rem 2.35rem",
              borderRadius: "9999px",
              border: "1px solid #E5E7EB",
              background: "white",
              fontSize: "0.8125rem",
              color: "#374151",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* BLOG CARDS GRID */}
      {filteredBlogs.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          {filteredBlogs.map((blog, idx) => {
            const catSlug =
              blog.category_slug || blog.blog_categories?.slug || "recruitment";
            const catName =
              blog.category || blog.blog_categories?.name || "MPSC Guidance";
            const badgeColor = categoryColors[catSlug] || {
              bg: "#1E3A8A",
              text: "#BFDBFE",
            };
            const cardGradient = gradients[idx % gradients.length];

            return (
              <div
                key={blog.id || blog.slug || idx}
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Thumbnail Banner */}
                <div
                  style={{
                    height: "180px",
                    background: cardGradient,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    color: "white",
                  }}
                >
                  {blog.image_url || blog.featured_image ? (
                    <div
                      style={{
                        height: 200,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={blog.image_url || blog.featured_image}
                        alt={blog.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <span
                      style={{
                        fontSize: "2.5rem",
                        fontFamily: "Playfair Display, serif",
                        color: "var(--gold)",
                        fontWeight: 800,
                        opacity: 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      KY
                    </span>
                  )}

                  {/* <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      opacity: 0.9,
                    }}
                  >
                    <BookOpen size={18} />
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                      }}
                    >
                      KARMAYOGI ACADEMY
                    </span>
                  </div> */}
                </div>

                {/* Card Content */}
                <div
                  style={{
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      color: "#6B7280",
                      fontSize: "0.75rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <Calendar size={13} />
                    <span>
                      {blog.date ||
                        (blog.published_at
                          ? new Date(blog.published_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "Recent")}
                    </span>

                    <span
                      style={{
                        alignSelf: "flex-start",
                        background: "rgba(0, 0, 0, 0.65)",
                        backdropFilter: "blur(4px)",
                        color: "white",
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        padding: "0.2rem 0.625rem",
                        borderRadius: "0.25rem",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        marginLeft: "1rem",
                      }}
                    >
                      {catName}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.0625rem",
                      fontWeight: 700,
                      color: "var(--navy)",
                      lineHeight: 1.4,
                      marginBottom: "0.625rem",
                    }}
                  >
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="hover:text-[var(--orange)] transition-colors"
                    >
                      {blog.title}
                    </Link>
                  </h3>

                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "#4B5563",
                      lineHeight: 1.6,
                      marginBottom: "1.5rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {blog.excerpt}
                  </p>

                  <Link
                    href={`/blog/${blog.slug}`}
                    style={{
                      marginTop: "auto",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      color: "var(--orange)",
                    }}
                    className="hover:underline"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 1rem",
            background: "white",
            borderRadius: "1rem",
            border: "1px solid #E5E7EB",
            marginBottom: "4rem",
          }}
        >
          <p
            style={{ color: "#6B7280", fontSize: "1rem", marginBottom: "1rem" }}
          >
            No articles match your selected filter or search query.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            style={{
              background: "var(--orange)",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: 600,
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}
