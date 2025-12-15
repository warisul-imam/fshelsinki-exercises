const Notification = ({ notifTypes, notifType, msg }) => {

    const style = notifType == notifTypes.CREATION_SUCCESS || notifType == notifTypes.UPDATE_SUCCESS ? {
        backgroundColor: '#dfdfdfff',
        color: '#00882bff',
        borderRadius: 20,
        padding: 20,
        border: '3px solid #00882bff'
    }
    : notifType == notifTypes.ERR_404 ? {
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