const stories = d3.select("#stories");

const addStory = (d) => {
  const story = stories.append("div").attr("class", "story");
  story.html(`
  <div class="hed">

    <div>
      <h3>Title of project</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, neque? Pariatur iure maxime hic sit officiis veritatis! Minima repellendus harum sit eveniet quas tenetur? Dolore odit magnam quam earum similique?</p>
      
      <div>
        <div class="role">
          <span class="label">Role</span>
          <div class="roles">
            <span>Role 1</span>
            <span>Role 2</span>
            <span>Role 3</span>
            <span>Role 4</span>
          </div>
        </div>
        <div class="tool">
          <span class="label">Tools</span>
          <div class="tools">
            <span>Tool 1</span>
            <span>Tool 2</span>
            <span>Tool 3</span>
            <span>Tool 4</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="btns">
      <button class="prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z"/></svg>
      </button>
      <button class="next">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z"/></svg>
      </button>
    </div>
  </div>

  <div id="myScrollContainer" class="image-slide scroll-container">
    <div class="image first" data-index="1">
      <img src="./images/great-chicago-fire/title.jpg"/>
    </div>
    <div class="image" data-index="3">
      <video src="./images/great-chicago-fire/chicago-fire-clip.mp4" autoplay muted loop></video>
    </div>
    <div class="image" data-index="2">
      <img src="./images/great-chicago-fire/fire-path.jpg"/>
    </div>
    <div class="image" data-index="3">
      <img src="./images/great-chicago-fire/stats.jpg"/>
    </div>
  </div>
  `);
  // const hed = story.append("div").attr("class", "hed");

  // const info = story.append("div").attr("class", "info");
  // info.append("a").text(d.title);
  // info.append("p").text(d.description);
  // const tools_roles = info.append("div");
  // const roles = d3.append("div").attr("class","role")
  //   .selectAll(d.roles)
  //   .enter()
  //   .append("span")
  //   .text((o) => o);
  // const tools = d3
  //   .selectAll(d.tools)
  //   .enter()
  //   .append("span")
  //   .text((o) => o);
  // const btns = hed.append("div").attr("class", "btns");
  // btns.append("button").attr("class", "prev");
  // btns.append("button").attr("class", "next");

  // const slides = story.append("div").attr("class", "slides");
};

stories_data.map((d) => addStory(d));
