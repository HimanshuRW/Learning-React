export default function GradientBtn({children,isVisible,onClick}){
    return (
        <button onClick={onClick} className={`gradientBtn strechBtn btn animated-component ${isVisible ? 'visible' : 'hidden-down'}`}>{children}</button>
    )
}