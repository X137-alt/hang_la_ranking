/*
  控制自动化考研院校难度精细排名
  目录规则：
  1. 推荐把学校 Logo 放进 assets/logos/ 文件夹；
  2. 图片文件名用院校名称，例如 清华大学.png；
  3. 如果你之前放在 logos/ 或仓库根目录，脚本也会自动尝试读取；
  4. 后续新增学校：在 schools 数组里新增一个对象即可。
*/

const levels = [
  // 从“夯”到“拉完了”按难度递减，颜色也从更强烈逐步变轻。
  { id: "hard", name: "夯", note: "顶级难度", color: "#ef4444", surfaceAlpha: 0.46 },
  { id: "top", name: "顶级", note: "强校强方向", color: "#f97316", surfaceAlpha: 0.40 },
  { id: "strong", name: "人上人", note: "竞争激烈", color: "#facc15", surfaceAlpha: 0.34 },
  { id: "value", name: "性价比", note: "值得冲刺", color: "#4ade80", surfaceAlpha: 0.28 },
  { id: "npc", name: "NPC", note: "正常难度", color: "#60a5fa", surfaceAlpha: 0.24 },
  { id: "low", name: "拉完了", note: "相对友好", color: "#e5e7eb", surfaceAlpha: 0.22 },
];

