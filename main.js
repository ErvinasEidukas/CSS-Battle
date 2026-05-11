const challenges = [
    { name: "#1. Simply Square", file: "challenges/challenge1.html" },
    { name: "#2. Carrom", file: "challenges/challenge2.html" },
    { name: "#3. Push Button", file: "challenges/challenge3.html" },
    { name: "#4. Ups n Downs", file: "challenges/challenge4.html" },
    { name: "#5. Acid Rain", file: "challenges/challenge5.html" },
    { name: "#6. Missing Slice", file: "challenges/challenge6.html" },
    { name: "#7. Leafy Trail", file: "challenges/challenge7.html" },
    { name: "#8. Forking Crazy", file: "challenges/challenge8.html" },
];

function wrapCode(code) {
    return `
        <div class="stage">
            ${code}
        </div>
        <style>
            html, body {
                margin: 0;
                width: 400px;
                height: 300px;
                background: white;
                overflow: hidden;
            }

            .stage {
                width: 400px;
                height: 300px;
                transform-origin: top left;
            }
        </style>
    `;
}

function createCard(item) {
    const card = document.createElement("div")
    card.className = "card"

    const title = document.createElement("div")
    title.className = "title"
    title.innerText = item.name

    const iframe = document.createElement("iframe")
    iframe.className = "frame"

    fetch(item.file)
        .then(res => res.text())
        .then(code => {
            iframe.srcdoc = wrapCode(code)
        })

    iframe.onload = () => {
        const doc = iframe.contentDocument
        const stage = doc.querySelector(".stage")

        const scaleX = iframe.clientWidth / 400
        const scaleY = iframe.clientHeight / 300
        const scale = Math.min(scaleX, scaleY)

        stage.style.transform = `scale(${scale})`
    }

    card.appendChild(title)
    card.appendChild(iframe)

    return card
}

function renderGrid() {
    const grid = document.getElementById("grid")

    challenges.forEach(c => {
    grid.appendChild(createCard(c))
    })
}

renderGrid()