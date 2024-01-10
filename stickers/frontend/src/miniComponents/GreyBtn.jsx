export default function GreyBtn({children,isVisible,onClick}){
    return (
        <button onClick={onClick} className={`greyBtn strechBtn btn animated-component ${isVisible ? 'visible' : 'hidden-down'}`}>{children}</button>
    )
}