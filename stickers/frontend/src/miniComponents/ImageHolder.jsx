export default function ImageHolder({ name, isActive, clickHandler }) {
  return (
    <div className={`imgHolder ${isActive ? "activeIcon" : "unactiveIcon"}`} onClick={clickHandler}>
      <div className="imgBck center">
        <img src={`/imgs/${name}`} alt="Nav icon" className="center" />
      </div>
    </div>
  );
}
