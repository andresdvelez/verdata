export interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  isActive?: boolean;
  onClick?: () => void;
}
