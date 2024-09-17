"use client"

import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



const LeaveServerModal = () => {

    const {type, isOpen, onClose, data} = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "leaveServer";
    const {server} = data;

    const [isLoading, setIsLoading] = useState(false);


    const handleLeaveServer = async () => {
        try
        {
            setIsLoading(true);

            await axios.patch(`/api/servers/${server?.id}/leave`);

            onClose();
            router.refresh();
            router.push("/");
        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            setIsLoading(false)
        }
    }





    return ( 
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Leave Server</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to leave <span className="font-semibold text-indigo-500">{server?.name}</span>?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="bg-gray-100 px-6 py-4 ">
                    <div className="flex justify-between items-center w-full">
                        <Button 
                            disabled={isLoading}
                            variant="ghost"
                            onClick={onClose}
                            >
                            Cancel
                        </Button>

                        <Button
                            disabled={isLoading}
                            variant="primary"
                            onClick={handleLeaveServer}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
     );
}
 
export default LeaveServerModal;