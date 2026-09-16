interface HeroSectionProps {
  badge?: string;
  title: string;
  highlightedTitle?: string;
  description?: string;
  teamsNumber?: number;
  variant?: 'hero' | 'page';
}

const HeroSection = ({
  badge,
  title,
  highlightedTitle,
  description,
  teamsNumber,
  variant = 'page',
}: HeroSectionProps) => {
  if (variant === 'hero') {
    return (
      <div className="border-b border-[#1C2232] bg-[#0E1118] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF08] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C2FF04] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 relative">
          <div className="max-w-xl">
            {badge && (
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-[10px] text-[#00C2FF] bg-[#00C2FF10] border border-[#00C2FF20] px-2 py-0.5 rounded-[2px] uppercase tracking-wider">
                  {badge}
                </span>
              </div>
            )}

            <h1 className="font-display font-800 text-4xl sm:text-5xl text-white leading-none tracking-wide mb-3">
              {title}
              {highlightedTitle && (
                <>
                  <br />
                  <span className="text-[#00C2FF]">{highlightedTitle}</span>
                </>
              )}
            </h1>

            {description && (
              <p className="font-body text-[#5E6A7E] text-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h1 className="font-display font-800 text-3xl text-white tracking-wide mb-1">
        {title}
      </h1>

      {description && (
        <p className="font-mono text-[11px] text-[#5E6A7E]">
          {teamsNumber} {description}
        </p>
      )}
    </div>
  );
};

export default HeroSection;
