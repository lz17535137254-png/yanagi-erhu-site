const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

async function loadActivities() {
  const grid = document.getElementById("activitiesGrid");
  if (!grid) return;

  try {
    const res = await fetch("./assets/data/activities.json");
    const data = await res.json();

    grid.innerHTML = data.map(item => {
      const meta = [item.date, item.place].filter(Boolean).join(" / ");
      const thumb = item.image
        ? `<div class="activity-thumb"><img src="${item.image}" alt="${item.title}"></div>`
        : `<div class="activity-thumb"></div>`;

      return `
        <article class="activity-card">
          ${thumb}
          <div class="activity-body">
            <h3 class="activity-title">${item.title}</h3>
            <p class="meta">${meta}</p>
            <p class="desc">${item.description || ""}</p>
          </div>
        </article>
      `;
    }).join("");
  } catch (e) {
    grid.innerHTML = `<div class="card">活動データの読み込みに失敗しました。パスをご確認ください。</div>`;
    console.error(e);
  }
}
loadActivities();
