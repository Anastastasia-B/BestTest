function onClickWrapper(handle) {
    return function onKeyPress(event: KeyboardEvent<T>) {
        if (handle && event.key === 'Enter')
        handle(event)
    }
}

function accessibleOnClickProps(handler: (event: MouseEvent<T>) => void): Props {
    return {
        onClick: handler,
        onKeyPress: onClickWrapper(handler),
    }
}

export default accessibleOnClickProps