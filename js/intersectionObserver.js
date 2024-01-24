const renderSlideFn = (id) => {
  console.log("reached", id);
  const container = document.getElementById(id);
  const childCount = container.childElementCount;
  const prev = d3.select(`#${id}-main .prev`);
  const next = d3.select(`#${id}-main .next`);
  let w = container.clientWidth;
  let moveBy = w / 2;
  const bounds = (childCount - 2) * moveBy;

  const moveSlides = (val) => {
    container.scrollTo({
      left: val,
      behavior: "smooth",
    });
  };

  next.on("click", () => {
    console.log("next");
    if (container.scrollLeft !== bounds)
      moveSlides(container.scrollLeft + moveBy);
  });

  prev.on("click", () => {
    if (container.scrollLeft !== 0) moveSlides(container.scrollLeft - moveBy);
  });

  window.addEventListener(
    "resize",
    function (event) {
      w = container.clientWidth;
      if (window.innerWidth < 700) {
        moveBy = w;
      } else {
        moveBy = w / 2;
      }
    },
    true
  );
};