const schools = [
  { id: "thu", shortName: "清华", fullName: "清华大学", city: "北京", tags: ["985", "控制顶级", "复试强筛"], difficulty: 99 },
  { id: "zju", shortName: "浙大", fullName: "浙江大学", city: "杭州", tags: ["985", "控制A+", "热度极高"], difficulty: 97 },
  { id: "sjtu", shortName: "上交", fullName: "上海交通大学", city: "上海", tags: ["985", "控制强校", "区位极热"], difficulty: 96 },
  { id: "hit", shortName: "哈工大", fullName: "哈尔滨工业大学", city: "哈尔滨/深圳/威海", tags: ["985", "工科强校", "平台强"], difficulty: 95 },
  { id: "buaa", shortName: "北航", fullName: "北京航空航天大学", city: "北京", tags: ["985", "自动化强", "北京高热"], difficulty: 95, logoNames: ["北京航空航天大学"] },
  { id: "xjtu", shortName: "西交", fullName: "西安交通大学", city: "西安", tags: ["985", "控制强", "竞争高"], difficulty: 94 },
  { id: "hust", shortName: "华科", fullName: "华中科技大学", city: "武汉", tags: ["985", "电气自动化强", "热度高"], difficulty: 94, logoNames: ["华科", "华中科技大学"] },
  { id: "nudt", shortName: "国防科大", fullName: "国防科技大学", city: "长沙", tags: ["985", "军工强校", "门槛特殊"], difficulty: 93, logoNames: ["国防科大", "国防科技大学"] },
  { id: "seu", shortName: "东南", fullName: "东南大学", city: "南京", tags: ["985", "自动化强", "南京高热"], difficulty: 93 },
  { id: "bit", shortName: "北理", fullName: "北京理工大学", city: "北京", tags: ["985", "兵工强校", "区位热"], difficulty: 92 },
  { id: "scut", shortName: "华工", fullName: "华南理工大学", city: "广州", tags: ["985", "工科强", "华南热"], difficulty: 91 },
  { id: "tju", shortName: "天大", fullName: "天津大学", city: "天津", tags: ["985", "工科强", "热度高"], difficulty: 91 },
  { id: "whu", shortName: "武大", fullName: "武汉大学", city: "武汉", tags: ["985", "综合强", "名校光环"], difficulty: 90 },
  { id: "sdu", shortName: "山大", fullName: "山东大学", city: "济南", tags: ["985", "综合强", "规模大"], difficulty: 89 },
  { id: "tongji", shortName: "同济", fullName: "同济大学", city: "上海", tags: ["985", "上海", "名校热"], difficulty: 89 },
  { id: "njust", shortName: "南理工", fullName: "南京理工大学", city: "南京", tags: ["211", "兵工强", "控制强"], difficulty: 88 },
  { id: "xidian", shortName: "西电", fullName: "西安电子科技大学", city: "西安", tags: ["211", "电子信息强", "热度高"], difficulty: 88 },
  { id: "bjut", shortName: "北工", fullName: "北京工业大学", city: "北京", tags: ["211", "北京", "性价比争议"], difficulty: 87, logoNames: ["北工", "北京工业大学"] },
  { id: "bupt", shortName: "北邮", fullName: "北京邮电大学", city: "北京", tags: ["211", "信息强校", "跨考热"], difficulty: 87, logoNames: ["北邮", "北京邮电大学"] },
  { id: "nuaa", shortName: "南航", fullName: "南京航空航天大学", city: "南京", tags: ["211", "航空航天", "自动化强"], difficulty: 86 },
  { id: "cqu", shortName: "重大", fullName: "重庆大学", city: "重庆", tags: ["985", "工科强", "西南热"], difficulty: 86 },
  { id: "uestc", shortName: "电科大", fullName: "电子科技大学", city: "成都", tags: ["985", "电子强校", "热度高"], difficulty: 86 },
  { id: "jlu", shortName: "吉大", fullName: "吉林大学", city: "长春", tags: ["985", "综合强", "地域缓冲"], difficulty: 85 },
  { id: "nwpu", shortName: "西工大", fullName: "西北工业大学", city: "西安", tags: ["985", "三航强校", "工科强"], difficulty: 85 },
  { id: "dlut", shortName: "大工", fullName: "大连理工大学", city: "大连", tags: ["985", "工科强", "东北名校"], difficulty: 84 },
  { id: "hnu", shortName: "湖大", fullName: "湖南大学", city: "长沙", tags: ["985", "综合强", "城市热"], difficulty: 84 },
  { id: "xmu", shortName: "厦大", fullName: "厦门大学", city: "厦门", tags: ["985", "名校", "城市吸引"], difficulty: 83 },
  { id: "sysu", shortName: "中山", fullName: "中山大学", city: "广州/深圳", tags: ["985", "华南名校", "热度高"], difficulty: 83 },
  { id: "swjtu", shortName: "西南交", fullName: "西南交通大学", city: "成都", tags: ["211", "交通强校", "方向稳定"], difficulty: 82 },
  { id: "bjtu", shortName: "北交", fullName: "北京交通大学", city: "北京", tags: ["211", "交通强校", "北京热"], difficulty: 82 },
  { id: "hhu", shortName: "河海", fullName: "河海大学", city: "南京", tags: ["211", "工科特色", "南京"], difficulty: 81 },
  { id: "hebut", shortName: "河工", fullName: "河北工业大学", city: "天津", tags: ["211", "区位较好", "工科"], difficulty: 80 },
  { id: "ustb", shortName: "北科", fullName: "北京科技大学", city: "北京", tags: ["211", "北京", "工科强"], difficulty: 80, logoNames: ["北京科技大学"] },
  { id: "nankai", shortName: "南开", fullName: "南开大学", city: "天津", tags: ["985", "名校", "工科体量较小"], difficulty: 79 },
  { id: "suda", shortName: "苏大", fullName: "苏州大学", city: "苏州", tags: ["211", "城市热", "综合强"], difficulty: 79 },
  { id: "fzu", shortName: "福大", fullName: "福州大学", city: "福州", tags: ["211", "省属强校", "热度上升"], difficulty: 78 },
  { id: "nku", shortName: "南开", fullName: "南开大学", city: "天津", tags: ["985", "综合名校", "谨慎核实方向"], difficulty: 78, hiddenDuplicate: true },
  { id: "shmtu", shortName: "上海海事", fullName: "上海海事大学", city: "上海", tags: ["双非", "上海", "行业特色"], difficulty: 77 },
  { id: "shou", shortName: "上海海洋", fullName: "上海海洋大学", city: "上海", tags: ["双一流", "上海", "专业差异"], difficulty: 76 },
  { id: "shanghaiu", shortName: "上大", fullName: "上海大学", city: "上海", tags: ["211", "上海", "热度高"], difficulty: 76, logoNames: ["上海大学"] },
  { id: "hfut", shortName: "合工大", fullName: "合肥工业大学", city: "合肥", tags: ["211", "工科强", "车辆电气"], difficulty: 75 },
  { id: "whut", shortName: "武理", fullName: "武汉理工大学", city: "武汉", tags: ["211", "工科强", "规模大"], difficulty: 75, logoNames: ["武理", "武汉理工大学"] },
  { id: "ecust", shortName: "华理", fullName: "华东理工大学", city: "上海", tags: ["211", "上海", "工科强"], difficulty: 74 },
  { id: "csu", shortName: "中南", fullName: "中南大学", city: "长沙", tags: ["985", "综合强", "方向差异"], difficulty: 74 },
  { id: "cpu_bj", shortName: "中石大北", fullName: "中国石油大学(北京)", city: "北京", tags: ["211", "能源特色", "北京"], difficulty: 73, logoNames: ["中国石油大学(北京)", "中国石油大学（北京）"] },
  { id: "cpu_hd", shortName: "中石大华", fullName: "中国石油大学(华东)", city: "青岛", tags: ["211", "能源特色", "青岛"], difficulty: 72, logoNames: ["中国石油大学(华东)", "中国石油大学（华东）"] },
  { id: "cuge", shortName: "地大", fullName: "中国地质大学", city: "武汉/北京", tags: ["211", "行业特色", "方向差异"], difficulty: 72, logoNames: ["中国地质大学"] },
  { id: "ouc", shortName: "海大", fullName: "中国海洋大学", city: "青岛", tags: ["985", "海洋特色", "方向差异"], difficulty: 72 },
  { id: "njfu", shortName: "南林", fullName: "南京林业大学", city: "南京", tags: ["双一流", "南京", "工科方向"], difficulty: 71 },
  { id: "zzu", shortName: "郑大", fullName: "郑州大学", city: "郑州", tags: ["211", "体量大", "省内热"], difficulty: 71 },
  { id: "ahnu", shortName: "安大", fullName: "安徽大学", city: "合肥", tags: ["211", "合肥", "区域热"], difficulty: 70, logoNames: ["安大", "安徽大学"] },
  { id: "ndu", shortName: "南大", fullName: "南京大学", city: "南京", tags: ["985", "顶级名校", "方向需核实"], difficulty: 70 },
  { id: "njust2", shortName: "南理工", fullName: "南京理工大学", city: "南京", tags: ["211", "强方向", "重复保护"], difficulty: 70, hiddenDuplicate: true },
  { id: "neau", shortName: "东北", fullName: "东北大学", city: "沈阳", tags: ["985", "自动化传统强", "地域缓冲"], difficulty: 69 },
  { id: "chd", shortName: "长安", fullName: "长安大学", city: "西安", tags: ["211", "交通土木特色", "方向差异"], difficulty: 68 },
  { id: "scu", shortName: "川大", fullName: "四川大学", city: "成都", tags: ["985", "综合名校", "方向差异"], difficulty: 68 },
  { id: "njnu", shortName: "南师", fullName: "南京师范大学", city: "南京", tags: ["211", "南京", "方向偏差"], difficulty: 66 },
  { id: "nuist", shortName: "南信大", fullName: "南京信息工程大学", city: "南京", tags: ["双一流", "信息特色", "热度上升"], difficulty: 66 },
  { id: "szu", shortName: "深大", fullName: "深圳大学", city: "深圳", tags: ["双非", "深圳", "热度高"], difficulty: 66 },
  { id: "ccnu", shortName: "华师", fullName: "华中师范大学", city: "武汉", tags: ["211", "师范", "方向需核实"], difficulty: 65, logoNames: ["华师", "华中师范大学"] },
  { id: "xju", shortName: "新大", fullName: "新疆大学", city: "乌鲁木齐", tags: ["211", "地域友好", "调剂关注"], difficulty: 63 },
  { id: "gxun", shortName: "广西大", fullName: "广西大学", city: "南宁", tags: ["211", "地域缓冲", "性价比"], difficulty: 62 },
  { id: "lzu", shortName: "兰大", fullName: "兰州大学", city: "兰州", tags: ["985", "地域缓冲", "名校"], difficulty: 62 },
  { id: "ynu", shortName: "云大", fullName: "云南大学", city: "昆明", tags: ["211", "地域友好", "专业差异"], difficulty: 61 },
  { id: "gzun", shortName: "贵大", fullName: "贵州大学", city: "贵阳", tags: ["211", "地域友好", "性价比"], difficulty: 60 },
  { id: "jiangnan", shortName: "江南", fullName: "江南大学", city: "无锡", tags: ["211", "城市较好", "方向差异"], difficulty: 60 },
  { id: "qhu", shortName: "青大", fullName: "青海大学", city: "西宁", tags: ["211", "地域友好", "稳妥"], difficulty: 58 },
  { id: "ncut", shortName: "北方工大", fullName: "北方工业大学", city: "北京", tags: ["双非", "北京", "普通难度"], difficulty: 57, logoNames: ["北方工业大学"] },
  { id: "nefu", shortName: "东北林大", fullName: "东北林业大学", city: "哈尔滨", tags: ["211", "林业特色", "方向差异"], difficulty: 56 },
  { id: "sdut", shortName: "山理工", fullName: "山东理工大学", city: "淄博", tags: ["双非", "省属", "稳妥"], difficulty: 55 },
  { id: "qdut", shortName: "青理工", fullName: "青岛理工大学", city: "青岛", tags: ["双非", "城市较好", "稳妥"], difficulty: 54 },
  { id: "hfuu", shortName: "合工大?", fullName: "合肥工业大学", city: "合肥", tags: ["重复保护"], difficulty: 54, hiddenDuplicate: true },
  { id: "gxu", shortName: "广西", fullName: "广西大学", city: "南宁", tags: ["重复保护"], difficulty: 54, hiddenDuplicate: true },
  { id: "tjpu", shortName: "天工大", fullName: "天津工业大学", city: "天津", tags: ["双一流", "工科", "相对友好"], difficulty: 53 },
  { id: "nbu", shortName: "宁大", fullName: "宁波大学", city: "宁波", tags: ["双一流", "城市较好", "性价比"], difficulty: 52 },
  { id: "xust", shortName: "西安科大", fullName: "西安科技大学", city: "西安", tags: ["双非", "稳妥", "方向差异"], difficulty: 51 },
  { id: "wust", shortName: "武科大", fullName: "武汉科技大学", city: "武汉", tags: ["双非", "工科", "稳妥"], difficulty: 50 },
  { id: "cuit", shortName: "成信大", fullName: "成都信息工程大学", city: "成都", tags: ["双非", "信息特色", "稳妥"], difficulty: 49 },
  { id: "dlmu", shortName: "大连海事", fullName: "大连海事大学", city: "大连", tags: ["211", "行业特色", "方向差异"], difficulty: 49 },
  { id: "shisu", shortName: "上外?", fullName: "上海大学", city: "上海", tags: ["重复保护"], difficulty: 48, hiddenDuplicate: true },
  { id: "guet", shortName: "桂电", fullName: "桂林电子科技大学", city: "桂林", tags: ["双非", "电子特色", "性价比"], difficulty: 47, logoNames: ["桂电", "桂林电子科技大学"] },
  { id: "nchu", shortName: "南昌航空", fullName: "南昌航空大学", city: "南昌", tags: ["双非", "航空特色", "稳妥"], difficulty: 46, logoNames: ["南昌航空大学"] },
  { id: "xupt", shortName: "西邮", fullName: "西安邮电大学", city: "西安", tags: ["双非", "通信信息", "稳妥"], difficulty: 45, logoNames: ["西邮", "西安邮电大学"] },
].filter((school) => !school.hiddenDuplicate);

