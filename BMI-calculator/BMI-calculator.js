var btnAndResult = document.querySelector('.btn-and-result')
var resultBtn
var personData = JSON.parse(localStorage.getItem('BMI-Data')) || []
var bmi
renew()

function renew () {
  console.log('renew-f')
  document.querySelector('.height').value = ''
  document.querySelector('.weight').value = ''
  var str = ''
  str += `<div class="result-btn"> <input type="button" value= "看結果" /> </div>`
  btnAndResult.innerHTML = str
  resultBtn = document.querySelector('.result-btn')
  resultBtn.addEventListener('click', BMI, false)
  addBar(personData)
}

function BMI (e) {
  console.log('BMI-f')
  var str = ''
  var cm = document.querySelector('.height').value
  var kg = document.querySelector('.weight').value
  var bmi = kg / (cm / 100) / (cm / 100)
  bmi = bmi.toFixed(2)
  if (cm === '' || kg === '') {
    str += `<div class="result-btn"> <input type="button" value= "看結果" /> </div>`
  } else if (bmi < 18.5) {
    str += `<div class="underweight-circle-out">
          <div class="circle-in">
            <div class="underweight-BMI-result">
              <p class="BMI-value">${bmi}</p>
              <p class="BMI">BMI</p>
            </div>
          </div>
          <div class="icon-loop-out">
            <div class="underweight-icon-loop-in">
              <img src="./BMI-calculator-img/icons_loop.png" alt="icons_loop" />
            </div>
          </div>
        </div>
        <span class="underweight">過輕</span>`
  } else if (18.5 <= bmi && bmi < 24) {
    str += `<div class="ideal-circle-out">
          <div class="circle-in">
            <div class="ideal-BMI-result">
              <p class="BMI-value">${bmi}</p>
              <p class="BMI">BMI</p>
            </div>
          </div>
          <div class="icon-loop-out">
            <div class="ideal-icon-loop-in">
              <img src="./BMI-calculator-img/icons_loop.png" alt="icons_loop" />
            </div>
          </div>
        </div>
        <span class="ideal">理想</span>`
  } else if (24 <= bmi && bmi < 27) {
    str += `<div class="overweight-circle-out">
          <div class="circle-in">
            <div class="overweight-BMI-result">
              <p class="BMI-value">${bmi}</p>
              <p class="BMI">BMI</p>
            </div>
          </div>
          <div class="icon-loop-out">
            <div class="overweight-icon-loop-in">
              <img src="./BMI-calculator-img/icons_loop.png" alt="icons_loop" />
            </div>
          </div>
        </div>
        <span class="overweight">過重</span>`
  } else if (27 <= bmi && bmi < 30) {
    str += `<div class="mild-obesity-circle-out">
          <div class="circle-in">
            <div class="mild-obesity-BMI-result">
              <p class="BMI-value">${bmi}</p>
              <p class="BMI">BMI</p>
            </div>
          </div>
          <div class="icon-loop-out">
            <div class="mild-obesity-icon-loop-in">
              <img src="./BMI-calculator-img/icons_loop.png" alt="icons_loop" />
            </div>
          </div>
        </div>
        <span class="mild-obesity">輕度肥胖</span>`
  } else if (30 <= bmi && bmi < 34) {
    str += `<div class="moderate-obesity-circle-out">
          <div class="circle-in">
            <div class="moderate-obesity-BMI-result">
              <p class="BMI-value">${bmi}</p>
              <p class="BMI">BMI</p>
            </div>
          </div>
          <div class="icon-loop-out">
            <div class="moderate-obesity-icon-loop-in">
              <img src="./BMI-calculator-img/icons_loop.png" alt="icons_loop" />
            </div>
          </div>
        </div>
        <span class="moderate-obesity">中度肥胖</span>`
  } else if (bmi >= 34) {
    str += `<div class="severe-obesity-circle-out">
          <div class="circle-in">
            <div class="severe-obesity-BMI-result">
              <p class="BMI-value">${bmi}</p>
              <p class="BMI">BMI</p>
            </div>
          </div>
          <div class="icon-loop-out">
            <div class="severe-obesity-icon-loop-in">
              <img src="./BMI-calculator-img/icons_loop.png" alt="icons_loop" />
            </div>
          </div>
        </div>
        <span class="severe-obesity">重度肥胖</span>`
  }
  btnAndResult.innerHTML = str

  document
    .querySelector('.icon-loop-out')
    .addEventListener('click', update, false)

  addData()
  addBar(personData)
}

