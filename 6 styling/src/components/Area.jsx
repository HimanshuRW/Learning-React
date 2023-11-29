import cssClass from './Area.module.css';

export default function Header(){
    return(
        <nav>
            <ul>
                <li className={cssClass.mast}>
                    Home1
                </li>
                <li className={cssClass.mast}>
                    About2
                </li>
                <li className={cssClass.mast}>
                    Contact3
                </li>
            </ul>
            <ul>
                <li className={cssClass.mast}>Get In Touch</li>
            </ul>
        </nav>
    )
}