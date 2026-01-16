import { ListTodo, Menu } from "lucide-react";

interface TaskNavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function TaskNavbar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: TaskNavbarProps) {
  return (
    <header className='navbar'>
      <h1>
        <ListTodo /> TaskFlow
      </h1>
      <button
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        aria-label='Menu button'
        className={isMobileMenuOpen ? "fixed z-99" : ""}
      >
        <Menu />
      </button>
    </header>
  );
}

export default TaskNavbar;
