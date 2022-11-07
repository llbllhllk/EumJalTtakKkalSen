// Food data
const foodData = JSON.parse(JSON.stringify(FOODS));

// Element
const result = document.querySelector('.recommand__result strong');

// Button
const recommandBtn = document.querySelector('.recommand-btn');

// Keyword
let recommandKeyword;

const handleRecommandFood = () => {
  const categoryArr = ["ko", "ch", "jp", "ws"];
  const randomCategory = Math.floor(Math.random() * 4);
  const randomMenu = Math.floor(Math.random() * 10);
  const checkedCategory = document.querySelector('input[name="category"]:checked').id;
  if(checkedCategory !== "all") {
    recommandKeyword = foodData[checkedCategory][randomMenu].name;
    result.innerText = foodData[checkedCategory][randomMenu].name;
  } else {
    for(let category in foodData) {
      if(category === categoryArr[randomCategory]) {
        recommandKeyword = foodData[category][randomMenu].name;
        result.innerText = foodData[category][randomMenu].name;
      }
    }
  }
}

const handleRecommandBtn = () => {
  // 맛집 추천 버튼 생성
  recommandStoreBtn.style.display = "block";
  handleRecommandFood();
}

recommandBtn.addEventListener('click', handleRecommandBtn);