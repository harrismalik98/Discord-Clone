"use client"

import { UploadDropzone } from "@/lib/uploadThing";
import { X } from "lucide-react";
import Image from "next/image";


interface FileUplodProps {
    onChange: (url?: string) => void,
    value: string,
    endpoint: "messageFile" | "serverImage"
}

const FormUpload = ({onChange, value, endpoint}: FileUplodProps) => {
    
    const fileType = value?.split(".").pop();

    if(value && fileType !== "pdf")
    {
        return(
            <div className="relative h-20 w-20">
                <Image fill src={value} alt="Upload" className="rounded-full" />
                <button 
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                    onClick={() => onChange("")}
                >
                    <X className="h-4 w-4"/>
                </button>
            </div>
        )
    }

    return ( 
        <UploadDropzone 
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error:Error) => {
                console.log(error);
            }}
            
        />
     );
}
 
export default FormUpload;