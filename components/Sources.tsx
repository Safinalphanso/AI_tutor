import Image from "next/image";

export default function Sources({
  sources,
  isLoading,
}: {
  sources: { name: string; url: string }[];
  isLoading: boolean;
}) {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg  border-gray-300 rounded-lg p-4 shadow-lg">
      <h3 className="text-2xl font-bold text-purple-400 mb-4">Sources</h3>
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-24 w-full animate-pulse rounded-lg bg-gray-300"
              />
            ))}
          </>
        ) : sources.length > 0 ? (
          sources.map((source) => (
            <SourceCard source={source} key={source.url} />
          ))
        ) : (
          <div className="text-gray-500">Could not fetch sources.</div>
        )}
      </div>
    </div>
  );
}

const SourceCard = ({ source }: { source: { name: string; url: string } }) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white bg-opacity-30 backdrop-blur-lg border border-gray-200 shadow-md transition duration-200 hover:shadow-xl">
      <div className="shrink-0">
        <Image
          unoptimized
          src={`https://www.google.com/s2/favicons?domain=${source.url}&sz=128`}
          alt={source.name}
          className="rounded-full p-1"
          width={36}
          height={36}
        />
      </div>
      <div className="flex flex-col justify-center">
        <h6 className="text-base font-medium text-gray-900 line-clamp-1">{source.name}</h6>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={source.url}
          className="text-xs text-gray-600 truncate"
        >
          {source.url}
        </a>
      </div>
    </div>
  );
};
