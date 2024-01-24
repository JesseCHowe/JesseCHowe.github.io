const stories = d3.select("#stories");

const addStory = (d) => {
  const story = stories
    .append("div")
    .attr("class", "story")
    .attr("id", `${d.id}-main`);
  story.html(`
  <div class="hed">

    <div>
      <h3>${d.title}</h3>
      <p>${d.desc}</p>
      
      <div>
        <div class="role">
          <span class="label">Role</span>
          <div class="roles">
            ${d.roles.map((role) => `<span>${role}</span>`).join("")}
          </div>
        </div>
        <div class="tool">
          <span class="label">Tools</span>
          <div class="tools">
            ${d.tools.map((tool) => `<span>${tool}</span>`).join("")}
          </div>
        </div>
      </div>
    </div>
    
    <div class="btns">
      <button class="prev">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z"/></svg>
      </button>
      <button class="next">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z"/></svg>
      </button>
    </div>
  </div>

  <div id="${d.id}" class="image-slide scroll-container">
    ${d.slides
      .map((slide) => {
        if (slide.type === "image") {
          return `
        <div class="image">
          <img src="${slide.val}"/>
        </div>
        `;
        }
        if (slide.type === "video") {
          return `
        <div class="image">
          <video src="${slide.val}" autoplay muted loop></video>
        </div>
        `;
        }
      })
      .join("")}
  </div>
  `);
  renderSlideFn(d.id);
};

stories_data.map((d) => addStory(d));
