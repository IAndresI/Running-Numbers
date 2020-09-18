function runningNumbers({
  parent,
  triggerHeight = 100,
  speed = 5
}) {
  let elementNumber = parent,
    number = elementNumber.textContent,
    numberCount = number.split(""),
    wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  elementNumber.style.display = "block";
  wrapper.style.overflow = "hidden";
  wrapper.style.maxHeight = elementNumber.offsetHeight + "px";
  console.log(elementNumber.data);
  elementNumber.textContent = "";
  elementNumber.append(wrapper);
  let animationTimePercent = 2;
  numberCount.forEach((e, i) => {
    let numberI = document.createElement("div"),
      counter = 0;
    numberI.style.height = "100%";
    numberI.style.opacity = "0";
    numberI.style.transition = `all ${speed - (speed / 100 * animationTimePercent)}s`;
    animationTimePercent += animationTimePercent;
    numberI.classList.add("running-number");
    numberI.setAttribute("data-running-current", numberCount[i]);
    for (let i = 0; i < 40; i++) {
      let otherNumberI = document.createElement("span");
      if (counter == 10) counter = 0;
      if (i >= 30) otherNumberI.setAttribute("data-running-number", counter);
      otherNumberI.textContent = counter++;
      otherNumberI.style.display = "block";
      numberI.append(otherNumberI);
    }
    window.addEventListener("scroll", () => {
      if ((window.pageYOffset + window.innerHeight - triggerHeight > numberI.getBoundingClientRect().top + window.pageYOffset) && (numberI.getBoundingClientRect().top + window.pageYOffset > window.pageYOffset - numberI.offsetHeight + triggerHeight)) {
        numberI.style.transform = `translate(0,-${numberI.offsetHeight/40*(30+ +numberI.getAttribute("data-running-current"))}px)`;
        numberI.style.opacity = "1";
      }
    });
    counter = 0;
    wrapper.append(numberI);
  });
}

export default runningNumbers;