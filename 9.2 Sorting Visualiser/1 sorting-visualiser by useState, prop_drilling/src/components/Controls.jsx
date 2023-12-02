export default function Controls({playing,start,stop}){
    return (
        <div id="btns">
            <button onClick= {playing ? stop : start}>
                {/* {video=="play" ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="play"><path fill="#000" d="M7 17.259V6.741a1 1 0 0 1 1.504-.864l9.015 5.26a1 1 0 0 1 0 1.727l-9.015 5.259A1 1 0 0 1 7 17.259Z"></path></svg> : undefined} */}
                {(!(playing)) ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="play"><path fill="#000" d="M7 17.259V6.741a1 1 0 0 1 1.504-.864l9.015 5.26a1 1 0 0 1 0 1.727l-9.015 5.259A1 1 0 0 1 7 17.259Z"></path></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="pause"><path fill="#000" d="M8 5a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2zm8 0a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2z"></path></svg> }
            </button>
        </div>
    )
}