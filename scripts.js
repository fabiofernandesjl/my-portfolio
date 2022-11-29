function getApiGithub() {
  fetch("https://api.github.com/users/fabiofernandesjl/repos")
    .then(async (res) => {
      // Verifica se a resposta não teve erro;
      if (!res.ok) {
        // Caso tenha erro, é lançado para o catch;
        throw new Error(res.status);
      }

      let data = await res.json();

      createProjectCard(data);
    })
    .catch((e) => {
      console.log(e);
    });
}

function createProjectCard(data) {
  data.map((item) => {
    let projectContainer = document.querySelector(".projects");
    let project = document.createElement("div");

    project.innerHTML = `
    <a href="${item.html_url}" target="_blank">
      <h3 id="title"><i class="fa-solid fa-folder"></i>${item.name}</h3>
    </a>
    <p class="description">
      ${item.description === null ? "..." : item.description}
    </p>
    <a href="${item.homepage === null ? "" : item.homepage}" target="_blank">
      ${item.homepage === null ? "" : item.homepage}
    </a>
    <div>
      <span id="stars"><i class="fa-solid fa-star"></i>${
        item.stargazers_count
      }</span>
      <span id="forks"><i class="fa-solid fa-eye"></i>${
        item.watchers_count
      }</span>
      <span id="language"><i class="fa-solid fa-code"></i>${
        item.language === null ? "" : item.language
      }</span>
      <span><i class="fa-solid fa-calendar-days"></i>${Intl.DateTimeFormat(
        "pt-br"
      ).format(new Date(item.created_at))}</span>
    </div>
    `;

    project.classList.add("item-project");

    projectContainer.appendChild(project);
  });
}

getApiGithub();
