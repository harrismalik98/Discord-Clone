import { Plus } from "lucide-react";
import ActionTooltip from "../action-tooltip";

const NavigationAction = () => {
    return ( 
        <div>
            <ActionTooltip side="right" align="center" label="Add a server">
                <button className="group flex items-center">
                    <div className="flex justify-center items-center mx-3 w-[48px] h-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
                        <Plus className="group-hover:text-white transition text-emerald-500" size={25}/>
                    </div>
                </button>
            </ActionTooltip>
        </div>
     );
}
 
export default NavigationAction;