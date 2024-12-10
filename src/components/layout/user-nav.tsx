'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { logout } from '@/contexts/auth/actions';
import { useStore } from '@/contexts/store';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useRouter } from 'next/navigation';
export function UserNav({type}:{type?:string}) {
  const user = useCurrentUser();
  const route = useRouter();
  const {dispatch}= useStore();
  const onClick = () => {
    dispatch(logout());
  };
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar /* className="h-8 w-8" */>
              <AvatarImage
                src={user?.image ?? ''}
                alt={user?.name ?? ''}
              />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={()=>{
              route.push(`${type==="hub"? "/hub/settings":type==="site"?"/site/settings":"/settings"}`)
            }}>
              Profil
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onClick()}>
          Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
