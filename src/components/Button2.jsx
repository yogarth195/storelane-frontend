export const Button2 = ({label, onPress, className}) => {
    return <div>
        <button onClick={onPress} type="button" className={`w-full text-black hover:bg-red-400 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2  duration-200 ${className}`}>
            {label}
        </button>
    </div>
}