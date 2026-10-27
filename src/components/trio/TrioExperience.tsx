/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Menu, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trioContent as c, type MediaAsset } from "@/content/trio";
import { cn } from "@/lib/utils";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { FundingSection } from "@/components/Funding/FundingSection";

function Placeholder({ media, className = "" }: { media: MediaAsset; className?: string }) {
  if (media.src)
    return (
      <img
        src={media.src}
        alt={media.alt}
        className={cn("h-full w-full object-cover", className)}
        loading="lazy"
      />
    );
  return (
    <div role="img" aria-label={media.alt} className={cn("placeholder-media", className)}>
      <span>{media.label}</span>
    </div>
  );
}

function TitleMark({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const { logo } = c.branding;
  return (
    <span className={cn("title-mark", className)}>
      <img
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
      />
    </span>
  );
}

function Intro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const id = window.setTimeout(onComplete, 5600);
    return () => window.clearTimeout(id);
  }, [onComplete]);
  return (
    <div className="intro-screen" aria-label="TRIO introduction" suppressHydrationWarning>
      <Button variant="ghost" size="sm" className="intro-skip" onClick={onComplete}>
        {c.intro.skip}
      </Button>
      <div className="intro-sequence" suppressHydrationWarning>
        <p suppressHydrationWarning>{c.intro.presenter}</p>
        <h1 style={{ position: "relative" }} suppressHydrationWarning>
          <TitleMark className="intro-title-mark" priority />
        </h1>
        <div className="intro-tagline" suppressHydrationWarning>
          {c.film.tagline.split("\n").map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <small suppressHydrationWarning>{c.intro.system}</small>
      </div>
    </div>
  );
}

