import { useEffect } from "react";
function NotificationPage(props){
    
    useEffect(() => {
        props.onUsernameInformed();
        console.log(props.messagesReceived);
    }, []);
     const MessageReceived = (props) => {
        return (
            <div>
                <b>From {props.from}</b>: {props.text}
            </div>
        );
    };
    return(

        <div>
             {props.messagesReceived
                        .filter(message => message.from !== props.username)
                        .map(message => <MessageReceived key={message.id} from={message.from} direct={message.to === props.username} text={message.text} />)}
        </div>
    )

}
export default NotificationPage;
