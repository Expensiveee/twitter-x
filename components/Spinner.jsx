export default function ({ size }) {
  if (size) {
    return (
      <div className="w-full h-auto flex items-start justify-center ">
        <span
          className={`w-${size} h-${size} border-t-transparent animate-spin m-auto text-neutral-200 border border-twitter-300 rounded-full`}
        ></span>
      </div>
    );
  }

  return (
    <div className="w-full h-20 flex items-start justify-center ">
      <span className="w-14 h-14 border-t-transparent animate-spin m-auto text-neutral-200 border border-twitter-300 rounded-full"></span>
    </div>
  );
}
