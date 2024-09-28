import ChatHeader from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


interface MemberIdPageProps {
    params: {
        serverId: string,
        memberId: string,
    }
}

const MemberIdPage = async({params} : MemberIdPageProps) => {

    const profile = await currentProfile();
    if(!profile)
    {
        return auth().redirectToSignIn();
    }


    const currentMember = await db.member.findFirst({
        where:{
            serverId: params.serverId,
            profileId: profile.id,
        },
        include:{
            profile: true,
        }
    });

    if(!currentMember)
    {
        return redirect("/");
    }


    const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

    if(!conversation)
    {
        return redirect(`/servers/${params.serverId}`);
    }

    const {memberOne, memberTwo} = conversation;

    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;



    return ( 
        <div className="flex flex-col h-full bg-white dark:bg-[#313338]">
            <ChatHeader  serverId={params.serverId}  name={otherMember.profile.name}  type="conversation"  imageUrl={otherMember.profile.imageUrl} />
        </div>
     );
}
 
export default MemberIdPage;