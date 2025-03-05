import { Link } from "@/modules/translations/i18n/routing";
import { SidebarItemProps } from "@/types/app/sidebar";
import { cn } from "@heroui/react";

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  to,
  isActive = false,
  onClick,
}) => {
  return (
    <Link
      href={to}
      className={cn("sidebar-item", isActive && "active")}
      onClick={onClick}
    >
      <span className="sidebar-item-icon">{icon}</span>
      <span className="sidebar-item-text">{text}</span>
    </Link>
  );
};
