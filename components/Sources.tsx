import Image from "next/image";

export default function Sources({
  sources,
  isLoading,
}: {
  sources: { name: string; url: string }[];
  isLoading: boolean;
}) {
  return (
    <div className="sources-card h-[calc(100vh-8rem)] flex flex-col max-w-sm">
      <h3 className="text-xl font-bold text-purple-400 mb-4 sticky top-0 bg-gray-900/50 backdrop-blur-lg p-3 rounded-t-xl z-10">
        Sources
      </h3>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[calc(100vh-12rem)]">
        <div className="space-y-3">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse bg-white/10 h-16 rounded-lg" />
            ))
          ) : sources.length > 0 ? (
            sources.map((source) => (
              <div 
                key={source.url} 
                className="rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              >
                <SourceCard source={source} />
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-400 text-center py-3">
              No sources available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SourceCard = ({ source }: { source: { name: string; url: string } }) => {
  return (
    <div className="p-2 rounded-lg bg-white/5 backdrop-blur-lg border border-white/5">
      <div className="flex items-center gap-2">
        <div className="shrink-0">
          <Image
            unoptimized
            src={`https://www.google.com/s2/favicons?domain=${source.url}&sz=128`}
            alt={source.name}
            className="rounded-full"
            width={24}
            height={24}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h6 className="text-sm font-medium text-gray-100 truncate">
            {source.name}
          </h6>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={source.url}
            className="text-xs text-gray-300 truncate block hover:text-blue-400 transition-all duration-300 hover:underline"
          >
            {source.url}
          </a>
        </div>
      </div>
    </div>
  );
};
