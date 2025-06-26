import { Link } from "react-router-dom";
export function BottomWarning({messageWarning, whereToText, to}) {
    return <div className="w-full ">
        <div>
            {messageWarning}
            <Link className="pointer underline pl-1 cursor-pointer" to={to}>
                {whereToText}
            </Link>
        </div>
    </div>
}