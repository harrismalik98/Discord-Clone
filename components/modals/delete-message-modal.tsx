"use client"

import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import queryString from "query-string";



const DeleteMessageModal = () => {

    const {type, isOpen, onClose, data} = useModal();

    const isModalOpen = isOpen && type === "deleteMessage";
    const {apiUrl, query} = data;

    const [isLoading, setIsLoading] = useState(false);


    const handleDeleteServer = async () => {
        try
        {
            setIsLoading(true);

            const url = queryString.stringifyUrl({
                url: apiUrl || "",
                query: query
            });

            await axios.delete(url);

            onClose();
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
                    <DialogTitle className="text-2xl text-center font-bold">Delete Message</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this?<br/>
                        The message will be permanently deleted.
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
                            onClick={handleDeleteServer}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
     );
}
 
export default DeleteMessageModal;