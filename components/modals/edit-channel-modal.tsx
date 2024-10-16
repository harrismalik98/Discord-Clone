"use client"

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogFooter  } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";
import queryString from "query-string";
import { useEffect } from "react";


const formSchema = z.object({
    name:z.string().min(1,{
        message: "Channel name is required"
    }).refine(
        name => name.toLowerCase() !== "general",
        {
            message: "Channel name cannot be 'general'"
        }
    ),
    type:z.nativeEnum(ChannelType)
});

const EditChannelModal = () => {

    const {type, isOpen, onClose, data} = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "editChannel";
    const { server, channel } = data;

    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            type: channel?.type || ChannelType.TEXT
        }
    });

    useEffect(() => {
        if(channel)
        {
            form.setValue("name", channel.name);
            form.setValue("type", channel.type);
        }
    }, [form, channel]);

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values:z.infer<typeof formSchema>) => {
        try
        {
            const url = queryString.stringifyUrl({
                url:`/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            });

            await axios.patch(url, values);

            form.reset();
            router.refresh();
            onClose();
        }
        catch(error)
        {
            console.log(error);
        }
    }


    const handleClose = () => {
        form.reset();
        onClose();
    }



    return ( 
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Edit channel</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)} >
                        <div className="space-y-8 px-6">
                            <FormField control={form.control} name="name" render={({field}) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                        Channel name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                            placeholder="Enter channel name"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <FormField control={form.control} name="type" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Channel Type</FormLabel>
                                    <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value} >
                                        <FormControl>
                                            <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                                                <SelectValue placeholder="Select a channel type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(ChannelType).map((type) => (
                                                <SelectItem className="capitalize" key={type} value={type}>{type.toLowerCase()}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary" disabled={isLoading}>
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
     );
}
 
export default EditChannelModal;