function addData (e) {
  console.log('addData-f')
  var posture = document.querySelector('.banner span').textContent
  var bmiValue = document.querySelector('.BMI-value').textContent
  var cm = document.querySelector('.height').value
  var kg = document.querySelector('.weight').value
  var fullTime = new Date()
  var year = fullTime.getFullYear()
  var month = ('0' + (fullTime.getMonth() + 1)).substr(-2)
  var date = ('0' + fullTime.getDate()).substr(-2)
  var allTime = month + '-' + date + '-' + year

  var personObject = {
    status: posture,
    BMI: bmiValue,
    weight: kg + 'kg',
    height: cm + 'cm',
    time: allTime
  }

  personData.push(personObject)
  localStorage.setItem('BMI-Data', JSON.stringify(personData))
}

function addBar (personData) {
  console.log('addBar-f')
  var bmiRecords = document.querySelector('.BMI-records')
  var i
  var str = ''
  for (i = 0; i < personData.length; i++) {
    if (personData[i].BMI < 18.5) {
      str += `<div class="underweight-bar">
        <span class="bar-text">${personData[i].status}</span
        ><span class="bar-BMI">BMI</span
        ><span class="bar-BMI-value">${personData[i].BMI}</span
        ><span class="bar-weight">weight</span><span class="bar-kg">${personData[i].weight}</span
        ><span class="bar-height">height</span
        ><span class="bar-cm">${personData[i].height}</span
        ><span class="bar-date">${personData[i].time}</span>
      </div>`
    } else if (18.5 <= personData[i].BMI && personData[i].BMI < 24) {
      str += `<div class="ideal-bar">
        <span class="bar-text">${personData[i].status}</span
        ><span class="bar-BMI">BMI</span
        ><span class="bar-BMI-value">${personData[i].BMI}</span
        ><span class="bar-weight">weight</span><span class="bar-kg">${personData[i].weight}</span
        ><span class="bar-height">height</span
        ><span class="bar-cm">${personData[i].height}</span
        ><span class="bar-date">${personData[i].time}</span>
      </div>`
    } else if (24 <= personData[i].BMI && personData[i].BMI < 27) {
      str += `<div class="overweight-bar">
          <span class="bar-text">${personData[i].status}</span
          ><span class="bar-BMI">BMI</span
          ><span class="bar-BMI-value">${personData[i].BMI}</span
          ><span class="bar-weight">weight</span><span class="bar-kg">${personData[i].weight}</span
          ><span class="bar-height">height</span
          ><span class="bar-cm">${personData[i].height}</span
          ><span class="bar-date">${personData[i].time}</span>
        </div>`
    } else if (27 <= personData[i].BMI && personData[i].BMI < 34) {
      str += `<div class="mild-and-moderate-obesity-bar">
          <span class="bar-text">${personData[i].status}</span
          ><span class="bar-BMI">BMI</span
          ><span class="bar-BMI-value">${personData[i].BMI}</span
          ><span class="bar-weight">weight</span><span class="bar-kg">${personData[i].weight}</span
          ><span class="bar-height">height</span
          ><span class="bar-cm">${personData[i].height}</span
          ><span class="bar-date">${personData[i].time}</span>
        </div>`
    } else if (personData[i].BMI >= 34) {
      str += `<div class="severe-obesity-bar">
          <span class="bar-text">${personData[i].status}</span
          ><span class="bar-BMI">BMI</span
          ><span class="bar-BMI-value">${personData[i].BMI}</span
          ><span class="bar-weight">weight</span><span class="bar-kg">${personData[i].weight}</span
          ><span class="bar-height">height</span
          ><span class="bar-cm">${personData[i].height}</span
          ><span class="bar-date">${personData[i].time}</span>
        </div>`
    }
    bmiRecords.innerHTML = str
  }
}

function update (e) {
  console.log('update-f')
  if (e.target.nodeName == 'IMG') {
    document.querySelector('.height').value = ''
    document.querySelector('.weight').value = ''
    renew()
  }
}
