import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function WelcomePage(props){
    let session = JSON.parse(props.session);
    let router = useRouter();

    if(!session){
        setTimeout(() => {
            router.push("/");
        }, 5000);

        return (<div>
            <h1>error</h1>
        </div>)
    }
    
    let name = session.user.name;
    let email = session.user.email;
    
    return (<div>
        <h1>Welcome {name}!</h1>
        <p>By joining us you agree to get commercial unwanted emails to {email}</p>
    </div>)
}

export async function getServerSideProps(context){
    let session = JSON.stringify(await getSession(context));

    return {
        props: {
            session,
        }
    };
}