const STORAGE_KEY = "control-auto-school-logo-ranking-v9-logo-glow-fill";
const LEGACY_KEYS = [];
const EDGE_PADDING = 12;
const LOGO_DIRS = ["assets/logos/", "logos/", "./"];

const axisLabels = document.querySelector("#axisLabels");
const rankSurface = document.querySelector("#rankSurface");
const poolZone = document.querySelector(".pool-zone");
const poolList = document.querySelector("#poolList");
const resetBtn = document.querySelector("#resetBtn");
const arrangeBtn = document.querySelector("#arrangeBtn");
const exportBtn = document.querySelector("#exportBtn");
const liveBtn = document.querySelector("#liveBtn");
const fullscreenBtn = document.querySelector("#fullscreenBtn");
const saveStatus = document.querySelector("#saveStatus");
const exportDialog = document.querySelector("#exportDialog");
const exportText = document.querySelector("#exportText");
const copyExportBtn = document.querySelector("#copyExportBtn");

// 浏览器原生图片拖拽保护：真实 Logo 图片会默认变成“图片拖拽”，需要统一关闭。
document.addEventListener("dragstart", (event) => {
  if (event.target.closest?.(".school-card")) event.preventDefault();
});

const schoolById = new Map(schools.map((school) => [school.id, school]));
let currentState = getDefaultState();
let draggedCard = null;
let dragOrigin = null;
let dragPointerOffset = { x: 0, y: 0 };
let dragStartPosition = null;
let poolPlaceholder = null;
let saveTimer = null;
let resizeTimer = null;

