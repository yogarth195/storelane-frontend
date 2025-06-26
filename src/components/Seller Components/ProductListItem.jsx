export function ProductListItem({product, buyerCount, onEdit}) {
    return (
        <div className="flex justify-between items-center border p-4 rounded-md shadow-sm hover:shadow-md transition">
            <div>
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">₹{product.price}</p>
                <p className="text-sm text-green-600">{buyerCount} people bought this</p>
            </div>

            <div className="flex gap-2">
                <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                onClick={() => onEdit(product._id)}
                >
                Edit
                </button>
                {/* Add more buttons as needed */}
            </div>
        </div>

    )
}