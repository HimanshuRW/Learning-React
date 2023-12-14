export default function Error ({title,msg,onConfirm}){
    return (
        <div className="error">
            <h2>{title}</h2>
            <p>{msg}</p>
            {onConfirm && (
                <div id="delete-confirmation">
                    <button onClick={onConfirm} className="button">Okay</button>
                </div>
            )}
        </div>
    )
}