export default function ResponsiveImage() {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <img
          src="/images/docs/photos3.jpg"
          alt="Cover"
          className=" h-[800px] w-full border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>
    </div>
  );
}
