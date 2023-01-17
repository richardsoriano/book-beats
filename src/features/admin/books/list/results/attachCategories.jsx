export default function DropdownCategories({ categories, book, setBook }) {
  const label = "Categories"
  return (
    <div className="my-2">
      <ul>
        {label && (
          <label className="text-lg font-semibold text-gray-500">{label}</label>
        )}
        {categories.map((category, i) => (
          <li
            key={i}
            className={`hover:bg-blue-500 hover:text-white 
            ${
              book.categories.find((_category) => _category === category)
                ? "bg-blue-500 text-white"
                : ""
            }
          `}
            onClick={() =>
              setBook((prev) => ({
                ...prev,
                categories: prev.categories.some(
                  (_category) => _category === category
                )
                  ? prev.categories.filter(
                      (_category) => _category !== category
                    )
                  : [...prev.categories, category],
              }))
            }
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
}
