export default function ProgressBar({ progressPercentage }) {
  return (
    <div className="w-full h-1 bg-gray-300">
      <div
        style={{ width: `${progressPercentage}%` }}
        className={`h-full ${
          progressPercentage < 70 ? "bg-red-600" : "bg-green-600"
        }`}
      ></div>
    </div>
  )
}
