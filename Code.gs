const DIDI_ADMIN_PIN = PropertiesService.getScriptProperties()
  .getProperty('DIDI_ADMIN_PIN') || 'CHANGE_ME_BEFORE_DEPLOYMENT';

const DIDI_DEFAULTS = {
  siteTitle: "迪迪的世界 DIDI's World",
  heroTitle: "迪迪的世界",
  heroIntro: "一隻快樂小狗的日常故事。",
  aboutTitle: "認識迪迪",
  aboutText: "迪迪喜歡散步、零食和暖暖的午睡。",
  contactTitle: "想問迪迪的事嗎？",
  contactText: "有任何問題、想分享迪迪的可愛瞬間，歡迎直接聯絡我們。",
  email: "one2free88@gmail.com",
  whatsapp: "0955383721",
  heroImage: "https://placedog.net/720/720?id=17",
  aboutImage: "https://placedog.net/760/570?id=46",
  galleryImage1: "https://placedog.net/560/560?id=29",
  galleryImage2: "https://placedog.net/560/560?id=35",
  galleryImage3: "https://placedog.net/560/560?id=12"
};

function doGet(e) {
  const isAdmin = e && e.parameter.admin === '1';
  return HtmlService.createHtmlOutputFromFile(isAdmin ? 'admin' : 'index')
    .setTitle(isAdmin ? 'DIDI 網站管理' : DIDI_DEFAULTS.siteTitle)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

function verifyPin(pin) {
  if (pin !== DIDI_ADMIN_PIN) throw new Error('管理密碼不正確。');
}

function getSiteContent(pin) {
  verifyPin(pin);
  return Object.assign({}, DIDI_DEFAULTS, JSON.parse(
    PropertiesService.getScriptProperties().getProperty('DIDI_SITE_CONTENT') || '{}'
  ));
}

function getPublicSiteContent() {
  return Object.assign({}, DIDI_DEFAULTS, JSON.parse(
    PropertiesService.getScriptProperties().getProperty('DIDI_SITE_CONTENT') || '{}'
  ));
}

function saveSiteContent(content, pin) {
  verifyPin(pin);
  const clean = {};
  Object.keys(DIDI_DEFAULTS).forEach(function(key) {
    clean[key] = String(content[key] || '').trim();
  });
  PropertiesService.getScriptProperties().setProperty('DIDI_SITE_CONTENT', JSON.stringify(clean));
  return getPublicSiteContent();
}

function uploadSiteImage(data, pin) {
  verifyPin(pin);
  const file = DriveApp.createFile(Utilities.newBlob(
    Utilities.base64Decode(data.base64), data.mimeType, data.name
  ));
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w1600';
}
