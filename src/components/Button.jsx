export const Button = ({label, onPress}) => {
    return <div>
        <button onClick={onPress} type="button" className="w-full text-white bg-emerald-600 hover:bg-green-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  duration-200">
            {label}
        </button>
    </div>
}