function Navigation({ onWatch }: { onWatch: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <header className={cn("site-nav", scrolled && "site-nav-scrolled", open && "menu-open")}>
      <a className="wordmark" href="#top" aria-label="TRIO home">
        <TitleMark priority />
      </a>
      <nav className="desktop-links" aria-label="Main navigation">
        {c.navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <Button variant="cinematic" size="lg" className="nav-watch glass-soft" onClick={onWatch}>
        {c.ctas.watch}
        <ArrowRight />
      </Button>
      <Button
        variant="iconGhost"
        size="icon"
        className="menu-button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-menu glass-heavy"
          >
            <div className="mobile-menu-top">
              <span className="wordmark">
                <TitleMark priority />
              </span>
              <Button
                variant="iconGhost"
                size="icon"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
            </div>
            <nav>
              {c.navigation.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  <small>0{i + 1}</small>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <Button
              variant="cinematic"
              size="lg"
              className="glass-soft"
              onClick={() => {
                setOpen(false);
                onWatch();
              }}
            >
              {c.ctas.watch}
              <ArrowRight />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="section-label">{children}</p>;
}

function TrailerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const fn = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-backdrop glass-heavy"
          role="dialog"
          aria-modal="true"
          aria-label="TRIO teaser"
        >
          <Button
            variant="iconGhost"
            size="icon"
            className="modal-close"
            onClick={onClose}
            aria-label="Close teaser"
          >
            <X />
          </Button>
          {c.film.teaserUrl ? (
            <iframe
              src={c.film.teaserUrl}
              title="TRIO Official Teaser"
              className="trailer-video"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <div className="trailer-missing">
              <span>D6 // SIGNAL PENDING</span>
              <h2>TEASER COMING SOON</h2>
              <p>The official teaser will appear here when released.</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WorldMorphingGrid({
  cards,
  expandedIndex,
  onSelectCard,
}: {
  cards: typeof c.world.cards;
  expandedIndex: number | null;
  onSelectCard: (index: number | null) => void;
}) {
  // Keyboard navigation when expanded
  useEffect(() => {
    if (expandedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onSelectCard(null);
      } else if (e.key === "ArrowLeft") {
        onSelectCard((expandedIndex - 1 + cards.length) % cards.length);
      } else if (e.key === "ArrowRight") {
        onSelectCard((expandedIndex + 1) % cards.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedIndex, cards.length, onSelectCard]);

  return (
    <div className="world-morph-grid" role="region" aria-label="World of TRIO Cards">
      {cards.map((card, i) => {
        const isExpanded = expandedIndex === i;
        const isNeighbor = expandedIndex !== null && !isExpanded;
        const isUnexpanded = expandedIndex === null;

        // Dynamic position-aware flex sizing
        // When unexpanded: all cards flex: 1 1 0% (equal 33.3%)
        // When expanded: active card takes 74%, neighbors take 11.5% each
        const flexStyle = isUnexpanded ? "1 1 0%" : isExpanded ? "0 0 74%" : "0 0 11.5%";

        // Position-aware expansion direction:
        // Left card (0): expands towards right
        // Middle card (1): expands symmetrically in both directions
        // Right card (2): expands towards left
        const expandOrigin =
          i === 0 ? "left center" : i === cards.length - 1 ? "right center" : "center center";
        const contentEntranceX = i === 0 ? -24 : i === cards.length - 1 ? 24 : 0;

        const cardTransition: any = {
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        };

        return (
          <motion.div
            key={card.title}
            layout
            style={{
              flex: flexStyle,
              transformOrigin: expandOrigin,
            }}
            transition={{
              layout: cardTransition,
            }}
            className={cn(
              "world-morph-card",
              isUnexpanded && "is-unexpanded",
              isExpanded && "is-expanded",
              isNeighbor && "is-spine",
            )}
            onClick={() => {
              if (!isExpanded) {
                onSelectCard(i);
              }
            }}
            role={isExpanded ? "region" : "button"}
            tabIndex={isExpanded ? -1 : 0}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? `${card.title} expanded file` : `Expand ${card.title} dossier`}
            onKeyDown={(e) => {
              if (!isExpanded && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onSelectCard(i);
              }
            }}
          >
            {/* STATE 1: UNEXPANDED CARD (Initial horizontal row) */}
            {isUnexpanded && (
              <div className="world-unexpanded-inner">
                <div className="world-card-image-wrap">
                  {card.media.src ? (
                    <motion.img
                      layoutId={`world-card-img-${card.title}`}
                      transition={cardTransition}
                      src={card.media.src}
                      alt={card.media.alt}
                      className={cn(
                        "world-card-img",
                        card.title === "DOMINOR" && "media-dominor",
                        card.title === "THE TRIO" && "media-trio",
                      )}
                      loading="eager"
                      decoding="sync"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={(card.media as MediaAsset).alt}
                      className="placeholder-media h-full w-full"
                    >
                      <span>{(card.media as MediaAsset).label}</span>
                    </div>
                  )}
                  <div className="world-card-gradient-overlay" />
                </div>

                <div className="world-unexpanded-index">0{i + 1}</div>

                <div className="world-unexpanded-copy">
                  <motion.h3
                    layoutId={`world-card-title-${card.title}`}
                    transition={cardTransition}
                    className="world-unexpanded-title"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="world-unexpanded-cta"
                  >
                    <span>
                      ACCESS FILE <ArrowRight size={13} />
                    </span>
                  </motion.div>
                </div>
              </div>
            )}

            {/* STATE 2: COLLAPSED NEIGHBOR SPINE */}
            {isNeighbor && (
              <div className="world-spine-inner">
                {card.media.src ? (
                  <motion.img
                    layoutId={`world-card-img-${card.title}`}
                    transition={cardTransition}
                    src={card.media.src}
                    alt={card.media.alt}
                    className={cn(
                      "world-spine-img",
                      card.title === "DOMINOR" && "media-dominor",
                      card.title === "THE TRIO" && "media-trio",
                    )}
                  />
                ) : (
                  <div className="placeholder-media h-full w-full">
                    <span className="text-[0.6rem]">{(card.media as MediaAsset).label}</span>
                  </div>
                )}
                <div className="world-spine-overlay" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                  className="world-spine-content"
                >
                  <span className="world-spine-num">0{i + 1}</span>
                  <span className="world-spine-title">{card.title}</span>
                  <span className="world-spine-hint">EXPAND</span>
                </motion.div>
              </div>
            )}

            {/* STATE 3: ACTIVE EXPANDED CARD */}
            {isExpanded && (
              <div className="world-expanded-inner">
                {/* Stage B — Image transformation: Left side with smooth feathered gradient blend */}
                <div
                  className={cn(
                    "world-expanded-image-pane",
                    card.title === "DOMINOR" && "media-dominor",
                    card.title === "THE TRIO" && "media-trio",
                  )}
                >
                  {card.media.src ? (
                    <motion.img
                      layoutId={`world-card-img-${card.title}`}
                      transition={cardTransition}
                      src={card.media.src}
                      alt={card.media.alt}
                      className={cn(
                        "world-expanded-img",
                        card.title === "DOMINOR" && "media-dominor",
                        card.title === "THE TRIO" && "media-trio",
                      )}
                      loading="eager"
                      decoding="sync"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={(card.media as MediaAsset).alt}
                      className="placeholder-media h-full w-full"
                    >
                      <span>{(card.media as MediaAsset).label}</span>
                    </div>
                  )}
                  {/* Seamless feathered blend overlay */}
                  <div className="world-expanded-image-blend" />
                </div>

                {/* Stage C & D — Title & Content reveal on the right side */}
                <motion.div
                  key={`content-${card.title}`}
                  className="world-expanded-content-pane"
                  initial={{ opacity: 0, x: contentEntranceX, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.2 } }}
                  transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="world-expanded-scroll-wrap">
                    <div className="world-expanded-header">
                      <div className="world-expanded-top-bar">
                        <motion.h3
                          layoutId={`world-card-title-${card.title}`}
                          transition={cardTransition}
                          className="world-expanded-title"
                        >
                          {card.title}
                        </motion.h3>

                        <button
                          type="button"
                          className="world-morph-close-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCard(null);
                          }}
                          aria-label="Collapse card"
                          title="Collapse card (Esc)"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      {card.subtitle && (
                        <span className="world-expanded-subtitle">{card.subtitle}</span>
                      )}
                    </div>

                    <div className="world-expanded-body">
                      {card.details.map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          {paragraph.split(/(\*[^*]+\*)/g).map((chunk, cIdx) => {
                            if (chunk.startsWith("*") && chunk.endsWith("*")) {
                              return <em key={cIdx}>{chunk.slice(1, -1)}</em>;
                            }
                            return chunk;
                          })}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Navigation */}
                  <div className="world-expanded-footer">
                    <button
                      type="button"
                      className="world-morph-nav-arrow"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCard((i - 1 + cards.length) % cards.length);
                      }}
                      aria-label="Previous file"
                      title="Previous file"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <div className="world-morph-dots">
                      {cards.map((cItem, dIdx) => (
                        <button
                          key={cItem.title}
                          type="button"
                          aria-label={`Jump to ${cItem.title}`}
                          className={cn("world-morph-dot", dIdx === i && "active")}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCard(dIdx);
                          }}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      className="world-morph-nav-arrow"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCard((i + 1) % cards.length);
                      }}
                      aria-label="Next file"
                      title="Next file"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function ThreeMorphingGrid({
  people,
  expandedIndex,
  onSelectPerson,
}: {
  people: typeof c.characters.people;
  expandedIndex: number | null;
  onSelectPerson: (index: number | null) => void;
}) {
  // Keyboard navigation when expanded
  useEffect(() => {
    if (expandedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onSelectPerson(null);
      } else if (e.key === "ArrowLeft") {
        onSelectPerson((expandedIndex - 1 + people.length) % people.length);
      } else if (e.key === "ArrowRight") {
        onSelectPerson((expandedIndex + 1) % people.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedIndex, people.length, onSelectPerson]);

  return (
    <div className="world-morph-grid" role="region" aria-label="The Three Central Figures">
      {people.map((person, i) => {
        const isExpanded = expandedIndex === i;
        const isNeighbor = expandedIndex !== null && !isExpanded;
        const isUnexpanded = expandedIndex === null;

        const personImage: MediaAsset =
          typeof person.image === "string"
            ? { src: person.image, alt: `${person.name} in TRIO`, label: person.name }
            : {
                src: person.image.src || "",
                alt: person.image.alt || `${person.name} in TRIO`,
                label: person.image.label || person.name,
              };

        const flexStyle = isUnexpanded ? "1 1 0%" : isExpanded ? "0 0 74%" : "0 0 11.5%";

        const expandOrigin =
          i === 0 ? "left center" : i === people.length - 1 ? "right center" : "center center";
        const contentEntranceX = i === 0 ? -24 : i === people.length - 1 ? 24 : 0;

        const cardTransition: any = {
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        };

        return (
          <motion.div
            key={person.name}
            layout
            style={{
              flex: flexStyle,
              transformOrigin: expandOrigin,
            }}
            transition={{
              layout: cardTransition,
            }}
            className={cn(
              "world-morph-card",
              isUnexpanded && "is-unexpanded",
              isExpanded && "is-expanded",
              isNeighbor && "is-spine",
            )}
            onClick={() => {
              if (!isExpanded) {
                onSelectPerson(i);
              }
            }}
            role={isExpanded ? "region" : "button"}
            tabIndex={isExpanded ? -1 : 0}
            aria-expanded={isExpanded}
            aria-label={
              isExpanded ? `${person.name} expanded profile` : `Expand ${person.name} profile`
            }
            onKeyDown={(e) => {
              if (!isExpanded && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onSelectPerson(i);
              }
            }}
          >
            {/* STATE 1: UNEXPANDED CARD */}
            {isUnexpanded && (
              <div className="world-unexpanded-inner">
                <div className="world-card-image-wrap">
                  {personImage.src ? (
                    <motion.img
                      layoutId={`person-img-${person.name}`}
                      transition={cardTransition}
                      src={personImage.src}
                      alt={personImage.alt}
                      className="world-card-img"
                      style={{ objectPosition: "center 15%" }}
                      loading="eager"
                      decoding="sync"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={personImage.alt}
                      className="placeholder-media h-full w-full"
                    >
                      <span>{personImage.label}</span>
                    </div>
                  )}
                  <div className="world-card-gradient-overlay" />
                </div>

                <div className="world-unexpanded-index">0{i + 1}</div>

                <div className="world-unexpanded-copy">
                  <motion.h3
                    layoutId={`person-title-${person.name}`}
                    transition={cardTransition}
                    className="world-unexpanded-title"
                  >
                    {person.name}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="world-unexpanded-cta"
                  >
                    <span>
                      VIEW PROFILE <ArrowRight size={13} />
                    </span>
                  </motion.div>
                </div>
              </div>
            )}

            {/* STATE 2: COLLAPSED NEIGHBOR SPINE */}
            {isNeighbor && (
              <div className="world-spine-inner">
                {personImage.src ? (
                  <motion.img
                    layoutId={`person-img-${person.name}`}
                    transition={cardTransition}
                    src={personImage.src}
                    alt={personImage.alt}
                    className="world-spine-img"
                    style={{ objectPosition: "center 15%" }}
                  />
                ) : (
                  <div className="placeholder-media h-full w-full">
                    <span className="text-[0.6rem]">{personImage.label}</span>
                  </div>
                )}
                <div className="world-spine-overlay" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                  className="world-spine-content"
                >
                  <span className="world-spine-num">0{i + 1}</span>
                  <span className="world-spine-title">{person.name}</span>
                  <span className="world-spine-hint">EXPAND</span>
                </motion.div>
              </div>
            )}

            {/* STATE 3: ACTIVE EXPANDED CARD */}
            {isExpanded && (
              <div className="world-expanded-inner">
                {/* Left Portrait Column with subtle feathered edge */}
                <div className="world-expanded-image-pane">
                  {personImage.src ? (
                    <motion.img
                      layoutId={`person-img-${person.name}`}
                      transition={cardTransition}
                      src={personImage.src}
                      alt={personImage.alt}
                      className="world-expanded-img"
                      style={{ objectPosition: "center 15%" }}
                      loading="eager"
                      decoding="sync"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={personImage.alt}
                      className="placeholder-media h-full w-full"
                    >
                      <span>{personImage.label}</span>
                    </div>
                  )}
                  <div className="world-expanded-image-blend" />
                </div>

                {/* Right Content Column */}
                <motion.div
                  key={`person-content-${person.name}`}
                  className="world-expanded-content-pane"
                  initial={{ opacity: 0, x: contentEntranceX, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.2 } }}
                  transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="world-expanded-scroll-wrap">
                    <div className="world-expanded-header">
                      <div className="world-expanded-top-bar">
                        <motion.h3
                          layoutId={`person-title-${person.name}`}
                          transition={cardTransition}
                          className="world-expanded-title"
                        >
                          {person.name}
                        </motion.h3>

                        <button
                          type="button"
                          className="world-morph-close-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPerson(null);
                          }}
                          aria-label="Collapse profile"
                          title="Collapse (Esc)"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      {person.role && (
                        <span className="world-expanded-subtitle">{person.role}</span>
                      )}
                    </div>

                    <div className="world-expanded-body">
                      {person.details.map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          {paragraph.split(/(\*[^*]+\*)/g).map((chunk, cIdx) => {
                            if (chunk.startsWith("*") && chunk.endsWith("*")) {
                              return <em key={cIdx}>{chunk.slice(1, -1)}</em>;
                            }
                            return chunk;
                          })}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Navigation */}
                  <div className="world-expanded-footer">
                    <button
                      type="button"
                      className="world-morph-nav-arrow"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPerson((i - 1 + people.length) % people.length);
                      }}
                      aria-label="Previous profile"
                      title="Previous profile"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <div className="world-morph-dots">
                      {people.map((pItem, dIdx) => (
                        <button
                          key={pItem.name}
                          type="button"
                          aria-label={`Jump to ${pItem.name}`}
                          className={cn("world-morph-dot", dIdx === i && "active")}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPerson(dIdx);
                          }}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      className="world-morph-nav-arrow"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPerson((i + 1) % people.length);
                      }}
                      aria-label="Next profile"
                      title="Next profile"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

const AtmosphericBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Cool grey cinematic haze */}
      <motion.div
        animate={{
          x: ["-10vw", "10vw", "-5vw", "-10vw"],
          y: ["-10vh", "20vh", "5vh", "-10vh"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[60vh] rounded-full bg-[radial-gradient(circle,rgba(200,220,255,0.015)_0%,transparent_70%)]"
      />
      {/* Subtle red signal/flare */}
      <motion.div
        animate={{
          x: ["10vw", "-15vw", "5vw", "10vw"],
          y: ["10vh", "-10vh", "15vh", "10vh"],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] right-[10%] w-[50vw] h-[50vh] rounded-full bg-[radial-gradient(circle,rgba(255,60,60,0.025)_0%,transparent_70%)]"
      />

      {/* Floating HUD tracking crosses for subtle atmosphere */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] left-[8%] w-4 h-4 border-t border-l border-primary/40"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[12%] w-4 h-4 border-b border-r border-primary/40"
        />

        <motion.div
          animate={{ opacity: [0.05, 0.25, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
          className="absolute top-[65%] left-[15%] w-1.5 h-1.5 rounded-full bg-primary/30"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.25, 0.05] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
          className="absolute bottom-[35%] right-[25%] w-1.5 h-1.5 rounded-full bg-primary/30"
        />
      </div>
    </div>
  );
};

const SystemInterlude = () => {
  const letters = "D6 STATUS: NOT FOUND".split("");
  const [glitching, setGlitching] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      onViewportEnter={() => {
        setGlitching(false);
        setTimeout(() => setGlitching(true), 3000);
      }}
      onViewportLeave={() => setGlitching(false)}
      className="system-interlude"
      aria-hidden="true"
    >
      <motion.span
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: [0, 1, 0, 1],
            transition: { duration: 0.8, times: [0, 0.2, 0.5, 1] },
          },
        }}
      >
        SCANNING...
      </motion.span>

      <motion.strong
        className={cn(
          "relative inline-block text-primary font-display",
          glitching && "cyber-glitch-parent",
        )}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 1 } },
        }}
      >
        {letters.map((char, i) => (
          <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            {char}
          </motion.span>
        ))}

        {glitching && (
          <>
            <span className="cyber-glitch-layer cyan">D6 STATUS: NOT FOUND</span>
            <span className="cyber-glitch-layer fuchsia">D6 STATUS: NOT FOUND</span>
          </>
        )}
      </motion.strong>

      <motion.em
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: [0, 1, 0, 1, 0, 1],
            scale: 1,
            transition: { delay: 3.5, duration: 0.6 },
          },
        }}
      >
        ACCESS DENIED
      </motion.em>
    </motion.div>
  );
};

function BehindGallery() {
  const gallery = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    if (!gallery.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setCompact(entry.contentRect.width < 640);
    });
    observer.observe(gallery.current);
    return () => observer.disconnect();
  }, []);

  // Vary row sizes while sharing each row's height in the original aspect ratios.
  const rowSizes = compact ? [2] : [2, 3, 3, 2, 3, 2, 2];
  const rows: (typeof c.behind.images)[] = [];
  for (let start = 0; start < c.behind.images.length;) {
    const size = rowSizes[rows.length % rowSizes.length];
    rows.push(c.behind.images.slice(start, start + size));
    start += size;
  }

  return (
    <div ref={gallery} className="bts-gallery">
      {rows.map((row) => (
        <div className="bts-row" key={row[0].src}>
          {row.map((image) => (
            <figure
              key={image.src}
              className="bts-scene"
              style={{ flexGrow: image.width / image.height }}
            >
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
              />
              <figcaption className="glass-soft">{image.label}</figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TrioExperience() {
  const [intro, setIntro] = useState(true);
  const [trailer, setTrailer] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [expandedPerson, setExpandedPerson] = useState<number | null>(null);
  const once = useRef(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  useEffect(() => {
    if (!once.current && !intro) {
      once.current = true;
      sessionStorage.setItem("trio-intro-seen", "1");
    }
  }, [intro]);
  useEffect(() => {
    if (sessionStorage.getItem("trio-intro-seen")) setIntro(false);
  }, []);
  const openTrailer = () => setTrailer(true);

  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  const blurMorph: any = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 1.0,
        delayChildren: 0.4,
      },
    },
  };

  const blurMorphItem: any = {
    hidden: {
      opacity: 0,
      filter: "blur(32px)",
      y: 20,
      scale: 0.94,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scale: 1,
      transition: {
        duration: 3.0,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <div className="trio-site" id="top" suppressHydrationWarning>
      <AtmosphericBackground />
      {intro && <Intro onComplete={() => setIntro(false)} />}
      <Navigation onWatch={openTrailer} />
      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
            <Placeholder media={c.heroMedia} className="hero-media" />
          </motion.div>
          <div className="hero-overlay" />
          <div className="hero-system">
            D6 // PUBLIC TRANSMISSION
            <br />
            STATUS: MONITORED
          </div>
          <div className="hero-content">
            <motion.p initial="hidden" animate="visible" variants={fadeUp} className="hero-eyebrow">
              {c.film.studio} PRESENTS
            </motion.p>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, filter: "blur(10px)" },
                visible: {
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: { duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as any },
                },
              }}
              id="hero-title"
              suppressHydrationWarning
            >
              <TitleMark className="hero-title-mark" priority />
            </motion.h1>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.3 }}
              className="hero-tagline"
            >
              {c.film.tagline.split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </motion.div>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.4 }}
              className="hero-inspiration"
            >
              {c.film.inspiration}
            </motion.p>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 1, delay: 0.6 } },
              }}
              className="hero-actions"
            >
              <Button variant="cinematic" size="xl" className="glass-soft" onClick={openTrailer}>
                <Play />
                {c.ctas.watch}
              </Button>
              <Button variant="cinematicGhost" className="glass-soft bg-black/20" size="xl" asChild>
                <a href="#story">
                  {c.ctas.explore}
                  <ArrowDown />
                </a>
              </Button>
            </motion.div>
          </div>
          <a className="scroll-cue" href="#story">
            <span>SCROLL TO ENTER</span>
            <ArrowDown />
          </a>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          id="story"
          className="story-section section-wrap"
        >
          <div className="w-full glass-soft p-6 sm:p-8 md:p-12 lg:p-16 rounded-xl border border-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--primary)/8%_0%,transparent_70%)]" />
            </div>
            <div className="relative z-10">
              <div className="story-grid">
                <div>
                  <SectionLabel>{c.story.label}</SectionLabel>
                  <h2 className="display-heading">
                    {c.story.heading.split("\n").map((line, index) => (
                      <span
                        key={line}
                        className="block"
                        style={index === 0 ? { color: "#B7191C" } : undefined}
                      >
                        {line}
                      </span>
                    ))}
                  </h2>
                  <div className="story-copy">
                    {c.story.synopsis.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
                <div className="story-visual">
                  <Placeholder media={c.story.media} />
                  <div className="frame-code">FRAME 138A / ARCHIVE</div>
                </div>
              </div>
              <div className="story-beats">
                {c.story.beats.map((beat, i) => (
                  <div key={beat}>
                    <small>0{i + 1}</small>
                    <strong>{beat}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <SystemInterlude />

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          id="world"
          className="world-section section-wrap"
        >
          <div className="w-full glass-soft p-6 sm:p-8 md:p-12 lg:p-16 rounded-xl border border-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--primary)/8%_0%,transparent_70%)]" />
            </div>
            <div className="relative z-10">
              <SectionLabel>{c.world.label}</SectionLabel>
              <div className="section-intro">
                <h2 className="display-heading">{c.world.heading}</h2>
                <p>{c.world.copy}</p>
              </div>
              <WorldMorphingGrid
                cards={c.world.cards}
                expandedIndex={expandedCard}
                onSelectCard={setExpandedCard}
              />
            </div>
          </div>
        </motion.section>

        <section className="quote-break">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, filter: "blur(10px)" },
              visible: {
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: 2, ease: "easeInOut" },
              },
            }}
            className="quote-line muted-line"
          >
            {c.quote[0]}
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, filter: "blur(10px)", y: 30 },
              visible: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: { duration: 2, delay: 0.5, ease: "easeInOut" },
              },
            }}
            className="quote-line"
          >
            {c.quote[1]}
          </motion.div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          id="vision"
          className="vision-section section-wrap"
        >
          <div className="w-full glass-soft p-6 sm:p-8 md:p-12 lg:p-16 rounded-xl border border-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--primary)/8%_0%,transparent_70%)]" />
            </div>
            <div className="relative z-10">
              <SectionLabel>{c.vision.label}</SectionLabel>
              <h2 className="vision-heading">
                {c.vision.heading.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
              <div className="vision-body">
                <div className="vision-signature">
                  <strong>{c.creators.title}</strong>
                  <span>×</span>
                  <strong>{c.film.studio}</strong>
                </div>
                <div className="vision-copy">
                  {c.vision.copy.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <FundingSection />

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          id="behind"
          className="behind-section section-wrap"
        >
          <div className="w-full glass-soft p-6 sm:p-8 md:p-12 lg:p-16 rounded-xl border border-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--primary)/8%_0%,transparent_70%)]" />
            </div>
            <div className="relative z-10">
              <SectionLabel>{c.behind.label}</SectionLabel>
              <div className="section-intro">
                <h2 className="display-heading">{c.behind.heading}</h2>
                <p>{c.behind.copy}</p>
              </div>
              <ol className="production-timeline">
                {c.behind.stages.map((stage, i) => (
                  <li key={stage.name}>
                    <div className="pr-8 flex flex-col h-full justify-between pb-4">
                      <div>
                        <span className="text-primary text-xs tracking-[0.25em] block mb-2 font-mono">
                          0{i + 1} // FILE.SYS
                        </span>
                        <strong className="block text-4xl sm:text-[2.5rem] font-display font-bold uppercase tracking-wide mb-6 text-white">
                          {stage.name}
                        </strong>
                      </div>

                      <div className="mt-8">
                        <div className="flex justify-between items-end mb-3">
                          <span className="text-xs font-mono tracking-[0.2em] uppercase text-white/50">
                            {stage.completion === 100 ? "VERIFIED" : "CALCULATING"}
                          </span>
                          <span className="font-display text-5xl leading-none font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                            {stage.completion}
                            <span className="text-primary text-2xl ml-1">%</span>
                          </span>
                        </div>

                        <div className="h-6 w-full bg-background/80 border border-white/10 rounded-sm relative p-[2px] overflow-hidden shadow-[inset_0_2px_15px_rgba(0,0,0,0.9)] backdrop-blur-md">
                          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_0%,transparent_calc(100%-1px),#fff_calc(100%-1px))] bg-[length:6px_100%]" />

                          <motion.div
                            className="h-full relative rounded-[1px]"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${stage.completion}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1.8,
                              delay: i * 0.2 + 0.2,
                              ease: [0.16, 1, 0.3, 1] as any,
                            }}
                            style={{
                              boxShadow: "0 0 25px var(--primary)",
                              background:
                                "linear-gradient(90deg, var(--primary) 0%, oklch(0.65 0.22 27) 100%)",
                            }}
                          >
                            <div className="absolute top-0 right-0 w-1.5 h-full bg-white opacity-90 shadow-[0_0_10px_white]" />
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/40" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <BehindGallery />
            </div>
          </div>
        </motion.section>

        <section id="the-three" className="characters-section section-wrap">
          <div className="w-full glass-soft p-6 sm:p-8 md:p-12 lg:p-16 rounded-xl border border-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--primary)/8%_0%,transparent_70%)]" />
            </div>
            <div className="relative z-10">
              <div className="mb-12 sm:mb-20 md:mb-32 lg:mb-40">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={fadeUp}
                >
                  <SectionLabel>{c.characters.label}</SectionLabel>
                </motion.div>
                <div className="three-heading-container">
                  <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={blurMorph}
                    className="the-three-heading tracking-tight"
                  >
                    <motion.span variants={blurMorphItem} className="phrase-item">
                      THREE MEN.
                    </motion.span>
                    <motion.span variants={blurMorphItem} className="phrase-item phrase-red">
                      ONE GOD.
                    </motion.span>
                    <motion.span variants={blurMorphItem} className="phrase-item">
                      ONE STAND.
                    </motion.span>
                  </motion.h2>
                </div>
              </div>
              <ThreeMorphingGrid
                people={c.characters.people}
                expandedIndex={expandedPerson}
                onSelectPerson={setExpandedPerson}
              />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={fadeUp}
                className="creators-section mt-24 md:mt-36 lg:mt-44"
              >
                <div className="creators-mark">
                  <h2>{c.creators.title}</h2>
                  <p>{c.creators.subtitle}</p>
                </div>
                <div className="creators-copy">
                  <p>{c.creators.copy}</p>
                  <div>
                    {c.creators.names.map((name, i) => (
                      <span key={name}>
                        <small>0{i + 1}</small>
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          id="watch"
          className="watch-section"
        >
          <Placeholder media={c.trailer.poster} />
          <div className="watch-overlay" />
          <div className="watch-content">
            <p>{c.trailer.eyebrow}</p>
            <h2>{c.trailer.heading}</h2>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="play"
                size="play"
                className="glass-soft"
                onClick={openTrailer}
                aria-label="Play TRIO teaser"
              >
                <Play fill="currentColor" />
              </Button>
            </motion.div>
            <div className="release-lockup">
              <TitleMark className="watch-title-mark" />
              <span>{c.film.releaseDate || c.film.releaseStatus}</span>
            </div>
          </div>
        </motion.section>

        <section className="credits-section section-wrap">
          <div className="credits-title">
            <h2>
              <TitleMark className="credits-title-mark" />
            </h2>
            <p>{c.creators.subtitle}</p>
          </div>
          <dl className="credits-list">
            {c.credits.map((credit, i) => (
              <div key={`${credit.role}-${i}`}>
                <dt>{credit.role}</dt>
                <dd>
                  {credit.names.map((name) => {
                    const parts = name.split(" as ");
                    if (parts.length === 2) {
                      return (
                        <span key={name} className="credits-entry">
                          <span className="credits-actor">{parts[0]}</span>
                          <span className="credits-role text-muted-foreground font-normal">
                            as {parts[1]}
                          </span>
                        </span>
                      );
                    }
                    return <span key={name}>{name}</span>;
                  })}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="final-section">
          <div>
            <p>{c.finalMessage[0]}</p>
            <h2>
              {c.finalMessage[1].replace("HE LIVES!", "")}
              <span className="text-muted-foreground" style={{ color: "var(--muted-foreground)" }}>
                HE LIVES!
              </span>
            </h2>
          </div>
          <div className="final-lockup">
            <TitleMark className="final-title-mark" />
            <p>{c.film.tagline.replace("\n", " ")}</p>
            <span>{c.film.releaseStatus}</span>
          </div>
        </section>
      </main>
      <footer>
        <TitleMark className="footer-title-mark" />
        <span>{c.film.copyright}</span>
        <nav aria-label="Footer navigation">
          {c.socials.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
      <TrailerModal open={trailer} onClose={() => setTrailer(false)} />
    </div>
  );
}
