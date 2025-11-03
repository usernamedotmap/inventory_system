export default function TwoColumnImageGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <img
          src="/images/docs/photos2.jpg"
          alt=" grid"
          className="border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>

      <div>
        <img
          src="/images/docs/photos1.jpg"

          alt=" grid"
          className="border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>
    </div>
  );
}
