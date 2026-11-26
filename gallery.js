const galleryPhotos = [
  { image:"images/Bone Straight.jpg", name:"Bone Straight", texture:"straight", color:"black", type:"bundles" },
  { image:"images/Brown Bone Straight Hair.jpg", name:"Brown Bone Straight", texture:"straight", color:"brown", type:"bundles" },
  { image:"images/Loose Deep Wave Human Hair Bundles and Closure Loose Wave Bundles With Lace Closure Big.jpg", name:"Loose Deep Wave", texture:"wavy", color:"black", type:"bundles" },
  { image:"images/bounce.jpg", name:"Bounce Wave", texture:"wavy", color:"black", type:"bundles" },
  { image:"images/bounce 2.png", name:"Soft Bounce Wave", texture:"wavy", color:"brown", type:"bundles" },
  { image:"images/pixie curl.jpg", name:"Pixie Curl", texture:"curly", color:"black", type:"bundles" },
  { image:"images/XCCOCO Hair Ombre Honey Blonde Straight Weave Dark….jpg", name:"Honey Blonde Ombre", texture:"straight", color:"blonde", type:"bundles" },
  { image:"images/Bundle up in color, babe!_BNB’s colored bundles….jpg", name:"Colour Pop Bundles", texture:"wavy", color:"brown", type:"bundles" },
  { image:"images/Klaiyi Bone Straight Virgin Hair 3 Bundles with 4x4 Transparent Lace Closure Pre Plucked - 22 22 24+18 _ Free Part.jpg", name:"Straight with Lace Closure", texture:"straight", color:"black", type:"bundles" },
  { image:"images/11A top Quality thick hair bundles.jpg", name:"Full Volume Bundles", texture:"curly", color:"black", type:"bundles" },
  { image:"images/10 bone.jpg", name:"Sleek Bone Straight", texture:"straight", color:"black", type:"bundles" },
  { image:"images/1.jpeg", name:"Signature Hair Look", texture:"wavy", color:"black", type:"bundles" },
  { image:"images/2.jpeg", name:"Soft Wave Look", texture:"wavy", color:"brown", type:"bundles" },
  { image:"images/3.jpeg", name:"Glossy Lengths", texture:"straight", color:"black", type:"bundles" },
  { image:"images/4.jpeg", name:"Defined Curl Look", texture:"curly", color:"black", type:"bundles" },
  { image:"images/5.jpeg", name:"Everyday Glam", texture:"wavy", color:"black", type:"bundles" },
  { image:"images/6.jpeg", name:"Rich Brown Finish", texture:"straight", color:"brown", type:"bundles" },
  { image:"images/7.jpeg", name:"Long and Luscious", texture:"wavy", color:"black", type:"bundles" },
  { image:"images/8.jpeg", name:"Natural Texture", texture:"curly", color:"black", type:"bundles" },
  { image:"images/9.jpeg", name:"Golden Hour Blonde", texture:"straight", color:"blonde", type:"bundles" },
  { image:"images/10.jpeg", name:"Smooth and Sleek", texture:"straight", color:"black", type:"bundles" },
  { image:"images/11.jpeg", name:"The Full Look", texture:"wavy", color:"brown", type:"bundles" },
];
const grid = document.querySelector("#gallery-grid");
let activeTexture = "all", activeColor = "all";
function renderGallery() {
  grid.innerHTML = galleryPhotos.map((photo, index) => `<button class="gallery-card" data-index="${index}" data-texture="${photo.texture}" data-color="${photo.color}" aria-label="View ${photo.name} photo"><img src="${photo.image}" alt="${photo.name} human hair" loading="lazy"><span class="gallery-card-copy"><small>${photo.texture.toUpperCase()} HAIR</small><b>${photo.name.toUpperCase()}</b><span>${photo.color === "black" ? "Natural black" : photo.color[0].toUpperCase()+photo.color.slice(1)}</span></span><img class="gallery-card-brand" src="images/logo.png" alt="Supreme HairKing"></button>`).join("");
  applyFilters();
}
function applyFilters() {
  const cards = [...grid.querySelectorAll(".gallery-card")];
  let count = 0;
  cards.forEach(card => { const shown = (activeTexture === "all" || activeTexture === "bundles" || card.dataset.texture === activeTexture) && (activeColor === "all" || card.dataset.color === activeColor); card.hidden = !shown; if (shown) count++; });
  document.querySelector("#photo-count").textContent = count;
}
document.querySelector(".gallery-filters").addEventListener("click", event => {
  const button = event.target.closest(".filter-chip"); if (!button) return;
  const group = button.dataset.filter; document.querySelectorAll(`[data-filter="${group}"]`).forEach(item => item.classList.toggle("active", item === button));
  if (group === "texture") activeTexture = button.dataset.value; else activeColor = button.dataset.value;
  applyFilters();
});
const lightbox = document.querySelector(".gallery-lightbox");
grid.addEventListener("click", event => { const card = event.target.closest(".gallery-card"); if (!card) return; const photo = galleryPhotos[Number(card.dataset.index)]; lightbox.querySelector("img").src = photo.image; lightbox.querySelector("img").alt = `${photo.name} human hair`; lightbox.querySelector("p").textContent = photo.name; lightbox.showModal(); });
lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", event => { if (event.target === lightbox) lightbox.close(); });
document.querySelector(".newsletter-form").addEventListener("submit", event => { event.preventDefault(); const toast = document.querySelector(".toast"); toast.textContent = "Thanks for joining the Supreme HairKing list!"; toast.classList.add("show"); event.currentTarget.reset(); setTimeout(() => toast.classList.remove("show"), 2200); });
document.querySelector(".footer-close").addEventListener("click", () => document.querySelector(".newsletter").remove());
renderGallery();
