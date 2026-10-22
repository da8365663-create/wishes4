const reasons = [
  'Your smile makes my world brighter.',
  'The way your eyes speak when words fail.',
  'Your voice feels like home.',
  'You understand my silence.',
  'You make even the ordinary feel special.',
  'The warmth of your hug is my safe place.',
  'Your laughter is my favorite melody.',
  'You never judge me, even at my worst.',
  'You complete my incomplete thoughts.',
  'You love me in ways I never knew I needed.',
  'Your presence turns my bad days good.',
  'The way you hold my hand makes me feel secure.',
  'You remember the little things about me.',
  'You know my fears yet never make me feel weak.',
  'Your love feels effortless, yet so deep.',
  'The way you listen, even when I ramble.',
  'Your heart is as beautiful as your face.',
  'You bring out the best in me.',
  "Your patience with me, even when I’m difficult.",
  'The way you wipe away my tears.',
  'You never let me feel alone.',
  'Your love makes me believe in forever.',
  'You make me feel important without trying.',
  'Your kindness makes the world better.',
  'The way you say my name sounds different.',
  'You are my peace in this chaotic world.',
  'The way you trust me without conditions.',
  'You see beauty in my flaws.',
  'You remind me to love myself too.',
  'The way you laugh at my stupid jokes.',
  'You bring meaning to my existence.',
  'You make love feel like poetry.',
  'The way you support my dreams.',
  'Your heartbeat is my favorite sound.',
  'You make me believe in magic.',
  'The way you look at me with love.',
  "You love me even when I’m unlovable.",
  'The way you remember our special moments.',
  'You feel like my missing piece.',
  'Your touch calms my storms.',
  'You never give up on me.',
  'You make the nights feel less lonely.',
  'You inspire me to be a better person.',
  'Your love is my greatest strength.',
  "You don’t need words to make me feel loved.",
  'You make my dreams sweeter.',
  'Every song reminds me of you.',
  'Your love is my safe haven.',
  'You make even silence feel comforting.',
  'You never let me fight my battles alone.',
  'Your presence is the best gift.',
  'You never let me feel invisible.',
  'You bring color to my dull days.',
  'Your love is my greatest adventure.',
  'You know my unspoken words.',
  'You love me, not just my happiness.',
  'You never make me feel less.',
  'Your love makes life worth it.',
  'You make distance feel smaller.',
  'Your love is louder than any fear.',
  'You are my constant in an uncertain world.',
  "You believe in me when I don’t.",
  'Your love makes my heart race.',
  'You make pain feel temporary.',
  'You hold my heart gently.',
  'You see my scars and love me more.',
  'Your love is a forever kind of thing.',
  'You love me on my worst days.',
  'The way you fit perfectly in my arms.',
  'You never make love feel heavy.',
  'You turn ordinary moments into magic.',
  'You make even the stars jealous.',
  'You bring warmth to my cold heart.',
  'Your love feels like a soft whisper.',
  'You are my reason to believe in love.',
  'The way your love never fades.',
  'You are my always and forever.',
  'Your love is my favorite feeling.',
  'The way your presence feels like home.',
  'You make even my demons quiet.',
  'Your love is my favorite memory.',
  'The way you make every goodbye hard.',
  'You make life a little more beautiful.',
  'You bring hope to my darkest days.',
  'Your love is my greatest treasure.',
  'The way you make me feel alive.',
  'You make forever feel too short.',
  'Your love is my sweetest addiction.',
  'You never let me feel replaceable.',
  'You make every heartbeat count.',
  'Your love is my strongest prayer.',
  'You make me believe in soulmates.',
  'The way you make me crave more of you.',
  "You are my heart’s favorite place.",
  'You make love feel effortless.',
  'You never let go, even when I push away.',
  'Your love is my quiet miracle.',
  'You make every second with you precious.',
  'You are the love story I always wanted.',
  'I love you because you are you.'
];
const photos = [
  ["photo1.jpg","Lost in my thoughts of you"],
  ["photo2.jpg","That look, every time"],
  ["photo3.jpg","Butterflies and cherries"],
  ["photo5.jpg","Pure mischief, pure you"],
  ["photo4.jpg","Roses for my rose"],
  ["photo6.jpg","Details I adore"],
  ["photo7.jpg","My favorite kind of quiet"],
  ["photo9.jpg","Soft light, softer heart"],
  ["photo8.jpg","Always my favorite"]
];
const $ = s => document.querySelector(s);
/* flat layout: photos sit next to index.html (assets/photos/ is the fallback) */
function withFallback(img, file){
  img.addEventListener("error", () => {
    if (!img.dataset.fb) { img.dataset.fb = "1"; img.src = "assets/photos/" + file; }
  });
  img.src = file;
}