function initApp() {
  document.documentElement.style.setProperty("--level-count", String(levels.length));
  currentState = loadState();
  renderAxis();
  applySurfaceGradient();
  renderCards();
  resetBtn.addEventListener("click", resetRanking);
  arrangeBtn.addEventListener("click", () => autoArrangeAll());
  exportBtn.addEventListener("click", exportRanking);
  copyExportBtn.addEventListener("click", copyExportText);
  liveBtn.addEventListener("click", toggleLiveMode);
  fullscreenBtn.addEventListener("click", toggleFullscreen);
  window.addEventListener("beforeunload", () => saveState(false));
  window.addEventListener("resize", handleResize);
  window.visualViewport?.addEventListener("resize", handleResize);
}


function getDefaultState() {
  return {
    pool: schools.map((school) => school.id),
    placed: {},
  };
}

function loadState() {
  const keys = [STORAGE_KEY, ...LEGACY_KEYS];
  for (const key of keys) {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      if (saved) return normalizeState(saved);
    } catch {
      // ignore broken cache
    }
  }
  return getDefaultState();
}

function normalizeState(rawState) {
  if (isStatusMapState(rawState)) return normalizeStatusMapState(rawState);
  return normalizeListState(rawState);
}

function isStatusMapState(rawState) {
  if (!rawState || Array.isArray(rawState) || rawState.pool || rawState.placed) return false;
  return Object.values(rawState).some((value) => value && (value.status === "ranked" || value.status === "unranked"));
}

function normalizeStatusMapState(rawState) {
  const seen = new Set();
  const state = { pool: [], placed: {} };
  Object.entries(rawState || {}).forEach(([schoolId, value]) => {
    if (!schoolById.has(schoolId) || seen.has(schoolId)) return;
    if (value.status === "ranked") {
      state.placed[schoolId] = {
        x: clamp(Number(value.x) || 0, 0, 100),
        y: clamp(Number(value.y) || 0, 0, 100),
      };
    } else {
      state.pool.push(schoolId);
    }
    seen.add(schoolId);
  });
  schools.forEach((school) => {
    if (!seen.has(school.id)) state.pool.push(school.id);
  });
  return state;
}

function normalizeListState(rawState) {
  const seen = new Set();
  const state = { pool: [], placed: {} };
  Object.entries(rawState?.placed || {}).forEach(([schoolId, position]) => {
    if (!schoolById.has(schoolId) || seen.has(schoolId)) return;
    state.placed[schoolId] = {
      x: clamp(Number(position.x) || 0, 0, 100),
      y: clamp(Number(position.y) || 0, 0, 100),
    };
    seen.add(schoolId);
  });
  (rawState?.pool || []).forEach((schoolId) => {
    if (schoolById.has(schoolId) && !seen.has(schoolId)) {
      state.pool.push(schoolId);
      seen.add(schoolId);
    }
  });
  schools.forEach((school) => {
    if (!seen.has(school.id)) state.pool.push(school.id);
  });
  return state;
}

function saveState(showStatus = true) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeStateForStorage()));
  if (showStatus) flashSaveStatus();
}

