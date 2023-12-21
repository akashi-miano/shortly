const ham = document.querySelector(".mobile-nav");
const mobileNav = document.querySelector(".hero-nav__wrapper");
const apiURL = "https://api-ssl.bitly.com/v4/shorten";
const token = "3f6a2ba5125e2e97c39e8f9d94c0c7e7fdbe44db";
const form = document.querySelector(".form");
const inputField = document.querySelector("input");
const linksContainer = document.querySelector(".links");

let isOpen = false;
ham.addEventListener("click", () => {
  isOpen = true;
  ham.classList.toggle("open");
  mobileNav.classList.toggle("open");
});

const options = {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ long_url: `` }),
};

const saveData = () => {
  localStorage.setItem("data", linksContainer.innerHTML);
};

const showData = () => {
  linksContainer.innerHTML = localStorage.getItem("data");
};

const fetchURL = async () => {
  options.body = JSON.stringify({ long_url: `${inputField.value}` });
  const res = await fetch(apiURL, options);
  const data = await res.json();
  return data;
};

linksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy")) {
    e.preventDefault(void 0);
    const linkElement = e.target.parentNode.querySelector(".link");
    const linkText = linkElement.textContent;
    navigator.clipboard.writeText(linkText);
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const shortenedURL = await fetchURL();
  linksContainer.innerHTML += `
  <ul class="links-list">
  <li class="link-item bg-white rounded-xl p-4 flex items-center justify-between grid grid-cols-1 justify-items-center md:grid-cols-2">
									<a class="text-zinc-900 text-lg font-bold text-center" href="">${inputField.value}</a>
									<div class="link__item-inner-wrapper grid grid-cols-1 justify-items-center md:block md:space-x-4">
										<a class="link text-lg font-bold mb-2 md:mb-0" href="${shortenedURL.link}">${shortenedURL.link}</a>
										<a class="copy btn btn-primary rounded-xl px-8 py-2 text-lg w-fit" href="">copy</a>
									</div>
								</li>
                </ul>
  `;
  saveData();
});

showData();
