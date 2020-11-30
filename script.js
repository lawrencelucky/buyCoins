const moment = require("moment");

const repositoryContainer = document.querySelector(".repositories");

const token = "aa9d45ccfbb931d7e94f679e1311c7c4f0c1f65b";
let repos = [];
const reposArr = [];

const body = {
  query: `
    {
    viewer {
        repositories(first: 20, orderBy: {field:NAME, direction:ASC}) {
            nodes {
                name
                url
                updatedAt
                primaryLanguage {
                name
                }
                owner {
                    login
                }
                defaultBranchRef {
                    name
                }
            }
        }
        }
    }

    `,
};

const baseUrl = "https://api.github.com/graphql";

const headers = {
  "Content-type": "application/json",
  Authorization: "bearer " + token,
};

const markup = `
    <div class="repository">
        <div class="repository__left">
            <a href="#" class="repository__name">intagram-clone</a>
            <div class="repository__details">
                <p class="language">Javascript</p>
                <p class="time__updated">Updated 2 hours ago</p>
            </div>
        </div>
        <div class="repository__right">
            <button class="repository__btn">Star</button>
        </div>
    </div>
`;

fetch(baseUrl, {
  method: "POST",
  headers,
  body: JSON.stringify(body),
})
  .then((response) => response.json())
  .then((result) => {
    result.data.viewer.repositories.nodes.forEach((repo) => {
      const time = repo.updatedAt.toString().slice(0, 10).replaceAll("-", "");
      console.log(moment(time).startOf("day").fromNow());
      repositoryContainer.insertAdjacentHTML(
        "beforeend",
        `
    <div class="repository">
        <div class="repository__left">
            <a href="#" class="repository__name">${repo.name}</a>
            <div class="repository__details">
                <p class="language">${
                  repo.primaryLanguage === null
                    ? "No Language"
                    : repo.primaryLanguage.name
                }</p>
                <p class="time__updated">Updated 2 hours ago</p>
            </div>
        </div>
        <div class="repository__right">
            <button class="repository__btn">Star</button>
        </div>
    </div>
`
      );
    });
  });
