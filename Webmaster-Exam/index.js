function createEl(tag, attr = {}, contents, eventListener = {}) {
  let element = document.createElement(tag);
  if (attr)
    Object.entries(attr).map(([key, value]) => {
      typeof value == "object"
        ? Object.entries(value).map(([innerKey, innerValue]) => (element[key][innerKey] = innerValue))
        : element.setAttribute(key, value);
    });
  if (eventListener) Object.entries(eventListener).map(([key, value]) => element.addEventListener(key, value));
  if (contents == null) return element;
  let append = (items) => element.append(items);
  Array.isArray(contents) ? contents.map((data) => append(data)) : append(contents);
  return element;
}
function Container(tag, className, contents) {
  let container = createEl(tag, { class: className });
  if (!contents) return container;
  Array.isArray(contents) ? contents.map((data) => container.append(data)) : container.append(contents);
  return container;
}
async function fetchAPI(url, cb) {
  await fetch(url, {
    cache: "no-cache",
  })
    .then((res) => res.json())
    .then((data) => cb(data))
    .catch((err) => {
      console.log(err);
    });
}
function App(selector, content = []) {
  let contents = content.map((data) => document.querySelector(`${selector}`).append(data));
}
function updateElement(selector, content) {
  let docs = (document.querySelector(`${selector}`).innerHTML = "");
  Array.isArray(content)
    ? content.map((data) => document.querySelector(`${selector}`).append(data))
    : document.querySelector(`${selector}`).append(content);
}
let Header = () => {
  return createEl("div", { class: "header" }, [
    createEl("div", { class: "text-container" }, [
      createEl("h3", { class: "subtitle" }, "888casino"),
      createEl("p", { class: "subtitle-desc" }, "1st Deposit Offer"),
      createEl("h1", { class: "title" }, "100% BONUS"),
      createEl("p", { class: "title-desc" }, "up to $100"),
      createEl("a", { class: "cta-btn" }, "Join 888casino Now"),
    ]),
  ]);
};

let Payment = () => {
  return createEl("div", { class: "payment-container" }, [
    createEl("div", {}, createEl("p", { class: "payment-text" }, "Accepted Payment Methods")),
    createEl("div", {}, createEl("img", { class: "payment-img", src: "./Assets/accepted-payment-visa-mc-pp.png" })),
  ]);
};

let Promotions = () => {
  let promotionsInfo = [
    {
      image: "./Assets/casino-welcome-package-promotion.jpg",
      text: "Premium Welcome Package - get up $1,500 bonus in your first week!",
    },
    {
      image: "./Assets/casino-teaser-live_888xtra-promotion.jpg",
      text: "Everyone loves something 'xtra'... Win a share of $750 every day",
    },
    {
      image: "./Assets/casino-teaser-live-VIPtime-promotion.jpg",
      text: "Raising the stakes VIP style... Win a share of $1,200 evey day",
    },
    {
      image: "./Assets/casino-teaser-live-lucky8-promotion.jpg",
      text: "Win a bonus every time the ball hits '8'",
    },
  ];

  return createEl("div", { class: "promotion-container" }, [
    createEl("div", { class: "title-container grey" }, [
      createEl("h1", { class: "promotion-title title" }, "888casino Promotions"),
      createEl("div", { class: "divider" }),
      createEl(
        "p",
        { class: "promotion-desc" },
        "From the moment you sign in at 888casino, you are treated to a generous bonus and it doesn't stop there! Rewarding bonuses, promo code treats & more are on offer for our 888casino players"
      ),
    ]),
    createEl("div", { class: "title-divier" }),
    createEl(
      "div",
      { class: "promotions-card-container grey" },
      createEl(
        "div",
        { class: "inner-container" },
        promotionsInfo.map(({ image, text }) =>
          createEl(
            "div",
            { class: "promotions-card", style: { backgroundImage: `url(${image})` } },
            createEl("div", { class: "promotions-text" }, [
              text,
              createEl("div", { class: "cta-container" }, [
                createEl("a", { class: "cta-btn" }, "Join 888casino"),
                createEl("a", { href: "#", style: { color: "white" } }, "Read More"),
              ]),
            ])
          )
        )
      )
    ),
  ]);
};
let jackpotTotal = 0;
let Footer = async () => {
  await fetchAPI(
    "http://feedsapi.safe-installation.com/api/GetJackpotTotalAmount?CurrencyCode=USD&currencySymbol=$&BrandID=0",
    (data) => {
      jackpotTotal = data.entity.totalAmount;
    }
  );

  return createEl("div", { class: "footer darkgrey footer-container" }, [
    createEl("div", { class: "footer-title" }, [
      createEl("h1", { class: "promotion-title title footer" }, "888casino Promotions"),
      createEl("div", { class: "divider footer" }),
      createEl(
        "p",
        { class: "footer-text" },
        "At 888, we believe in providing you the best experience in online gaming in just one place. From your first visit throughout your seniority in each of our sites, you enjoy the promotions including free bonuses, new senior members special offers."
      ),
      createEl("div", { class: "total-jackpot-container" }, [
        createEl("p", { style: { color: "white", fontWeight: "700" } }, "TOTAL JACKPOT"),
        createEl("p", { class: "jackpot" }, `$${jackpotTotal.toLocaleString()}`),
      ]),
    ]),
  ]);
};

setInterval(() => {
  let precision = 100;
  jackpotTotal += Math.floor(Math.random() * (2 * precision - 1 * precision) + 1 * precision) / (1 * precision);
  updateElement(".jackpot", `$${jackpotTotal.toLocaleString()}`);
}, 3000);

App(".main", [Header(), Payment(), Promotions(), await Footer()]);