function serializeStateForStorage() {
  return {
    pool: [...currentState.pool],
    placed: Object.fromEntries(
      Object.entries(currentState.placed).map(([schoolId, position]) => [
        schoolId,
        { x: round1(position.x), y: round1(position.y) },
      ])
    ),
  };
}

function flashSaveStatus() {
  clearTimeout(saveTimer);
  saveStatus.textContent = "已自动保存";
  saveStatus.classList.add("saved");
  saveTimer = setTimeout(() => {
    saveStatus.textContent = "自动保存已开启";
    saveStatus.classList.remove("saved");
  }, 1200);
}

function renderAxis() {
  axisLabels.innerHTML = levels
    .map(
      (level) => `
        <div class="level-cell" style="background:${level.color}">
          <span>${level.name}</span>
        </div>
      `
    )
    .join("");
}

function applySurfaceGradient() {
  const step = 100 / levels.length;
  const stops = levels
    .map((level, index) => {
      const start = Math.max(0, index * step - 0.35);
      const end = Math.min(100, (index + 1) * step + 0.35);
      return `${hexToRgba(level.color, level.surfaceAlpha ?? 0.34)} ${start}% ${end}%`;
    })
    .join(", ");
  rankSurface.style.setProperty("--surface-gradient", `linear-gradient(90deg, ${stops})`);
}

function renderCards() {
  poolList.innerHTML = "";
  rankSurface.querySelectorAll(".school-card").forEach((card) => card.remove());

  currentState.pool.forEach((schoolId) => {
    const school = schoolById.get(schoolId);
    if (school) poolList.appendChild(createSchoolCard(school));
  });

  Object.entries(currentState.placed).forEach(([schoolId, position]) => {
    const school = schoolById.get(schoolId);
    if (!school) return;
    const card = createSchoolCard(school);
    rankSurface.appendChild(card);
    placeCard(card, position.x, position.y);
  });
}

function createSchoolCard(school) {
  const card = document.createElement("article");
  card.className = "school-card";
  card.dataset.schoolId = school.id;
  card.draggable = false;
  card.setAttribute("draggable", "false");
  card.title = school.fullName;

  const logoBox = document.createElement("div");
  logoBox.className = "logo-box";

  const img = document.createElement("img");
  img.alt = school.fullName;
  img.loading = "lazy";
  img.draggable = false;
  img.setAttribute("draggable", "false");
  img.dataset.logoIndex = "0";
  img.dataset.logoCandidates = JSON.stringify(getLogoCandidates(school));
  img.addEventListener("error", handleLogoError);
  // 关键修复：真实图片会触发浏览器原生图片拖拽，导致自定义 pointer 拖拽被抢走。
  // 禁止原生 dragstart 后，带 Logo 和无 Logo 的卡片都可以按同一套逻辑拖动。
  img.addEventListener("dragstart", (event) => event.preventDefault());
  img.src = getLogoCandidates(school)[0];

  const fallback = document.createElement("span");
  fallback.className = "logo-fallback";
  fallback.textContent = school.shortName;

  const shortName = document.createElement("div");
  shortName.className = "school-short";
  shortName.textContent = school.shortName;

  logoBox.append(img, fallback);
  card.append(logoBox, shortName);
  card.addEventListener("pointerdown", handlePointerDown);
  card.addEventListener("dragstart", (event) => event.preventDefault());
  return card;
}

function getLogoCandidates(school) {
  const fileNames = unique([...(school.logoNames || []), school.fullName, school.shortName])
    .filter(Boolean)
    .map((name) => `${name}.png`);
  return LOGO_DIRS.flatMap((dir) => fileNames.map((file) => `${dir}${file}`));
}

function handleLogoError(event) {
  const img = event.currentTarget;
  const candidates = JSON.parse(img.dataset.logoCandidates || "[]");
  const nextIndex = Number(img.dataset.logoIndex || 0) + 1;
  if (nextIndex < candidates.length) {
    img.dataset.logoIndex = String(nextIndex);
    img.src = candidates[nextIndex];
  } else {
    img.closest(".school-card")?.classList.add("logo-error");
  }
}

function handlePointerDown(event) {
  if (event.button !== 0) return;
  if (draggedCard) return;

  // 关键修复：阻止图片、文字、链接等子元素触发浏览器默认拖拽/选中行为。
  event.preventDefault();
  event.stopPropagation();

  draggedCard = event.currentTarget;
  draggedCard.setPointerCapture?.(event.pointerId);
  dragOrigin = draggedCard.parentElement === rankSurface ? "surface" : "pool";
  dragStartPosition = currentState.placed[draggedCard.dataset.schoolId] || null;

  const cardRect = draggedCard.getBoundingClientRect();
  dragPointerOffset = {
    x: event.clientX - cardRect.left,
    y: event.clientY - cardRect.top,
  };

  ensurePoolPlaceholder();
  if (dragOrigin === "pool") {
    poolList.insertBefore(poolPlaceholder, draggedCard.nextSibling);
  }

  draggedCard.classList.add("is-dragging");
  draggedCard.style.width = `${cardRect.width}px`;
  draggedCard.style.position = "fixed";
  draggedCard.style.left = `${cardRect.left}px`;
  draggedCard.style.top = `${cardRect.top}px`;
  draggedCard.style.margin = "0";
  document.body.appendChild(draggedCard);

  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("pointerup", handlePointerUp, { once: true });
  document.addEventListener("pointercancel", handlePointerCancel, { once: true });
}

