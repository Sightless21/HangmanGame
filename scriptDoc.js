// อ้างอิงองค์ประกอบจาก DOM ที่จะใช้ในเกม
const wordElement = document.getElementById("word"); // แสดงคำที่ผู้เล่นต้องทาย
const wrongLettersElement = document.getElementById("wrong-letters"); // แสดงตัวอักษรที่ผู้เล่นทายผิด
const playAgainButton = document.getElementById("play-button"); // ปุ่มเล่นเกมใหม่
const popup = document.getElementById("popup-container"); // Popup ที่แสดงเมื่อเกมจบ
const notification = document.getElementById("notification-container"); // ข้อความแจ้งเตือนเมื่อทายตัวอักษรซ้ำ
const finalMessage = document.getElementById("final-message"); // ข้อความสุดท้ายเมื่อเกมจบ (ชนะหรือแพ้)
const finalMessageRevealWord = document.getElementById("final-message-reveal-word"); // เผยคำที่ถูกต้องเมื่อเกมจบ
const figureParts = document.querySelectorAll(".figure-part"); // ส่วนต่างๆ ของโครงกระดูกในเกม Hangman


// คำศัพท์ที่ใช้ในเกม
const words = [
  "application", "programming", "interface", "wizard", "element",
  "prototype", "callback", "undefined", "arguments", "settings",
  "selector", "container", "instance", "response", "console",
  "constructor", "token", "function", "return", "length", "type", "node"
];

// คำศัพท์ที่ถูกเลือกแบบสุ่มจากลิสต์ด้านบน
let selectedWord = words[Math.floor(Math.random() * words.length)];

// กำหนดสถานะของเกมว่าเล่นได้หรือไม่
let playable = true;

// ลิสต์สำหรับเก็บตัวอักษรที่ผู้เล่นทายถูกและทายผิด
const correctLetters = [];
const wrongLetters = [];

/**
 * แสดงคำที่ต้องทายบนหน้าจอ
 * ตัวอักษรที่ผู้เล่นทายถูกจะถูกแสดงในตำแหน่งที่ถูกต้อง
 * หากผู้เล่นทายคำถูกทั้งหมดจะแสดงข้อความชนะ
 */
function displayWord() {
  wordElement.innerHTML = `${selectedWord.split("") // แยกคำออกเป็นตัวอักษรในรูปแบบของ array
    .map((letter) => `<span class="letter"> ${correctLetters.includes(letter) ? letter : ""} </span>`).join("")}`; // รวมตัวอักษรเป็นสตริงและแสดงใน HTML

  const innerWord = wordElement.innerText.replace(/\n/g, ""); // ลบช่องว่างออกจากคำ
  if (innerWord === selectedWord) { // ถ้าคำที่แสดงตรงกับคำที่เลือก
    finalMessage.innerText = "Congratulations! You won! 😃"; // แสดงข้อความชนะ
    finalMessageRevealWord.innerText = ""; // ไม่แสดงข้อความเพิ่มเติม
    popup.style.display = "flex"; // แสดง popup
    playable = false; // เกมจบ
  }
}

/**
 * อัปเดตตัวอักษรที่ทายผิดและแสดงบนหน้าจอ
 * หากทายผิดทั้งหมดที่กำหนด จะแสดงข้อความแพ้
 */
function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  
  // แสดงส่วนของโครงกระดูกตามจำนวนครั้งที่ทายผิด
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    index < errors
      ? (part.style.display = "block") // แสดงส่วนของโครงกระดูก
      : (part.style.display = "none"); // ซ่อนส่วนของโครงกระดูกที่ยังไม่ต้องแสดง
  });

  // ถ้าทายผิดทั้งหมด แสดงข้อความแพ้และคำที่ถูกต้อง
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕"; // ข้อความแพ้
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`; // แสดงคำที่ถูกต้อง
    popup.style.display = "flex"; // แสดง popup
    playable = false; // เกมจบ
  }
}

/**
 * แสดงข้อความแจ้งเตือนเมื่อผู้เล่นพยายามทายตัวอักษรซ้ำ
 */
function showNotification() {
  notification.classList.add("show"); // เพิ่มคลาส "show" เพื่อแสดง notification
  setTimeout(() => {
    notification.classList.remove("show"); // ลบคลาส "show" หลังจาก 2 วินาที
  }, 2000);
}

/**
 * ฟังก์ชันนี้จะรับการกดแป้นพิมพ์จากผู้เล่นและประมวลผลตัวอักษร
 * ตรวจสอบว่าตัวอักษรที่ทายมีอยู่ในคำศัพท์หรือไม่
 * แสดงข้อความหรืออัปเดตหน้าจอตามความถูกต้องของการทาย
 */
window.addEventListener("keypress", (e) => {
  if (playable) { // ตรวจสอบว่าเกมยังไม่จบ
    const letter = e.key.toLowerCase(); // แปลงตัวอักษรเป็นพิมพ์เล็ก
    if (letter >= "a" && letter <= "z") { // ตรวจสอบว่าตัวอักษรอยู่ในช่วง a-z
      if (selectedWord.includes(letter)) { // ถ้าคำที่เลือกมีตัวอักษรนั้นอยู่
        if (!correctLetters.includes(letter)) { // ถ้ายังไม่ทายตัวอักษรนี้
          correctLetters.push(letter); // เพิ่มตัวอักษรในลิสต์ตัวอักษรถูกต้อง
          displayWord(); // แสดงคำใหม่
        } else {
          showNotification(); // ถ้าทายตัวอักษรซ้ำ แสดงข้อความแจ้งเตือน
        }
      } else {
        if (!wrongLetters.includes(letter)) { // ถ้ายังไม่ทายตัวอักษรนี้
          wrongLetters.push(letter); // เพิ่มตัวอักษรในลิสต์ตัวอักษรผิด
          updateWrongLettersElement(); // อัปเดตตัวอักษรผิดและแสดงบนหน้าจอ
        } else {
          showNotification(); // ถ้าทายตัวอักษรซ้ำ แสดงข้อความแจ้งเตือน
        }
      }
    }
  }
});

/**
 * ฟังก์ชันนี้จะรีเซ็ตเกมเมื่อผู้เล่นกดปุ่ม "Play Again"
 * เริ่มเกมใหม่ด้วยคำศัพท์ใหม่และรีเซ็ตสถานะต่างๆ ของเกม
 */
playAgainButton.addEventListener("click", () => {
  playable = true; // ตั้งค่าให้เกมเล่นได้อีกครั้ง
  correctLetters.splice(0); // ล้างลิสต์ตัวอักษรถูกต้อง
  wrongLetters.splice(0); // ล้างลิสต์ตัวอักษรผิด
  selectedWord = words[Math.floor(Math.random() * words.length)]; // เลือกคำใหม่แบบสุ่ม
  displayWord(); // แสดงคำใหม่
  updateWrongLettersElement(); // รีเซ็ตการแสดงผลของตัวอักษรผิด
  popup.style.display = "none"; // ซ่อน popup
});

// เริ่มเกมครั้งแรกโดยแสดงคำแรกให้ผู้เล่นทาย
displayWord();
