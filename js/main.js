import arrOfBtn from "./buttons.js";

document.addEventListener("DOMContentLoaded", function () {
  let closeBtn = document.getElementById("closeBtn");
  let lightBoxContainer = document.querySelector(".lightBoxContainer");
  let rulesBtn = document.querySelector(".rules");
  let main = document.querySelector(".main");
  let startGame = document.querySelector(".startGame");
  let finalScore = document.getElementById("score");
  let pickedBtn = document.getElementById("pickedBtn")
  let score = 0;

  /////////////////////////RULES/////////////////////////////////
  closeBtn.addEventListener("click", function () {
    lightBoxContainer.classList.add("d-none");
  });

  lightBoxContainer.addEventListener("click", function () {
    lightBoxContainer.classList.add("d-none");
  });

  rulesBtn.addEventListener("click", function () {
    lightBoxContainer.classList.remove("d-none");
  });

  function displayMain() {
    let box = "";
    box = `<div class="allBtn my-5">
            <div class="paperBtn d-flex align-items-center justify-content-center">
               <img src="img/icon-paper.svg">
            </div>
            <div class="rockBtn d-flex align-items-center justify-content-center">
               <img src="img/icon-rock.svg"> 
            </div>
            <div class="scissorsBtn d-flex align-items-center justify-content-center">
               <img src="img/icon-scissors.svg">
            </div>
            </div>`;

    main.innerHTML = box;
  }

  displayMain();

  function displayStart(item, randomID,randomImg, result) {
    let cartona = "";
    
    let borderColor = "";
    
    let houseborderColor = "";
    if (randomID === 1 ) {
      houseborderColor = "#3d51e9";
    } else if (randomID === 2 ) {
      houseborderColor = "rgb(227, 62, 84)";
    } else if (randomID === 3 ) {
      houseborderColor = "rgb(219, 167, 77)";  
    }
    
    if (item.id === 1 ) {
      borderColor = "#3d51e9";
    } else if (item.id === 2 ) {
      borderColor = "rgb(227, 62, 84)";
    } else if (item.id === 3 ) {
      borderColor = "rgb(219, 167, 77)";  
    }

    cartona = `<div class="allBtnStart">
      <div class="picked order-0">
        <div class="paperStart d-flex flex-column gap-4 align-items-center" id="paperStart ">
          <h4>YOU PICKED</h4>
          <button type="button" id="pickedBtn" class="" style="border:${borderColor} 20px solid" ><img src=${item.url} alt=""/></button>
        </div>
      </div>
      
      <div class="housePicked position-relative order-2">
      <div class="d-flex flex-column gap-4 align-items-center">
      <h4 class="text-center">THE HOUSE PICKED</h4>
      <button type="button" class="" id="paperRandom" style="border:${houseborderColor} 20px solid"><img src=${randomImg} alt=""></button>
      </div>
      </div>
      
      <div class="playAgain text-center d-flex flex-column gap-3 order-1">
        <h2>${result}</h2>
        <button type="button" class="btn px-5" id="playAgainBtn">PLAY AGAIN</button>
      </div>
    </div>`;
  
    startGame.innerHTML = cartona;

    ////////////////////PLAY AGAIN/////////////////////////////
    let playAgainBtn = document.getElementById("playAgainBtn");
    playAgainBtn.addEventListener("click", function () {
      startGame.classList.replace("d-flex", "d-none");
      main.classList.replace("d-none", "d-flex");
    });
  }

  let pickedImg = Array.from(document.querySelectorAll(".allBtn div"));

  pickedImg.map((ele, index) => {
    ele.addEventListener("click", () => {
      let yourChoice = arrOfBtn[index];
      displayStart(yourChoice);
      startGame.classList.replace("d-none", "d-flex");
      main.classList.replace("d-flex", "d-none");

      let computerImg = document.querySelector(".housePicked img");
      let randomItem = arrOfBtn[Math.floor(Math.random() * arrOfBtn.length)];
      computerImg.src = randomItem.url;

      let result = "";

      if (yourChoice.url === randomItem.url) {
        result = "IT'S A TIE";
      } 
      else
      {
        if (yourChoice.name.includes("rock")) {
          if (randomItem.name.includes("scissors")) {
            result = "YOU WIN";
          } else {
            result = "YOU LOSE";
          }
        } else if (yourChoice.name.includes("scissors")) {
          if (randomItem.name.includes("paper")) {
            result = "YOU WIN";
          } else {
            result = "YOU LOSE";
          }
        } else if (yourChoice.name.includes("paper")) {
          if (randomItem.name.includes("rock")) {
            result = "YOU WIN";
          } else {
            result = "YOU LOSE";
          }
        }
      }

      switch (result) {
        case "YOU WIN":
          score++;
          finalScore.textContent = score;
      }
      displayStart(yourChoice, randomItem.id,randomItem.url, result);
    });
  });
});

