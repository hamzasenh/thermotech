// Aide à la mise en place de l'alerte Telegram (lib/quote/telegram.ts).
//
//   npm run telegram -- ids    liste les conversations qui ont écrit au bot récemment
//                              (à faire après avoir appuyé sur « Démarrer » dans le bot,
//                              ou après avoir ajouté le bot à un groupe et écrit dedans)
//   npm run telegram -- test   envoie un message de test à TELEGRAM_CHAT_ID
//
// Lit TELEGRAM_BOT_TOKEN et TELEGRAM_CHAT_ID dans .env.local.

const [command] = process.argv.slice(2);
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("TELEGRAM_BOT_TOKEN manque dans .env.local (jeton donné par @BotFather).");
  process.exit(1);
}

async function api(method, body) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  const data = await response.json();
  if (!data.ok) throw new Error(`${method} : ${data.description}`);
  return data.result;
}

if (command === "ids") {
  const me = await api("getMe");
  const updates = await api("getUpdates");
  const chats = new Map();
  for (const update of updates) {
    const chat = (update.message ?? update.my_chat_member ?? update.channel_post)?.chat;
    if (chat) chats.set(chat.id, chat.title ?? [chat.first_name, chat.last_name].filter(Boolean).join(" "));
  }
  console.log(`Bot : @${me.username}`);
  if (!chats.size) {
    console.log(`Aucune conversation. Ouvrez t.me/${me.username}, appuyez sur « Démarrer » et écrivez un message, puis relancez.`);
  } else {
    for (const [id, name] of chats) console.log(`${id}\t${name}`);
    console.log(`\nÀ mettre dans TELEGRAM_CHAT_ID (plusieurs : séparés par des virgules) : ${[...chats.keys()].join(",")}`);
  }
} else if (command === "test") {
  const ids = (process.env.TELEGRAM_CHAT_ID ?? "").split(",").map((id) => id.trim()).filter(Boolean);
  if (!ids.length) {
    console.error("TELEGRAM_CHAT_ID manque dans .env.local (voir « npm run telegram -- ids »).");
    process.exit(1);
  }
  for (const id of ids) {
    await api("sendMessage", {
      chat_id: id,
      text: "✅ <b>Alerte Radialec active</b>\nLes demandes de devis et de rappel du site arriveront ici.",
      parse_mode: "HTML",
    });
    console.log(`Message de test envoyé à ${id}.`);
  }
} else {
  console.log("Usage : npm run telegram -- ids | test");
}
