export default function Btn({click_handler}) {
    return (
        <button className="btn" onClick={click_handler} id="control_btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          id="play"
        >
          <path
            fill="#000"
            d="M7 17.259V6.741a1 1 0 0 1 1.504-.864l9.015 5.26a1 1 0 0 1 0 1.727l-9.015 5.259A1 1 0 0 1 7 17.259Z"
          ></path>
        </svg>
      </button>
    )
}