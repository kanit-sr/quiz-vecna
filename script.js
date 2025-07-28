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
        riddle: `รุ่งอรุณแห่งผู้พิทักษ์\n\nยามดาราดับแสง โลกร่ำไห้ในเงา\nมีผู้หนึ่งยืนตระหง่าน แสงนำทางให้เหล่าเรา\nแบกรับภาระที่หนักอึ้ง ปกป้องด้วยใจกล้า\nแต่ระวังเถิด ดวงประทีปนี้ อย่าให้มอดดับเพราะน้ำตา`
    },
    B: {
        riddle: `นัยน์ตาแห่งผู้รู้แจ้ง\n\nในห้วงลึกแห่งความลับ ที่มืดมิดและซ่อนงำ\nมีดวงตาคู่หนึ่งไม่เคยหลับ ค้นหาความจริงที่ถูกกระทำ\nปัญญาคืออาวุธคมกล้า ไขปริศนาแห่งกาลเวลา\nแต่ระวังเถิด พันธนาการไร้รูปร่าง อาจคุมขังเจ้าตลอดมา`
    },
    C: {
        riddle: `เปลวไฟแห่งผู้ปลดปล่อย\n\nโซ่ตรวนมิอาจผูกมัด จิตวิญญาณผู้ท้าทาย\nกฎเกณฑ์ที่ขัดขวาง คือสิ่งที่ต้องทำลาย\nลุกโชนดุจเปลวเพลิง ปลดปล่อยทุกการคุมขัง\nแต่ระวังเถิด ความร้อนแรงนี้ อาจเผาผลาญแม้แต่ความหวัง`
    },
    D: {
        riddle: `วิถีแห่งผู้ปรับสมดุล\n\nอดีต ปัจจุบัน อนาคต... สานสัมพันธ์เป็นหนึ่งเดียว\nเข้าใจในวัฏจักร กำเนิดและดับลงอย่างเชี่ยวชาญ\nมือนั้นนำพาการเปลี่ยนแปลง ฟื้นคืนสิ่งอันร่วงโรย\nแต่ระวังเถิด ความนิ่งเฉย อาจทำให้โอกาสลอยเลือนไปในโคลนตม`
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

// --- English Quiz Logic ---
const quizFormEn = document.getElementById('quizFormEn');
const resultsDivEn = document.getElementById('resultsEn');
const quizIntroDivEn = document.getElementById('quiz-intro-en');
const playerNameInputEn = document.getElementById('playerNameEn');
const displayPlayerNameEn = document.getElementById('displayPlayerNameEn');
const riddleResultEn = document.getElementById('riddleResultEn');
const resetButtonEn = document.getElementById('resetButtonEn');

const fatesEn = {
    A: {
        riddle: `The Champion's Dawn

When stars grow dim and the world weeps in shadow,
One stands unyielding, a beacon for all to follow.
A burden borne with valor, a shield against despair,
Yet heed this warning: Let not others' weight dim your own heart's flare.`
    },
    B: {
        riddle: `The Seeker's Gaze

In the deepest chasms of secrets, where darkness hides its art,
A watchful eye never sleeps, seeking truth that's torn apart.
Wisdom, your sharpest weapon, to unravel time's old plea,
Yet heed this warning: Let not knowledge bind you, leaving you unfree.`
    },
    C: {
        riddle: `The Rebel's Flame

No chains can shackle a spirit that defies,
The rules that bind will shatter beneath your cries.
You blaze like a wildfire, freeing all that's held in thrall,
Yet heed this warning: Let not your fierce passion consume all.`
    },
    D: {
        riddle: `The Equinox's Balance

Past, present, future... entwined in a single thread,
You grasp the cycles of life and paths where death has led.
Your hand guides transformation, restoring what's undone,
Yet heed this warning: Let not your stillness miss when action must be won.`
    }
};

if (quizFormEn) {
    quizFormEn.addEventListener('submit', function(event) {
        event.preventDefault();

        const playerName = playerNameInputEn.value.trim();
        if (!playerName) {
            showMessageBox("Please enter your character's name!", "Error");
            return;
        }

        const answers = {};
        for (let i = 1; i <= 6; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}en"]:checked`);
            if (!selectedOption) {
                showMessageBox("Please answer all questions before submitting!", "Error");
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

        const fate = fatesEn[dominantAnswer];
        displayPlayerNameEn.textContent = playerName;
        riddleResultEn.textContent = fate.riddle;

        // Save to localStorage
        localStorage.setItem('vecna_quiz_player_en', playerName);
        localStorage.setItem('vecna_quiz_answers_en', JSON.stringify(answers));
        localStorage.setItem('vecna_quiz_result_en', dominantAnswer);

        // Add effect to result
        riddleResultEn.classList.add('animate__animated', 'animate__fadeInUp');
        setTimeout(() => {
            riddleResultEn.classList.remove('animate__animated', 'animate__fadeInUp');
        }, 1200);

        quizFormEn.classList.add('hidden');
        quizIntroDivEn.classList.add('hidden');
        resultsDivEn.classList.remove('hidden');
    });

    // Restore previous result if exists
    window.addEventListener('DOMContentLoaded', function() {
        const savedPlayer = localStorage.getItem('vecna_quiz_player_en');
        const savedResult = localStorage.getItem('vecna_quiz_result_en');
        if (savedPlayer && savedResult && fatesEn[savedResult]) {
            displayPlayerNameEn.textContent = savedPlayer;
            riddleResultEn.textContent = fatesEn[savedResult].riddle;
            quizFormEn.classList.add('hidden');
            quizIntroDivEn.classList.add('hidden');
            resultsDivEn.classList.remove('hidden');
        }
    });

    resetButtonEn.addEventListener('click', function() {
        quizFormEn.reset();
        playerNameInputEn.value = '';
        resultsDivEn.classList.add('hidden');
        quizFormEn.classList.remove('hidden');
        quizIntroDivEn.classList.remove('hidden');
        window.scrollTo(0, 0);
        // Clear localStorage
        localStorage.removeItem('vecna_quiz_player_en');
        localStorage.removeItem('vecna_quiz_answers_en');
        localStorage.removeItem('vecna_quiz_result_en');
    });
}

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
