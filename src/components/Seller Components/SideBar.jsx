import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  Users,
  MessageSquare,
  Bell,
  Settings,
  Upload,
} from 'lucide-react';

export const SellerSideBar = () => {
  return (
    <aside className="bg-[#4A7B9D] overflow-y-auto text-white w-64 h-[calc(100vh-2.75rem)] fixed top-[60px] left-0 shadow-md pt-10">
      <nav className="flex flex-col p-3 space-y-2 text-base">
        <a href="/seller-dashboard" className="flex items-center gap-3 hover:bg-gray-700 py-2.5 px-3 rounded-lg transition">
          <LayoutDashboard/>
          <span>Dashboard</span>
        </a>

        <a href="/seller/products" className="flex items-center gap-3 hover:bg-gray-700 py-2.5 px-3 rounded-lg transition">
          <Boxes/>
          <span>Products</span>
        </a>

        <a href="/seller/orders" className="flex items-center gap-3 hover:bg-gray-700 py-2.5 px-3 rounded-lg transition">
          <ShoppingCart/>
          <span>Orders</span>
        </a>

        <a href="/seller/customers" className="flex items-center gap-3 hover:bg-gray-700 py-2.5 px-3 rounded-lg transition">
          <Users/>
          <span>Customers</span>
        </a>

        <a href="/seller/messages" className="flex items-center gap-3 hover:bg-gray-700 py-2.5 px-3 rounded-lg transition">
          <MessageSquare/>
          <span>Messages</span>
        </a>

        <a href="/seller/notifications" className="flex items-center gap-3 hover:bg-gray-700 py-2.5 px-3 rounded-lg transition">
          <Bell/>
          <span>Notifications</span>
        </a>

        <a href="/seller/settings" className="flex items-center gap-3 hover:bg-gray-700 py-2.5 px-3 rounded-lg transition">
          <Settings/>
          <span>Settings</span>
        </a>

        <a href="/seller/upload" className="flex items-center gap-3 hover:bg-gray-700 py-2.5 px-3 rounded-lg transition">
          <Upload/>
          <span>Upload a Product</span>
        </a>
      </nav>
    </aside>
  );
};