function handlePointerMove(event) {
  if (!draggedCard) return;
  event.preventDefault();
  positionDraggedCard(event.clientX, event.clientY);

  const overSurface = isPointInside(rankSurface, event.clientX, event.clientY);
  const overPool = isPointInside(poolZone, event.clientX, event.clientY);
  rankSurface.classList.toggle("is-active-drop", overSurface);
  poolZone.classList.toggle("is-active-drop", overPool);
  poolList.classList.toggle("is-active-drop", overPool);

  if (overPool) {
    updatePoolPlaceholder(event.clientX, event.clientY);
  } else if (dragOrigin !== "pool") {
    removePoolPlaceholder();
  }
}

function handlePointerUp(event) {
  if (!draggedCard) return;
  event.preventDefault();
  const droppedInPool = isPointInside(poolZone, event.clientX, event.clientY);
  const droppedInSurface = isPointInside(rankSurface, event.clientX, event.clientY);
  const schoolId = draggedCard.dataset.schoolId;

  if (droppedInPool) {
    dropDraggedCardIntoPool();
    moveSchoolToPool(schoolId);
  } else if (droppedInSurface) {
    const position = getBoardPositionFromPointer(event.clientX, event.clientY);
    dropDraggedCardIntoBoard(position);
    moveSchoolToBoard(schoolId, position.x, position.y);
  } else {
    revertDraggedCard();
  }

  endDrag();
}

function handlePointerCancel() {
  if (!draggedCard) return;
  revertDraggedCard();
  endDrag();
}

function positionDraggedCard(clientX, clientY) {
  draggedCard.style.left = `${clientX - dragPointerOffset.x}px`;
  draggedCard.style.top = `${clientY - dragPointerOffset.y}px`;
}

function dropDraggedCardIntoBoard(position) {
  removePoolPlaceholder();
  clearDragCardStyles(draggedCard);
  rankSurface.appendChild(draggedCard);
  placeCard(draggedCard, position.x, position.y);
}

function dropDraggedCardIntoPool() {
  ensurePoolPlaceholder();
  clearDragCardStyles(draggedCard);
  if (poolPlaceholder.parentElement === poolList) {
    poolList.insertBefore(draggedCard, poolPlaceholder);
  } else {
    poolList.appendChild(draggedCard);
  }
  removePoolPlaceholder();
}

function revertDraggedCard() {
  const schoolId = draggedCard.dataset.schoolId;
  if (dragOrigin === "surface" && dragStartPosition) {
    dropDraggedCardIntoBoard(dragStartPosition);
    moveSchoolToBoard(schoolId, dragStartPosition.x, dragStartPosition.y, false);
    return;
  }
  dropDraggedCardIntoPool();
  moveSchoolToPool(schoolId, false);
}

function endDrag() {
  draggedCard?.classList.remove("is-dragging");
  rankSurface.classList.remove("is-active-drop");
  poolZone.classList.remove("is-active-drop");
  poolList.classList.remove("is-active-drop");
  removePoolPlaceholder();
  document.removeEventListener("pointermove", handlePointerMove);
  document.removeEventListener("pointerup", handlePointerUp);
  document.removeEventListener("pointercancel", handlePointerCancel);
  draggedCard = null;
  dragOrigin = null;
  dragStartPosition = null;
}

function clearDragCardStyles(card) {
  card.style.position = "";
  card.style.width = "";
  card.style.margin = "";
  card.style.left = "";
  card.style.top = "";
}

