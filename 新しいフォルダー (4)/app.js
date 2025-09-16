// GAS WebAppのURL（後で差し替え）
const GAS_URL = "https://script.google.com/a/macros/ict.shimanet.ed.jp/s/AKfycbwrQAwnkoQ2jBV_r27UhLJacFjeHlkrhjv30bUSAmFkxhTsQK2Oo1mLONnNvhM4lzAq/exec";

// LIFF初期化
window.onload = function() {
  liff.init({ liffId: "2008012163-poQVL3Bk" })
    .then(() => {
      console.log("LIFF init success");
    })
    .catch(err => console.error("LIFF init error:", err));
};

// フォーム送信
document.getElementById("reservationForm").addEventListener("submit", e => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value
  };

  fetch(GAS_URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => {
    document.getElementById("message").innerText = "予約完了しました！";
    // LINEでメッセージ送信
    if (liff.isInClient()) {
      liff.sendMessages([{
        type: "text",
        text: `面会予約を受け付けました\n氏名: ${data.name}\n日時: ${data.date} ${data.time}`
      }]);
    }
  })
  .catch(err => {
    console.error(err);
    document.getElementById("message").innerText = "エラーが発生しました";
  });
});
