import { Fragment } from "@/generated/prisma";

interface FragmentWebProps{
    data: Fragment
}

export const FragmentWeb = ({data}:FragmentWebProps)=>{
    return(
        <div className="flex flec-col w-full h-full">
            <iframe 
            className="h-full w-full" 
            sandbox="allow-forms allow-scripts allow-same-origin"
            loading="lazy"
            src={data.sanboxUrl}
            />
        </div>
    )
}
