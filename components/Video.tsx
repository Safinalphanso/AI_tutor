export default function Video() {
  return (
    <div className="mt-6 rounded-2xl bg-gradient-to-br from-purple-900/90 via-gray-900/90 to-black/90 p-4 shadow-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
      <h3 className="text-xl font-bold text-purple-400 mb-4 text-center">Video Tutorial</h3>
      <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden ring-2 ring-purple-600/20 shadow-lg shadow-purple-500/20">
        <video
          src="/tutor1.mp4"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform"
          autoPlay
          loop
          muted
          playsInline
          poster="/video-thumbnail.jpg"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}