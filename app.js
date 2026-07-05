const series = {
  id: "0001",
  name: "#コンパス 戦闘摂理解析システム トレーディングカード付きウエハース",
  releaseDate: "2026/05/09",
  janCode: "4573668402579"
};

const heroes = [
  { id: 1, name: "十文字 アタリ" },
  { id: 2, name: "ジャスティス ハンコック" },
  { id: 3, name: "リリカ" },
  { id: 4, name: "双挽 乃保" },
  { id: 5, name: "桜華 忠臣" },
  { id: 6, name: "ジャンヌ ダルク" },
  { id: 7, name: "マルコス'55" },
  { id: 8, name: "ルチアーノ" },
  { id: 9, name: "Voidoll" },
  { id: 10, name: "深川 まとい" },
  { id: 11, name: "グスタフ ハイドリヒ" },
  { id: 12, name: "ニコラ テスラ" },
  { id: 13, name: "ヴィオレッタ ノワール" },
  { id: 14, name: "コクリコット ブランシュ" },
  { id: 15, name: "マリア＝S＝レオンブルク" },
  { id: 16, name: "アダム＝ユーリエフ" },
  { id: 17, name: "13†サーティーン†" },
  { id: 18, name: "かけだし勇者" },
  { id: 19, name: "メグメグ" },
  { id: 20, name: "イスタカ" },
  { id: 21, name: "輝龍院 きらら" },
  { id: 22, name: "ヴィーナス ポロロッチョ" },
  { id: 23, name: "ソーン＝ユーリエフ" },
  { id: 24, name: "デビルミント鬼龍 デルミン" },
  { id: 25, name: "トマス" },
  { id: 26, name: "零夜" },
  { id: 27, name: "ルルカ" },
  { id: 28, name: "ピエール 77世" },
  { id: 29, name: "狐ヶ咲 甘色" },
  { id: 30, name: "HM-WA100 ニーズヘッグ" },
  { id: 31, name: "ゲームバズーカガール" },
  { id: 32, name: "青春 アリス" },
  { id: 33, name: "イグニス＝ウィル＝ウィスプ" },
  { id: 34, name: "糸廻 輪廻" },
  { id: 35, name: "Bugdoll" },
  { id: 36, name: "ステリア・ララ・シルワ" },
  { id: 37, name: "ラヴィ・シュシュマルシュ" },
  { id: 38, name: "アル・ダハブ＝アルカティア" },
  { id: 39, name: "天空王 ぶれいずどらごん" },
  { id: 40, name: "某〈なにがし〉" },
  { id: 41, name: "クー・シー" },
  { id: 42, name: "アミスター＝バランディン" },
  { id: 43, name: "鬼ヶ式 うら" },
  { id: 44, name: "コラプス" },
  { id: 45, name: "みりぽゆ" },
  { id: 46, name: "チーちゃん" },
  { id: 47, name: "ペルリニエ" },
  { id: 48, name: "メルーニャ" },
  { id: 49, name: "†ファースト†" },
  { id: 50, name: "シャルル・リヒター" }
];

let storedCounts =
  JSON.parse(
    localStorage.getItem("storedCounts")
  ) || {};

let displayedCounts =
  JSON.parse(
    localStorage.getItem("displayedCounts")
  ) || {};

let selectedHeroId = null;

function saveCounts(){

  localStorage.setItem(
    "storedCounts",
    JSON.stringify(storedCounts)
  );

  localStorage.setItem(
    "displayedCounts",
    JSON.stringify(displayedCounts)
  );

}

document.getElementById("series-name").textContent = series.name;
document.getElementById("release-date").textContent = series.releaseDate;
document.getElementById("jan-code").textContent = series.janCode;

document.getElementById("hero-list").innerHTML =
  heroes.map(hero => `
    <button
      id="hero-${hero.id}"
      class="hero-button"
      onclick="selectHero(${hero.id})"
    >
      ${hero.name}
    </button>
  `).join("");

function renderGoods() {

const filteredGoods =
  selectedHeroId === null
    ? goods
    : goods.filter(item =>
        item.heroTags.includes(selectedHeroId)
      );

document.getElementById("goods-count").textContent =
  filteredGoods.length + "件";

document.getElementById("goods-list").innerHTML =
  filteredGoods.map(item => {

    const tags =
      item.heroTags
        .map(id =>
          heroes.find(hero => hero.id === id)?.name
        )
        .join("、");

    return `
      <div
        onclick="showGoodsDetail('${item.id}')"
        style="
          display:flex;
          align-items:center;
          gap:12px;
          padding:10px;
          border:1px solid #ccc;
          border-radius:8px;
          margin-bottom:8px;
          cursor:pointer;
        "
      >

        ${
          item.image
            ? `
              <img
                src="${item.image}"
                style="
                  width:60px;
                  height:60px;
                  object-fit:cover;
                  border:1px solid #ccc;
                  border-radius:6px;
                "
              >
            `
            : `
              <div
                style="
                  width:60px;
                  height:60px;
                  border:1px solid #ccc;
                  border-radius:6px;
                  display:flex;
                  justify-content:center;
                  align-items:center;
                  font-size:10px;
                  color:#999;
                "
              >
                No Image
              </div>
            `
        }

        <div
          style="
            flex:1;
            min-width:0;
          "
        >

          <div
            style="
              font-size:20px;
              font-weight:bold;
              line-height:1.3;
              word-break:break-word;
              overflow-wrap:anywhere;
            "
          >
            ${item.name}
          </div>

          <div
            style="
              word-break:break-word;
              overflow-wrap:anywhere;
            "
          >
            対象ヒーロー: ${tags}
          </div>

        </div>

      </div>
    `;

  }).join("");
}

