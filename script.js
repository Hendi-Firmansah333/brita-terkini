const todayDate = document.querySelector("#todayDate");
const year = document.querySelector("#year");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const newsCards = [...document.querySelectorAll(".news-card")];
const emptyState = document.querySelector("#emptyState");
const menuToggle = document.querySelector("#menuToggle");
const mobileNav = document.querySelector("#mobileNav");
const newsletterForm = document.querySelector("#newsletterForm");
const formMessage = document.querySelector("#formMessage");

const now = new Date();
todayDate.textContent = new Intl.DateTimeFormat("id-ID", {
  weekday: "long", day: "numeric", month: "long", year: "numeric"
}).format(now);
year.textContent = now.getFullYear();

function filterNews() {
  const keyword = searchInput.value.trim().toLocaleLowerCase("id-ID");
  const category = categoryFilter.value;
  let visibleCount = 0;

  newsCards.forEach((card) => {
    const text = `${card.dataset.search} ${card.textContent}`.toLocaleLowerCase("id-ID");
    const matchesKeyword = text.includes(keyword);
    const matchesCategory = category === "Semua" || card.dataset.category === category;
    const visible = matchesKeyword && matchesCategory;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

searchInput.addEventListener("input", filterNews);
categoryFilter.addEventListener("change", filterNews);

menuToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    menuToggle.textContent = "☰";
  });
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#emailInput").value.trim();
  if (!email) return;
  formMessage.textContent = `Terima kasih! Form demo menerima alamat ${email}. Data belum dikirim ke server.`;
  formMessage.style.color = "#52772a";
  newsletterForm.reset();
});