function isPointInside(element, x, y) {
  const rect = element.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function ensurePoolPlaceholder() {
  if (poolPlaceholder) return;
  poolPlaceholder = document.createElement("div");
  poolPlaceholder.className = "school-placeholder";
  poolPlaceholder.setAttribute("aria-hidden", "true");
}

function updatePoolPlaceholder(pointerX, pointerY) {
  ensurePoolPlaceholder();
  const nextCard = getPoolInsertBeforeCard(pointerX, pointerY);
  if (nextCard) {
    poolList.insertBefore(poolPlaceholder, nextCard);
  } else {
    poolList.appendChild(poolPlaceholder);
  }
}

function removePoolPlaceholder() {
  poolPlaceholder?.remove();
}

function getPoolInsertBeforeCard(pointerX, pointerY) {
  const cards = Array.from(poolList.querySelectorAll(".school-card")).filter((card) => card !== draggedCard);
  return cards.find((card) => {
    const rect = card.getBoundingClientRect();
    const sameRowBeforeMiddle = pointerY <= rect.bottom && pointerY >= rect.top && pointerX < rect.left + rect.width / 2;
    return pointerY < rect.top + rect.height / 2 || sameRowBeforeMiddle;
  });
}

function getBoardPositionFromPointer(pointerX, pointerY) {
  const surfaceRect = rankSurface.getBoundingClientRect();
  const cardRect = draggedCard.getBoundingClientRect();
  const maxLeft = Math.max(EDGE_PADDING, surfaceRect.width - cardRect.width - EDGE_PADDING);
  const maxTop = Math.max(EDGE_PADDING, surfaceRect.height - cardRect.height - EDGE_PADDING);
  const left = clamp(pointerX - surfaceRect.left - dragPointerOffset.x, EDGE_PADDING, maxLeft);
  const top = clamp(pointerY - surfaceRect.top - dragPointerOffset.y, EDGE_PADDING, maxTop);
  return {
    x: round1((left / maxLeft) * 100),
    y: round1((top / maxTop) * 100),
  };
}

function placeCard(card, xPercent, yPercent) {
  const surfaceRect = rankSurface.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const maxLeft = Math.max(EDGE_PADDING, surfaceRect.width - cardRect.width - EDGE_PADDING);
  const maxTop = Math.max(EDGE_PADDING, surfaceRect.height - cardRect.height - EDGE_PADDING);
  card.style.left = `${clamp((xPercent / 100) * maxLeft, EDGE_PADDING, maxLeft)}px`;
  card.style.top = `${clamp((yPercent / 100) * maxTop, EDGE_PADDING, maxTop)}px`;
}

function moveSchoolToBoard(schoolId, x, y, shouldSave = true) {
  currentState.pool = currentState.pool.filter((id) => id !== schoolId);
  currentState.placed[schoolId] = {
    x: clamp(Number(x) || 0, 0, 100),
    y: clamp(Number(y) || 0, 0, 100),
  };
  if (shouldSave) saveState();
}

function moveSchoolToPool(schoolId, shouldSave = true) {
  delete currentState.placed[schoolId];
  syncPoolOrderFromDom();
  if (!currentState.pool.includes(schoolId)) currentState.pool.push(schoolId);
  if (shouldSave) saveState();
}

function syncPoolOrderFromDom() {
  const idsInDom = Array.from(poolList.querySelectorAll(".school-card")).map((card) => card.dataset.schoolId);
  const idsInDomSet = new Set(idsInDom);
  const remainingPoolIds = currentState.pool.filter((schoolId) => !idsInDomSet.has(schoolId));
  currentState.pool = [...idsInDom, ...remainingPoolIds].filter((schoolId) => !currentState.placed[schoolId]);
}

function resetRanking() {
  localStorage.removeItem(STORAGE_KEY);
  currentState = getDefaultState();
  saveState();
  renderCards();
}

function getCardMetrics() {
  const sample = rankSurface.querySelector(".school-card") || poolList.querySelector(".school-card");
  if (sample) {
    const rect = sample.getBoundingClientRect();
    return {
      cardWidth: Math.max(88, rect.width),
      cardHeight: Math.max(104, rect.height),
    };
  }
  return {
    cardWidth: 150,
    cardHeight: 178,
  };
}

function getDefaultSurfaceHeight() {
  const surfaceHeight = rankSurface.getBoundingClientRect().height;
  return Math.max(360, surfaceHeight || window.innerHeight - 300);
}

function updateRankSurfaceHeightForCurrentLayout() {
  // 参考原站的缩放逻辑：排名面板高度由 100vh 网格自动分配，
  // 不在 JS 中写入固定 min-height，避免 Ctrl+鼠标滚轮缩放后版面“锁死”。
  rankSurface.style.minHeight = "";
}

function autoArrangeAll() {
  const surfaceRect = rankSurface.getBoundingClientRect();
  const { cardWidth, cardHeight } = getCardMetrics();
  const cardGap = Math.max(10, Math.round(cardWidth * 0.08));
  const tierWidth = Math.max(cardWidth + EDGE_PADDING * 2, surfaceRect.width / levels.length);
  const columnsPerTier = Math.max(1, Math.floor((tierWidth - EDGE_PADDING * 2 + cardGap) / (cardWidth + cardGap)));
  const rowsByTier = new Map(levels.map((level) => [level.id, 0]));
  const countByTier = new Map(levels.map((level) => [level.id, 0]));

  const grouped = new Map(levels.map((level) => [level.id, []]));
  [...schools]
    .sort((a, b) => b.difficulty - a.difficulty || a.fullName.localeCompare(b.fullName, "zh-CN"))
    .forEach((school) => grouped.get(getDifficultyLevel(school.difficulty).id)?.push(school));

  const maxRows = Math.max(
    1,
    ...Array.from(grouped.values()).map((items) => Math.ceil(items.length / columnsPerTier))
  );
  const neededHeight = Math.max(getDefaultSurfaceHeight(), maxRows * (cardHeight + cardGap) + 90);
  // 不写入固定 min-height；让 CSS 网格随浏览器缩放自动伸缩。

  const newPlaced = {};
  levels.forEach((level, tierIndex) => {
    const items = grouped.get(level.id) || [];
    items.forEach((school, index) => {
      const col = index % columnsPerTier;
      const row = Math.floor(index / columnsPerTier);
      rowsByTier.set(level.id, row);
      countByTier.set(level.id, index + 1);

      const tierStart = (tierIndex / levels.length) * 100;
      const tierStep = 100 / levels.length;
      const xInsideTier = columnsPerTier === 1 ? 50 : ((col + 0.5) / columnsPerTier) * 100;
      const x = tierStart + (xInsideTier / 100) * tierStep;
      const y = maxRows <= 1 ? 16 : 5 + (row / Math.max(1, maxRows - 1)) * 86;
      newPlaced[school.id] = { x: round1(x), y: round1(y) };
    });
  });

  currentState = { pool: [], placed: newPlaced };
  saveState();
  renderCards();
}

function exportRanking() {
  const rows = Object.entries(currentState.placed)
    .sort((a, b) => a[1].x - b[1].x || a[1].y - b[1].y)
    .map(([schoolId, position], index) => {
      const school = schoolById.get(schoolId);
      const level = getPositionLevel(position.x);
      return `${index + 1}. ${school.shortName} - ${school.fullName}｜${school.city}｜${level.name}｜模型分 ${school.difficulty}｜x=${round1(position.x)}｜${school.tags.join("、")}`;
    });

  const poolRows = currentState.pool
    .map((schoolId) => schoolById.get(schoolId))
    .filter(Boolean)
    .map((school) => `- ${school.shortName} - ${school.fullName}｜${school.city}｜模型分 ${school.difficulty}`);

  const csvRows = [["rank", "shortName", "fullName", "city", "tier", "difficulty", "x", "y", "tags"]];
  Object.entries(currentState.placed)
    .sort((a, b) => a[1].x - b[1].x || a[1].y - b[1].y)
    .forEach(([schoolId, position], index) => {
      const school = schoolById.get(schoolId);
      csvRows.push([
        index + 1,
        school.shortName,
        school.fullName,
        school.city,
        getPositionLevel(position.x).name,
        school.difficulty,
        round1(position.x),
        round1(position.y),
        school.tags.join("/"),
      ]);
    });

  const csvText = csvRows.map((row) => row.map(csvEscape).join(",")).join("\n");
  exportText.value = [
    "控制自动化考研院校难度精细排名",
    "说明：越靠前越难，模型仅作择校讨论参考，不代表官方排名。",
    "",
    rows.length ? rows.join("\n") : "暂无上榜学校",
    "",
    "待评价区",
    poolRows.length ? poolRows.join("\n") : "无",
    "",
    "CSV",
    csvText,
  ].join("\n");

  if (typeof exportDialog.showModal === "function") {
    exportDialog.showModal();
  } else {
    window.alert(exportText.value);
  }
}

async function copyExportText() {
  exportText.select();
  try {
    await navigator.clipboard.writeText(exportText.value);
    copyExportBtn.textContent = "已复制";
    setTimeout(() => (copyExportBtn.textContent = "复制结果"), 1000);
  } catch {
    document.execCommand("copy");
  }
}

function getDifficultyLevel(difficulty) {
  if (difficulty >= 92) return levels[0];
  if (difficulty >= 84) return levels[1];
  if (difficulty >= 75) return levels[2];
  if (difficulty >= 65) return levels[3];
  if (difficulty >= 55) return levels[4];
  return levels[5];
}

function getPositionLevel(xPercent) {
  const index = Math.min(levels.length - 1, Math.floor((clamp(xPercent, 0, 99.999) / 100) * levels.length));
  return levels[index];
}

function toggleLiveMode() {
  const enabled = document.body.classList.toggle("live-mode");
  liveBtn.textContent = enabled ? "退出直播模式" : "直播模式";
  requestAnimationFrame(repositionPlacedCards);
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen?.();
    fullscreenBtn.textContent = "退出全屏";
  } else {
    await document.exitFullscreen?.();
    fullscreenBtn.textContent = "全屏展示";
  }
}

