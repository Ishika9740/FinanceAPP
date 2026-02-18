// 1. The Game State (Your Variables)
let state = {
    money: 200,
    happiness: 100,
    day: 1
};

// 2. The Scenarios (The Content)
const scenarios = [
    {
        id: 1,
        text: "Oh no! You dropped your phone and the screen cracked. What do you do?",
        options: [
            { text: "Fix it ($80)", cost: 80, happiness: 5, feedback: "Your wallet hurts, but your phone is shiny again." },
            { text: "Ignore it ($0)", cost: 0, happiness: -10, feedback: "It's hard to read texts, and you feel kinda broke." }
        ]
    },
    {
        id: 2,
        text: "Your friends are going to a concert. Ticket is $45.",
        options: [
            { text: "Go with them ($45)", cost: 45, happiness: 15, feedback: "Best night ever! Memories > Money." },
            { text: "Stay home ($0)", cost: 0, happiness: -5, feedback: "You saved money, but FOMO is real." }
        ]
    },
    {
        id: 3,
        text: "You're hungry. Doordash or cook ramen?",
        options: [
            { text: "Order Doordash ($25)", cost: 25, happiness: 8, feedback: "Yum. Spicy tuna roll." },
            { text: "Cook Ramen ($1)", cost: 1, happiness: -2, feedback: "It's boring, but your bank account is happy." }
        ]
    }
];

let currentScenarioIndex = 0;

// 3. The Functions (The Action)
function updateDisplay() {
    // Update the numbers on the screen
    document.getElementById('money-display').innerText = state.money;
    document.getElementById('happiness-display').innerText = state.happiness;
    document.getElementById('day-display').innerText = state.day;
}

function renderScenario() {
    // Get the current scenario data
    const scenario = scenarios[currentScenarioIndex];

    // Check if we ran out of scenarios (Game Over / Win)
    if (!scenario) {
        document.getElementById('scenario-text').innerText = "Game Over! You survived the week.";
        document.querySelector('.button-grid').innerHTML = "<button onclick='location.reload()'>Play Again</button>";
        document.getElementById('feedback-text').innerText = `Final Score: $${state.money} | ❤️ ${state.happiness}`;
        document.getElementById('feedback-text').classList.remove('hidden');
        return;
    }

    // Update the text and buttons
    document.getElementById('scenario-text').innerText = scenario.text;
    document.getElementById('feedback-text').classList.add('hidden'); // Hide old feedback

    // Create the buttons dynamically
    const buttonsHTML = `
        <button class="choice-btn" onclick="handleChoice(0)">${scenario.options[0].text}</button>
        <button class="choice-btn" onclick="handleChoice(1)">${scenario.options[1].text}</button>
    `;
    document.querySelector('.button-grid').innerHTML = buttonsHTML;
}

function handleChoice(optionIndex) {
    const scenario = scenarios[currentScenarioIndex];
    const choice = scenario.options[optionIndex];

    // 1. Update State
    state.money -= choice.cost;
    // CHECK FOR UPGRADES
    // If money is greater than $250, show the desk
    if (state.money >= 250) {
        document.getElementById('item-desk').classList.remove('hidden');
    } else {
        // Optional: Hide it if they go broke again
        document.getElementById('item-desk').classList.add('hidden');
    }
    state.happiness += choice.happiness;
    state.day += 1;

    // 2. Show Feedback
    const feedbackEl = document.getElementById('feedback-text');
    feedbackEl.innerText = choice.feedback;
    feedbackEl.classList.remove('hidden');

    // 3. Wait 1 second, then go to next level
    currentScenarioIndex++;
    updateDisplay();
    
    // Slight delay so they can read the feedback
    setTimeout(() => {
        renderScenario();
    }, 1500); 
}

// 4. Start the Game
updateDisplay();
renderScenario();