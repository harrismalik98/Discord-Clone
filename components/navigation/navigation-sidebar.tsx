import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

const NavigationSidebar = async () => {

    const profile = await currentProfile();

    if(!profile)
    {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where:{
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    return ( 
        <div className="flex flex-col justify-start items-center space-y-4 h-full w-full py-3 text-primary dark:bg-[#1e1f22]">
            <NavigationAction/>
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"/>
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem id={server.id} imageUrl={server.imageUrl} name={server.name} />
                    </div>
                ))}
            </ScrollArea>
            <div className="flex flex-col items-center gap-y-4 pb-3 mt-auto ">
                <ModeToggle/>
                <UserButton 
                    afterSwitchSessionUrl="/"
                    appearance={{
                        elements:{
                            avatarBox: "h-[36px] w-[36px]"
                        }
                    }}
                />
            </div>
        </div>
     );
}
 
export default NavigationSidebar;