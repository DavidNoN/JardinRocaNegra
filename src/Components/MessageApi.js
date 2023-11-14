
export const messageNotification = ( messageApi, key, type, content, duration) => {

    messageApi.open( {
        key,
        type,
        content,
        duration
    } );
}

export const doubleMessageNotification = async ( messageApi, key, type, content, duration, key2, type2, content2, duration2) => {

    await messageApi.open( {
        key,
        type,
        content,
        duration
    } ).then(() => messageApi.open({
        key: key2,
        type: type2,
        content: content2,
        duration: duration2
    }));
}
