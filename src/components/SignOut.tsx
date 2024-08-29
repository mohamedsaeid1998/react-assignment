import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CookieServices from "@/services/cookieServices/CookieServices";
import { useNavigate } from "react-router-dom";

export default function SignOut() {
  const navigate = useNavigate();
  const logOut = () => {
    CookieServices.remove("token");
    CookieServices.remove("user");
    navigate("/")
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-600 rounded-full size-9 flex justify-center items-center text-white">
          M
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <LogOut className="mr-2 size-4" />
          <span onClick={logOut}>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
