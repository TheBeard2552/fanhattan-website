'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import CanonLayout from './CanonLayout';
import LoreSearchBar from './LoreSearchBar';
import LoreSortMenu from './LoreSortMenu';
import DistrictCard from './DistrictCard';
import DistrictPreview from './DistrictPreview';
import PillarFooterNav from './PillarFooterNav';
import type { CanonTier } from '@/lib/lore/types';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DistrictViewModel {
  slug: string;
  name: string;
  tagline: string | null;
  coreBelief: string;
  description: string | null;
  accentColor: string;
  canonTier: CanonTier;
  illustrationSrc: string | null;
  teaser: string;
  peoplePreview: Array<{ slug: string; name: string; role?: string }>;
  storiesPreview: Array<{ slug: string; title: string }>;
  artifactsPreview: Array<{ slug: string; name: string }>;
  inferredFlags: {
    highSyndicateInfluence: boolean;
    highResistanceActivity: boolean;
    anomalous: boolean;
  };
}

// ── Constants ─────────────────────────────────────────────────────────────────

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Districts' },
  { id: 'syndicate', label: 'High Syndicate Influence' },
  { id: 'resistance', label: 'High Resistance Activity' },
  { id: 'anomalous', label: 'Anomalous' },
];

const SORT_OPTIONS = [
  { id: 'canon-order', label: 'Canon Order' },
  { id: 'alphabetical', label: 'Alphabetical' },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function DistrictsLandingClient({
  districts,
}: {
  districts: DistrictViewModel[];
}) {
  const [selected, setSelected] = useState<DistrictViewModel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('canon-order');

  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  const dragCurrentY = useRef<number>(0);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  // Escape key to close preview
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selected) setSelected(null);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [selected]);

  // Filter + sort logic
  const filteredDistricts = useMemo(() => {
    let result = [...districts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.tagline?.toLowerCase().includes(q) ||
          d.coreBelief.toLowerCase().includes(q) ||
          d.description?.toLowerCase().includes(q)
      );
    }

    switch (filterBy) {
      case 'syndicate':
        result = result.filter((d) => d.inferredFlags.highSyndicateInfluence);
        break;
      case 'resistance':
        result = result.filter((d) => d.inferredFlags.highResistanceActivity);
        break;
      case 'anomalous':
        result = result.filter((d) => d.inferredFlags.anomalous);
        break;
    }

    if (sortBy === 'alphabetical') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [districts, searchQuery, filterBy, sortBy]);

  const handleSelect = useCallback((district: DistrictViewModel) => {
    setSelected((prev) => (prev?.slug === district.slug ? null : district));
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  // ── Mobile bottom sheet touch drag ──────────────────────────────────────────

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
    dragCurrentY.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartY.current === null || !sheetRef.current) return;
    const dy = e.touches[0].clientY - dragStartY.current;
    if (dy > 0) {
      dragCurrentY.current = dy;
      sheetRef.current.style.transition = 'none';
      sheetRef.current.style.transform = `translateY(${dy}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!sheetRef.current) return;
    const dragged = dragCurrentY.current;

    if (dragged > 80) {
      // Animate off-screen from current position, then close
      sheetRef.current.style.transition = 'transform 250ms ease-in';
      sheetRef.current.style.transform = 'translateY(100%)';
      const el = sheetRef.current;
      setTimeout(() => {
        el.style.transition = '';
        el.style.transform = '';
        setSelected(null);
      }, 250);
    } else {
      // Re-enable CSS transition and snap back to resting position
      sheetRef.current.style.transition = '';
      sheetRef.current.style.transform = '';
    }

    dragStartY.current = null;
    dragCurrentY.current = 0;
  };

  const isOpen = !!selected;

  return (
    <CanonLayout>
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <header className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-[1280px] mx-auto">
          <h1
            className="font-display text-5xl md:text-7xl uppercase tracking-tight text-white mb-5"
            style={{ textShadow: '0 0 80px rgba(255,255,255,0.06)' }}
          >
            Districts of Fanhattan
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto">
            Nine neighborhoods. One city that keeps score.
          </p>
        </div>
      </header>

      {/* ── Controls Bar ─────────────────────────────────────────────────── */}
      <div className="px-6 pb-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <LoreSearchBar
                placeholder="Search districts..."
                value={searchQuery}
                onSearch={setSearchQuery}
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 sm:flex-none sm:w-56">
                <LoreSortMenu
                  label="Filter By"
                  options={FILTER_OPTIONS}
                  activeSort={filterBy}
                  onSortChange={setFilterBy}
                />
              </div>
              <div className="flex-1 sm:flex-none sm:w-44">
                <LoreSortMenu
                  label="Sort By"
                  options={SORT_OPTIONS}
                  activeSort={sortBy}
                  onSortChange={setSortBy}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── District Grid ─────────────────────────────────────────────────── */}
      <main className="px-6 pb-20">
        <div className="max-w-[1280px] mx-auto">
          {filteredDistricts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDistricts.map((d) => (
                <DistrictCard
                  key={d.slug}
                  district={d}
                  isSelected={selected?.slug === d.slug}
                  onClick={() => handleSelect(d)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-display text-sm uppercase tracking-widest text-gray-600">
                No districts found
              </p>
            </div>
          )}
        </div>
      </main>

      {/* ── Pillar Footer ─────────────────────────────────────────────────── */}
      <PillarFooterNav />

      {/* ── Backdrop (shared for both drawer + sheet) ─────────────────────── */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ── Desktop Drawer (lg+) ──────────────────────────────────────────── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={selected ? `District preview: ${selected.name}` : undefined}
        className={`hidden lg:flex flex-col fixed right-0 top-0 bottom-0 z-[70] w-[460px] bg-[#0e0e0e] border-l border-white/10 overflow-hidden transition-transform duration-[270ms] ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ boxShadow: '-20px 0 60px rgba(0,0,0,0.6)' }}
      >
        {selected && (
          <DistrictPreview district={selected} onClose={handleClose} />
        )}
      </aside>

      {/* ── Mobile Bottom Sheet (< lg) ────────────────────────────────────── */}
      <aside
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={selected ? `District preview: ${selected.name}` : undefined}
        className={`lg:hidden fixed inset-x-0 bottom-0 z-[70] flex flex-col bg-[#0e0e0e] border-t border-white/10 rounded-t-3xl overflow-hidden transition-transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          height: '90vh',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.6)',
          transitionDuration: '280ms',
          transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* Drag handle — swipe down to dismiss */}
        <div
          className="flex-shrink-0 flex items-center justify-center py-3 cursor-grab active:cursor-grabbing touch-none select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-12 h-1.5 rounded-full bg-white/20" />
        </div>

        {selected && (
          <DistrictPreview district={selected} onClose={handleClose} />
        )}
      </aside>
    </CanonLayout>
  );
}
