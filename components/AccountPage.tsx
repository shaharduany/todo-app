import { useSession } from "next-auth/react"
import Image from "next/image";

export default function AccountPage(props: {}){
    const { data: session, status } = useSession();
    
    if(!session){
        return (<div>
            <h1>Loading...</h1>
        </div>);
    }

    const user = session.user;

    return (<div>
        <h1>{user.name}</h1>    
    </div>)
}