function repositionPlacedCards() {
  rankSurface.querySelectorAll(".school-card").forEach((card) => {
    const position = currentState.placed[card.dataset.schoolId];
    if (position) placeCard(card, position.x, position.y);
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    updateRankSurfaceHeightForCurrentLayout();
    requestAnimationFrame(repositionPlacedCards);
  }, 80);
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

function unique(list) {
  return [...new Set(list)];
}

function csvEscape(value) {
  const stringValue = String(value ?? "");
  if (/[",\n]/.test(stringValue)) return `"${stringValue.replaceAll('"', '""')}"`;
  return stringValue;
}

function hexToRgba(hex, alpha) {
  const normalized = hex.replace("#", "");
  const bigint = Number.parseInt(normalized, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

// resize 已由 handleResize 统一处理。

document.addEventListener("fullscreenchange", () => {
  fullscreenBtn.textContent = document.fullscreenElement ? "退出全屏" : "全屏展示";
  requestAnimationFrame(repositionPlacedCards);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("live-mode")) {
    document.body.classList.remove("live-mode");
    liveBtn.textContent = "直播模式";
    requestAnimationFrame(repositionPlacedCards);
  }
});

try {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp, { once: true });
  } else {
    initApp();
  }
} catch (error) {
  console.error(error);
  saveStatus.textContent = "脚本启动失败";
  poolList.innerHTML = `<div class="startup-error">页面脚本没有正常启动：${error instanceof Error ? error.message : String(error)}</div>`;
}
