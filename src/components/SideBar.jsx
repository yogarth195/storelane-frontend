import {Link} from 'react-router-dom'

export const SideBar = ({isVisible}) => {
    return (
        <div
          className={`${
            isVisible ? "lg:w-64 w-44" : "w-0"
          } bg-gray-700 text-white overflow-y-auto transition-all duration-300 sticky top-14 left-0 z-0 h-[calc(100vh-3.5rem)]`}
      >
      <ul className="p-2 space-y-4">
      <li className="hover:bg-gray-500 px-3"> 
          <Link  to={`/categories/electronics`}>Electronics</Link>
        </li>
        <li className="hover:bg-gray-500 px-3">
          <Link to={`/categories/furniture`}>Furniture</Link>
        </li>
        <li className="hover:bg-gray-500 px-3">
          <Link to={`/categories/skates`}>Skates</Link>
        </li>
        <li className="hover:bg-gray-500 px-3">
          <Link to={`/categories/furniture`}>Furniture</Link>
        </li>
        <li className="hover:bg-gray-500 px-3">
          <Link to={`/categories/furniture`}>Furniture</Link>
        </li>
        <li className="hover:bg-gray-500 px-3">
          <Link to={`/categories/furniture`}>Furniture</Link>
        </li>
        <li className="hover:bg-gray-500 px-3">
          <Link to={`/categories/furniture`}>Furniture</Link>
        </li>
        <li className="hover:bg-gray-500 px-3">
          <Link to={`/categories/furniture`}>Furniture</Link>
        </li>
        
      </ul>
    </div>
    )
}


