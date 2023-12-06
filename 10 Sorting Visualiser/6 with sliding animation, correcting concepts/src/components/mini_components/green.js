export default function green() {
    let barArr = document.getElementsByClassName("bars");
    barArr = Array.from(barArr);
    barArr.forEach((element) => {
      element.style.backgroundColor = "#6cf577";
    });
  }
  