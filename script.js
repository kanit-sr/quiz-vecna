const quizForm = document.getElementById('quizForm');
const resultsDiv = document.getElementById('results');
const quizIntroDiv = document.getElementById('quiz-intro');
const playerNameInput = document.getElementById('playerName');
const displayPlayerName = document.getElementById('displayPlayerName');
const riddleResult = document.getElementById('riddleResult');
const resetButton = document.getElementById('resetButton');

// Destiny Key (DM’s secret scroll)
const fates = {
    A: {
        riddle: `พรหรือภัยของแชมป์เปี้ยน\n\nคุณคือผู้ปกป้อง ผู้ยืนหยัดต่อสู้เพื่อผู้อื่น แม้ในยามมืดมนที่สุด คุณยังคงเป็นแสงสว่างให้แก่ผู้คนรอบข้าง โชคชะตาของคุณคือการเสียสละและความกล้าหาญ—แต่จงระวัง อย่าให้ภาระของผู้อื่นบดบังหัวใจของตนเอง`
    },
    B: {
        riddle: `ม่านแห่งปราชญ์\n\nคุณเป็นผู้แสวงหาความจริงและความลับ แม้ต้องเผชิญกับความมืดหรือความหวาดกลัว คุณจะไม่หยุดค้นหา โชคชะตาของคุณคือปัญญาและการเปิดเผย—แต่จงระวัง อย่าให้ความลับกลายเป็นพันธนาการ`
    },
    C: {
        riddle: `โซ่ของกบฏ\n\nคุณคือผู้ท้าทายโชคชะตา ไม่ยอมจำนนต่ออำนาจหรือพันธนาการใด ๆ คุณจะต่อสู้เพื่ออิสรภาพของตนเองและผู้อื่น โชคชะตาของคุณคือการเปลี่ยนแปลงและการปลดปล่อย—แต่จงระวัง อย่าให้ไฟแห่งการต่อต้านเผาผลาญทุกสิ่งที่คุณรัก`
    },
    D: {
        riddle: `สมดุลแห่งวิษุวัต\n\nคุณคือผู้เชื่อมโยงอดีต ปัจจุบัน และอนาคต คุณเข้าใจถึงวัฏจักรของชีวิตและความตาย โชคชะตาของคุณคือการฟื้นฟูและการเปลี่ยนผ่าน—แต่จงระวัง อย่าให้ความเฉยชาทำให้คุณพลาดช่วงเวลาแห่งการลงมือ`
    }
};

quizForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const playerName = playerNameInput.value.trim();
    if (!playerName) {
        showMessageBox("โปรดระบุชื่อตัวละครของท่านก่อน!", "ข้อผิดพลาด");
        return;
    }

    const answers = {};
    for (let i = 1; i <= 6; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selectedOption) {
            showMessageBox("โปรดตอบคำถามทุกข้อก่อนส่ง!", "ข้อผิดพลาด");
            return;
        }
        answers[`q${i}`] = selectedOption.value;
    }

    const tally = { A: 0, B: 0, C: 0, D: 0 };
    for (const q in answers) {
        tally[answers[q]]++;
    }

    let dominantAnswer = '';
    let maxCount = -1;
    let tiedAnswers = [];

    for (const choice in tally) {
        if (tally[choice] > maxCount) {
            maxCount = tally[choice];
            dominantAnswer = choice;
            tiedAnswers = [choice];
        } else if (tally[choice] === maxCount) {
            tiedAnswers.push(choice);
        }
    }

    if (tiedAnswers.length > 1) {
        dominantAnswer = tiedAnswers[0];
    }

    const fate = fates[dominantAnswer];
    displayPlayerName.textContent = playerName;
    riddleResult.textContent = fate.riddle;

    // Save to localStorage
    localStorage.setItem('vecna_quiz_player', playerName);
    localStorage.setItem('vecna_quiz_answers', JSON.stringify(answers));
    localStorage.setItem('vecna_quiz_result', dominantAnswer);

    // Add effect to result
    riddleResult.classList.add('animate__animated', 'animate__fadeInUp');
    setTimeout(() => {
        riddleResult.classList.remove('animate__animated', 'animate__fadeInUp');
    }, 1200);

    quizForm.classList.add('hidden');
    quizIntroDiv.classList.add('hidden');
    resultsDiv.classList.remove('hidden');
});

// Restore previous result if exists
window.addEventListener('DOMContentLoaded', function() {
    const savedPlayer = localStorage.getItem('vecna_quiz_player');
    const savedResult = localStorage.getItem('vecna_quiz_result');
    if (savedPlayer && savedResult && fates[savedResult]) {
        displayPlayerName.textContent = savedPlayer;
        riddleResult.textContent = fates[savedResult].riddle;
        quizForm.classList.add('hidden');
        quizIntroDiv.classList.add('hidden');
        resultsDiv.classList.remove('hidden');
    }
});

resetButton.addEventListener('click', function() {
    quizForm.reset();
    playerNameInput.value = '';
    resultsDiv.classList.add('hidden');
    quizForm.classList.remove('hidden');
    quizIntroDiv.classList.remove('hidden');
    window.scrollTo(0, 0);
    // Clear localStorage
    localStorage.removeItem('vecna_quiz_player');
    localStorage.removeItem('vecna_quiz_answers');
    localStorage.removeItem('vecna_quiz_result');
});

// Custom Message Box Functionality
function showMessageBox(message, title = "แจ้งเตือน") {
    const messageBoxHtml = `
        <div id="customMessageBox" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div class="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-sm w-full text-center border border-gray-700">
                <h3 class="text-xl font-bold text-blue-300 mb-4">${title}</h3>
                <p class="text-gray-200 mb-6">${message}</p>
                <button id="messageBoxClose" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
                    ตกลง
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', messageBoxHtml);

    document.getElementById('messageBoxClose').addEventListener('click', function() {
        document.getElementById('customMessageBox').remove();
    });
}