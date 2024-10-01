"use client"

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter  } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import FormUpload from "../file-upload";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import queryString from "query-string";
import { Files } from "lucide-react";


const formSchema = z.object({
    fileUrl:z.string().min(1,{
        message: "Attachment is required"
    }),
});

const MessageFileModal = () => {

    const {isOpen, onClose, type, data} = useModal();
    
    const router = useRouter();

    const isModalOpen = isOpen && type === "messageFile";
    const {apiUrl, query} = data;

    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            fileUrl:""
        }
    });

    const handleClose = () => {
        form.reset();
        onClose();
    }

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values:z.infer<typeof formSchema>) => {
        try
        {
            const url = queryString.stringifyUrl({
                url: apiUrl || "",
                query: query
            })

            await axios.post(url,{
                ...values,
                content: values.fileUrl
            });

            form.reset();
            router.refresh();
            handleClose();
        }
        catch(error)
        {
            console.log(error);
        }
    }



    return ( 
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Add an attachment</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">Send a file as a message.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)} >
                        <div className="space-y-8 px-6">
                            <div className="flex justify-center items-center text-center">
                                <FormField control={form.control} name="fileUrl" render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <FormUpload endpoint="messageFile" value={field.value} onChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary" disabled={isLoading}>
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
     );
}
 
export default MessageFileModal;