/* gallery + lightbox */
const grid = $("#photo-grid"), lb = $("#lightbox");
let current = 0;
photos.forEach(([file, cap], i) => {
  const fig = document.createElement("figure");
  fig.className = "photo"; fig.tabIndex = 0;
  fig.innerHTML = `<img alt="${cap}" loading="lazy"><figcaption>${cap}</figcaption>`;
  withFallback(fig.querySelector("img"), file);
  fig.addEventListener("click", () => openPhoto(i));
  fig.addEventListener("keydown", e => { if (e.key === "Enter") openPhoto(i); });
  grid.append(fig);
});
function showPhoto(i){
  current = (i + photos.length) % photos.length;
  const li = $("#lb-img"); delete li.dataset.fb;
  if (!li.dataset.bound) { li.dataset.bound = "1"; withFallback(li, photos[current][0]); }
  else li.src = photos[current][0];
  $("#lb-img").alt = photos[current][1];
  $("#lb-cap").textContent = photos[current][1];
}
function openPhoto(i){ showPhoto(i); lb.showModal(); }
$(".lb-close").onclick = () => lb.close();
$(".prev").onclick = () => showPhoto(current - 1);
$(".next").onclick = () => showPhoto(current + 1);
lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
lb.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") showPhoto(current - 1);
  if (e.key === "ArrowRight") showPhoto(current + 1);
});

/* reasons */
const list = $("#reason-list"), more = $("#more");
reasons.forEach((r, i) => {
  const li = document.createElement("li");
  if (i >= 12) li.hidden = true;
  li.innerHTML = `<span class="n">${i + 1}</span><p></p>`;
  li.querySelector("p").textContent = r;
  list.append(li);
});
more.onclick = () => {
  const open = more.dataset.open !== "1";
  [...list.children].forEach((li, i) => { if (i >= 12) li.hidden = !open; });
  more.dataset.open = open ? "1" : "0";
  more.textContent = open ? "Show fewer" : "Show all 100";
};
let last = -1;
$("#pick-btn").onclick = () => {
  let n; do { n = Math.floor(Math.random() * reasons.length); } while (n === last);
  last = n;
  const t = $("#pick-text"); t.style.opacity = 0;
  setTimeout(() => { t.textContent = reasons[n]; t.style.opacity = 1; burstHearts(6); }, 250);
  $("#pick-btn").textContent = "Tell me another";
};

/* lock */
const lock = $("#lock"), site = $("#love-site"), password = $("#password");
function unlock(){
  if (password.value === "1613") {
    lock.hidden = true; site.hidden = false; window.scrollTo(0, 0); burstHearts(18);
  } else {
    $("#error").textContent = "That’s not our secret. Try again, love.";
    password.value = ""; password.focus();
  }
}
$("#unlock").onclick = unlock;
password.addEventListener("keydown", e => { if (e.key === "Enter") unlock(); });

/* music */
const song = $("#song"), btn = $("#music-toggle");
btn.onclick = async () => {
  if (song.paused) {
    try { await song.play(); btn.textContent = "♫ Pause our song"; }
    catch (e) { btn.textContent = "Add assets/our-song.m4a ♫"; }
  } else { song.pause(); btn.textContent = "♫ Play our song"; }
};

/* surprise + hearts */
$("#surprise").onclick = () => { $("#surprise-text").hidden = false; burstHearts(26); };
function burstHearts(count){
  const host = $(".hearts");
  for (let i = 0; i < count; i++) {
    const h = document.createElement("span");
    h.className = "heart-particle";
    h.textContent = ["♥","♡","✧"][Math.floor(Math.random() * 3)];
    h.style.left = Math.random() * 100 + "%";
    h.style.fontSize = (14 + Math.random() * 18) + "px";
    h.style.animationDuration = (4 + Math.random() * 5) + "s";
    host.append(h); setTimeout(() => h.remove(), 9500);
  }
}
setInterval(() => { if (!lock.hidden && Math.random() > .5) burstHearts(1); }, 1800);
