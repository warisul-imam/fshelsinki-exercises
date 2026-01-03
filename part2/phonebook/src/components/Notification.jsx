const Notification = ({ notifTypes, notifType, msg }) => {

    const style = notifType == notifTypes.SUC ? {
        backgroundColor: '#dfdfdfff',
        color: '#00882bff',
        borderRadius: 20,
        padding: 20,
        border: '3px solid #00882bff'
    }
    : notifType == notifTypes.ERR ? {
        backgroundColor: '#dfdfdfff',
        color: "#ff5e5eff",
        borderRadius: 20,
        padding: 20,
        border: '3px solid #ff5e5eff'
    } : null

    return (
        <div style={style}>
            {msg}
        </div>
    );

}

export default Notification;