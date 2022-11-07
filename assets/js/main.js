// Food data
const foodData = JSON.parse(JSON.stringify(FOODS));

// Element
const result = document.querySelector('.recommand__result strong');

// Button
const recommandBtn = document.querySelector('.recommand-btn');

// Keyword
let recommandKeyword;

// 사용자가 음식의 카테고리를 선택하고 음식추천 버튼을 눌렀을 때 랜덤으로 추천한다.
const handleRecommandFood = () => {
  const categoryArr = ["ko", "ch", "jp", "ws"];
  const randomCategory = Math.floor(Math.random() * 4);
  const randomMenu = Math.floor(Math.random() * 10);
  const checkedCategory = document.querySelector('input[name="category"]:checked').id;
  // 사용자가 '전체' 카테고리를 선택했을 경우 모든 카테고리의 음식을 기반으로 랜덤으로 음식을 출력한다.
  if(checkedCategory !== "all") {
    recommandKeyword = foodData[checkedCategory][randomMenu].name;
    result.innerText = foodData[checkedCategory][randomMenu].name;
  } else {  // 사용자가 '전체' 카테고리가 아닌 특정 카테고리를 선택했을 경우 해당 카테고리의 음식을 기반으로 랜덤으로 음식을 출력한다.
    for(let category in foodData) {
      if(category === categoryArr[randomCategory]) {
        recommandKeyword = foodData[category][randomMenu].name;
        result.innerText = foodData[category][randomMenu].name;
      }
    }
  }
}

const handleRecommandBtn = () => {
  recommandStoreBtn.style.display = "block";
  handleRecommandFood();
}

recommandBtn.addEventListener('click', handleRecommandBtn);