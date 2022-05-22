import { useSession } from "next-auth/react";
import styles from './styles/Account.module.scss';

export default function AccountPage(){
    const { data: session, status } = useSession();
    
    if(!session){
        return (<div className={styles.accountDiv}>
            <h1>Loading...</h1>
        </div>);
    }

    const user = session.user ;

    return (<div className={styles.accountDiv}>
        <h1>{user.name}'s Todos</h1>
        <h5>Your email address: {user.email}</h5>    
    </div>)
}