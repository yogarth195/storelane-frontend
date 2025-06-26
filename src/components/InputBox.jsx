export function InputBox({lable, placeHolder, onTyping, type, className, onEnter}) {
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {lable}
        </div>
        <input placeholder={placeHolder} onChange={onTyping} type={type} className={`py-1 gap-x-5 w-full border border-grey-300 focus:border-grey-900 hover:border-gray-500 transition-colors duration-200 rounded-md pl-2 ${className}`} onKeyDown={(e) => {
            if(e.key === 'Enter' && onEnter ) {
                onEnter(); //call the parent function
            }
        }}></input>
    </div>
}