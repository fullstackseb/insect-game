'use strict'

const startBtn = document.querySelector('.start-btn')
const replayBtn = document.querySelector('.replay-btn')
const gameContainer = document.querySelector('.game-container')
const timeEl = document.querySelector('.time')
const scoreEl = document.querySelector('.score')
const finalScore = document.querySelector('#final_score')
const messageEl = document.querySelector('.message')
const insectBtns = document.querySelectorAll('.choose-insect-btn')
const screens = document.querySelectorAll('.screen')

let seconds = 30
let score = 0
let selected_insect = {}
let start
let playing

startBtn.addEventListener('click', () => screens[0].classList.add('up'))

insectBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img')
    const src = img.getAttribute('src')
    const alt = img.getAttribute('alt')

    selected_insect = { src, alt }

    screens[1].classList.add('up')
    setTimeout(createInsect, 1000)
    startGame()
  })
})

function createInsect() {
  // create new insect
  const newInsect = document.createElement('div')
  newInsect.classList.add('insect')

  // add random position for insect
  const { x, y } = getRandomLocation()
  newInsect.style.top = `${y}px`
  newInsect.style.left = `${x}px`

  // insert insect to the screen
  const newImg = document.createElement('img')
  newImg.style.transform = `rotate(${Math.random() * 360}deg)`
  newImg.setAttribute('src', `${selected_insect.src}`)
  newImg.setAttribute('alt', `${selected_insect.alt}`)
  newInsect.appendChild(newImg)

  newInsect.addEventListener('click', catchInsect)
  gameContainer.appendChild(newInsect)
}

function startGame() {
  playing = true
  start = setInterval(updateTimer, 1000)
}

function updateTimer() {
  let m = Math.floor(seconds / 60)
  let s = seconds

  m = m < 10 ? `0${m}` : m
  s = s < 10 ? `0${s}` : s

  timeEl.innerHTML = `Timer: ${m}:${s}`
  seconds--

  if (seconds < 0) {
    seconds = 0
    endGame()
  }
}

////////////////////////////////////////////////////
// Helper functions

function getRandomLocation() {
  const width = window.innerWidth
  const height = window.innerHeight

  const x = Math.random() * (width - 200) + 100
  const y = Math.random() * (height - 200) + 100

  return { x, y }
}

function catchInsect() {
  if (playing) {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 1000)

    createInsects()
  }
}

function createInsects() {
  setTimeout(createInsect, 500)
  setTimeout(createInsect, 1000)
}

function increaseScore() {
  score++
  scoreEl.innerHTML = `Score: ${score}`
}

replayBtn.addEventListener('click', () => {
  location.reload()
})

function endGame() {
  // disable score increase and catching
  playing = false

  // clear interval and move screen up
  clearInterval(start)
  screens[2].classList.add('up')

  // display final message and button
  messageEl.classList.add('visible')
  replayBtn.classList.add('visible')
  finalScore.innerText = score

  // remove all insects from the DOM
  const insectsAll = document.querySelectorAll('.insect')

  insectsAll.forEach(insect => {
    setTimeout(() => insect.remove(), 500)
  })
}