function selectHero(heroId) {

  selectedHeroId = heroId;

  document
    .querySelectorAll(".hero-button")
    .forEach(button =>
      button.classList.remove("selected-hero")
    );

document
  .getElementById(`hero-${heroId}`)
  .classList.add("selected-hero");

document
  .getElementById("all-heroes-button")
  .classList.remove("selected-hero");

  const hero =
    heroes.find(h => h.id === heroId);

  document.getElementById("selected-hero").textContent =
    hero.name + " のグッズ";

  renderGoods();
}

function showAllHeroes() {

  selectedHeroId = null;

  document
    .querySelectorAll(".hero-button")
    .forEach(button =>
      button.classList.remove("selected-hero")
    );

  document
    .getElementById("all-heroes-button")
    .classList.add("selected-hero");

  document.getElementById("selected-hero").textContent =
    "全ヒーロー表示中";

  renderGoods();
}

function showGoodsDetail(goodsId) {

  const item =
    goods.find(g => g.id === goodsId);

  const heroNames =
    item.heroTags
      .map(id =>
        heroes.find(h => h.id === id)?.name
      )
      .join("、");

  const goodsSeries = series;

  const stored =
    storedCounts[item.id] || 0;

  const displayed =
    displayedCounts[item.id] || 0;

  const total =
    stored + displayed;

  const imageHtml =
    item.image
      ? `
        <img
          src="${item.image}"
          style="
            width:180px;
            border:1px solid #ccc;
            border-radius:8px;
            display:block;
            margin-bottom:15px;
          "
        >
      `
      : `
        <div
          style="
            width:180px;
            height:180px;
            border:1px solid #ccc;
            border-radius:8px;
            display:flex;
            justify-content:center;
            align-items:center;
            color:#999;
            margin-bottom:15px;
          "
        >
          No Image
        </div>
      `;

  document.getElementById("goods-detail").innerHTML =
`
${imageHtml}

<h3>${item.name}</h3>

    <p><b>種類</b><br>${item.type}</p>

    <p><b>シリーズ</b><br>${goodsSeries.name}</p>

    <p><b>発売日</b><br>${goodsSeries.releaseDate}</p>

    <p><b>価格</b><br>${item.price}円</p>

    <p><b>対象ヒーロー</b><br>${heroNames}</p>

    <p><b>保管数</b></p>

    <div
      style="
        display:flex;
        gap:8px;
        align-items:center;
      "
    >

      <button
        onclick="changeStoredCount('${item.id}',-1)"
      >
        −
      </button>

      <input
        type="number"
        min="0"
        value="${stored}"
        onchange="updateStoredCount('${item.id}',this.value)"
        style="
          width:70px;
          text-align:center;
        "
      >

      <button
        onclick="changeStoredCount('${item.id}',1)"
      >
        ＋
      </button>

    </div>

    <p><b>飾っている数</b></p>

    <div
      style="
        display:flex;
        gap:8px;
        align-items:center;
      "
    >

      <button
        onclick="changeDisplayedCount('${item.id}',-1)"
      >
        −
      </button>

      <input
        type="number"
        min="0"
        value="${displayed}"
        onchange="updateDisplayedCount('${item.id}',this.value)"
        style="
          width:70px;
          text-align:center;
        "
      >

      <button
        onclick="changeDisplayedCount('${item.id}',1)"
      >
        ＋
      </button>

    </div>

    <p><b>所持数</b><br>${total}</p>

    `;
}

function changeStoredCount(goodsId, amount){

  storedCounts[goodsId] =
    Math.max(
      0,
      (storedCounts[goodsId] || 0)
      + amount
    );

  saveCounts();

  showGoodsDetail(goodsId);

}

function updateStoredCount(goodsId,value){

  storedCounts[goodsId] =
    Math.max(
      0,
      Number(value) || 0
    );

  saveCounts();

  showGoodsDetail(goodsId);

}

function changeDisplayedCount(goodsId, amount){

  displayedCounts[goodsId] =
    Math.max(
      0,
      (displayedCounts[goodsId] || 0)
      + amount
    );

  saveCounts();

  showGoodsDetail(goodsId);

}

function updateDisplayedCount(goodsId,value){

  displayedCounts[goodsId] =
    Math.max(
      0,
      Number(value) || 0
    );

  saveCounts();

  showGoodsDetail(goodsId);

}

renderGoods();
