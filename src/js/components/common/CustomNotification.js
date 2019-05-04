import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


class CustomNotification extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        this.createNotification(this.props.info, this.props.title)
    }
    createNotification (type, title) {
        switch (type) {
            case 'info':
                NotificationManager.info(title, 'Info', 3000);
                break;
            case 'success':
                NotificationManager.success(title, 'Success', 3000);
                break;
            case 'warning':
                NotificationManager.warning(title, 'Warning', 3000);
                break;
            case 'error':
                NotificationManager.error(title, "Error", 5000);
                break;
        }
    };
    render() {
        return (
            <div>
                <NotificationContainer/>
            </div>
        );
    }
}
export default CustomNotification;