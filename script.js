document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector("#grid");
    const defaultGridSize = 4;
    const defaultGridColor = "white";
    const defaultCanvasColor = "black";
    const gridSizeValues = document.querySelector("#gridSizeText");
    const rangeSlider = document.querySelector("#range-slider");
    const clearBtn = document.querySelector("#clear-btn");
    const blackBtn = document.querySelector("#black-btn")
    const colorPicker = document.querySelector("#colorPicker");
    const rainbowBtn = document.querySelector("#rainbow-btn");
    const eraserBtn = document.querySelector("#eraser-btn");
    const gridLinesToggle = document.querySelector("#gridLinesToggle");
    const header = document.querySelector("header")
    const gridColorPicker = document.querySelector("#gridColorPicker");
    const hamburgerClick = document.querySelector("#hamburger-btn");
    
    let clicked = false;

   
    hamburgerClick.addEventListener('click', function() {
        this.classList.toggle('toggle');
        clicked = !clicked;
        if(clicked){
            header.style.display = "block";
        }
        else{
            header.style.display = "none";
        }
        
    });

    header.addEventListener("mouseover", ()=>{
        header.classList.add("header-expanded")
    })

    header.addEventListener("mouseout", ()=>{
        header.classList.remove("header-expanded")
    })
   
    // header.classList.add("header-expanded");
   

    let linesToggle = false;
    let color = defaultCanvasColor;
    let gridColor = defaultGridColor;
    let painting = false;
    
    rangeSlider.addEventListener("input", () => createGrid(rangeSlider.value));
    colorPicker.addEventListener("change", () => {
        color = colorPicker.value;
        changeColor(color);
    });
    blackBtn.addEventListener("click", ()=> changeColor("black"))
    rainbowBtn.addEventListener("click", () => changeColor("rainbow"));
    eraserBtn.addEventListener("click", () => changeColor("white"));
    clearBtn.addEventListener("click", clearGrid);
    gridLinesToggle.addEventListener("click", () => toggleGridLines());
    gridColorPicker.addEventListener("change", ()=>{
        gridColor = gridColorPicker.value;
        changeGridColor(gridColor);
    })

    function createGrid(num) {
        grid.innerHTML = "";
        linesToggle = false;
        for (let i = 0; i < num * num; i++) {
            const gridSquare = document.createElement("div");
            gridSquare.style.width = `calc(100% / ${num})`;
            gridSquare.style.height = `calc(100% / ${num})`;
            gridSquare.classList.add("grid-item");
            grid.appendChild(gridSquare);
        };
        gridSizeValues.textContent = `${num} x ${num}`;
        const gridItems = document.querySelectorAll(".grid-item");
        gridItems.forEach((elem) => {
            elem.addEventListener("mousedown", (e) => {
                painting = true;
                colorSquare(e.target)
            });
            elem.addEventListener("mouseover", (e) => {
                if (painting) {
                    colorSquare(e.target);
                }
            })
        })
    }

    document.addEventListener("mouseup", () => {
        painting = false;
    })

    function colorSquare(square) {
        if (color === "rainbow") {
            let randomR = Math.floor(Math.random() * 250);
            let randomG = Math.floor(Math.random() * 250);
            let randomB = Math.floor(Math.random() * 250);
            square.style.backgroundColor = `rgb(${randomR}, ${randomB}, ${randomG})`
        }
        else {
            square.style.backgroundColor = color;
        }
    }

    function changeColor(choice) {
        color = choice;
        
    }

    function changeGridColor(choice){
        gridColor = choice;
        grid.style.backgroundColor = gridColor;
    }

    function toggleGridLines() {
        linesToggle = !linesToggle;
        const gridItems = grid.querySelectorAll(".grid-item")
        const gridItemsArr = [...gridItems];
        const num = parseInt(rangeSlider.value);
        gridItemsArr.forEach((elem, index) => {
            if (linesToggle) {
                elem.style.borderRight = "1px solid lightgrey";
                elem.style.borderBottom = "1px solid lightgrey";
                if (index < num) {
                    elem.style.borderTop = "1px solid lightgrey";
                }
                if (index % num === 0) {
                    elem.style.borderLeft = "1px solid lightgrey";
                }
            } else {
                elem.style.border = "none";
            }
        })
    }

    function clearGrid() {
        const gridItems = grid.querySelectorAll(".grid-item");
        gridColor = defaultGridColor;
        gridItems.forEach((elem) => {
            elem.style.backgroundColor = "white";
        });
    }

    createGrid(defaultGridSize);
});
