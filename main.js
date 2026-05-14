const challenges = [
    { name: "#1. Simply Square", file: "challenges/challenge1.html" },
    { name: "#2. Carrom", file: "challenges/challenge2.html" },
    { name: "#3. Push Button", file: "challenges/challenge3.html" },
    { name: "#4. Ups n Downs", file: "challenges/challenge4.html" },
    { name: "#5. Acid Rain", file: "challenges/challenge5.html" },
    { name: "#6. Missing Slice", file: "challenges/challenge6.html" },
    { name: "#7. Leafy Trail", file: "challenges/challenge7.html" },
    { name: "#8. Forking Crazy", file: "challenges/challenge8.html" },
    { name: "#9. Tesseract", file: "challenges/challenge9.html" },
    { name: "#10. Cloaked Spirits", file: "challenges/challenge10.html" },
    { name: "#11. Eye of Sauron", file: "challenges/challenge11.html" },
    { name: "#12. Wiggly Moustache", file: "challenges/challenge12.html" },
    { name: "#13. Totally Triangle", file: "challenges/challenge13.html" },
    { name: "#14. Web Maker Logo", file: "challenges/challenge14.html" },
    { name: "#15. Overlap", file: "challenges/challenge15.html" },
    { name: "#16. Eye of the Tiger", file: "challenges/challenge16.html" },
    { name: "#17. Fidget Spinner", file: "challenges/challenge17.html" },
    { name: "#18. Matrix", file: "challenges/challenge18.html" },
    { name: "#19. Cube", file: "challenges/challenge19.html" },
    { name: "#20. Ticket", file: "challenges/challenge20.html" },
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