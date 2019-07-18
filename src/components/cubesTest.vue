<template>
    <div>

        <div class="game-board">

            <div class="game-board__item">
                <div class="game-board__item__caption">Level</div>
                <div class="game-board__item__value">{{level}}</div>
            </div>

            <div class="game-board__item">
                <div class="game-board__item__caption">Score</div>
                <div class="game-board__item__value"><animateNumber :number="score"/></div>
            </div>

            <div class="game-board__item">
                <div class="game-board__item__caption">Line To</div>
                <div class="game-board__item__value">{{LineToTheEnd}}</div>
            </div>

        </div>

       

            <div 
                id="cubes-wrap"
                v-bind:style="styleField"
            >
                <div 
                    v-for="(cubeRow, x) in cubes" 
                    :key="x" 
                    class="cubes-col"
                >
                    <transition-group name="tgCubes-row">
                    <div 
                        class="cubes"
                        v-for="(cube, y) in cubeRow" 
                        :key="y"
                        :class="{
                            delete: cube==0, 
                            red: cube==1 || cube==100, 
                            blue: cube==2 || cube==200, 
                            green: cube==3 || cube==300, 
                            yellow: cube==4 || cube==400, 
                            opacity: cube>=100 || gameOn==false
                            }"
                        @click="cubeClick(x,y,cube)"
                        v-html="x+':'+y"
                    >   
                    </div>
                    </transition-group>

                </div>

            </div>



        <div 
            id="line-wrap"
            v-bind:style="styleLine"
        >
            <div 
                v-for="cube in line" 
                :key="cube.id"
                :class="{red: cube==1, blue: cube==2, green: cube==3, yellow: cube==4}"
            >
            </div>
        </div>

        <br>

        <button 
            v-show="!gameOn"
            v-on:click="start" 
            class="btn btn-outline-success"
            v-html="'Start Level ' + nextLevel"
        >
        </button> 



    </div>
</template>



<script>

import animateNumber from './animateNumber.vue'
import { setTimeout } from 'timers';

/*
var Xmax = 10
var Ymax = 10
var Ystart = 5
*/


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default {
  name: "cubes",
  components: {
      animateNumber
  },
  data() {
    return {
        cubes: [],
        
        line: [],
        LinePush: 0,

        sizeCube: 40,

        score: 0,
        scoreLevel: 0,

        gameOn: false,
        initGame: false,
        

        level: 1,
        nextLevel: 1,
        levelSettings: [
            {id: 1, Xmax: 8, Ymax: 10, Ystart: 5, speed: 600, lines: 6},
            {id: 1, Xmax: 10, Ymax: 10, Ystart: 5, speed: 550, lines: 8},
            {id: 2, Xmax: 11, Ymax: 10, Ystart: 6, speed: 500, lines: 10},
            {id: 3, Xmax: 12, Ymax: 10, Ystart: 7, speed: 450, lines: 12},
            {id: 4, Xmax: 13, Ymax: 11, Ystart: 8, speed: 400, lines: 14},
            {id: 5, Xmax: 14, Ymax: 12, Ystart: 9, speed: 350, lines: 16},
            {id: 6, Xmax: 15, Ymax: 13, Ystart: 10, speed: 300, lines: 18},
            {id: 6, Xmax: 16, Ymax: 14, Ystart: 10, speed: 250, lines: 20},
        ]
    }
  },
  computed: {
    Xmax: function () { return this.levelSettings[this.level-1].Xmax },
    Ymax: function () { return this.levelSettings[this.level-1].Ymax },
    Ystart: function () { return this.levelSettings[this.level-1].Ystart },
    speed: function () { return this.levelSettings[this.level-1].speed },
    lines: function () { return this.levelSettings[this.level-1].lines },
    LineToTheEnd: function () { 
        let result = this.levelSettings[this.level-1].lines - this.LinePush;
        if (result < 0) result = 0;
        return result;
    },
    styleField: function () {
        return {
            height: this.levelSettings[this.level-1].Ymax * this.sizeCube + 'px',
            width: (this.levelSettings[this.level-1].Xmax * this.sizeCube + 2) + 'px'
        } 
    },
    styleLine: function () { 
        return {
            height: (this.sizeCube + 2) + 'px',
            width: this.levelSettings[this.level-1].Xmax * this.sizeCube + 'px'
        } 
    }
  },

  // set start position 
  created() {
    for (let x = 0; x < this.Xmax; x++) {
        this.cubes.push([])
        for (var y = 0; y < this.Ymax; y++) {
            if (y < this.Ystart) this.cubes[x].push(getRandomInt(1, 5))
        }
    }
  },

  methods: {

      // add new line to main array and clear line
      pushLine(){

          if (this.line.length >= this.Xmax) {
            for (let x = 0; x < this.Xmax; x++) {
                if (this.cubes[x].length < this.Ymax ) {
                    this.cubes[x].push(this.line[x])
                    if (this.cubes[x].length == this.Ymax) { this.playSound('attention') }
                } else {
                    // GAME OVER
                    this.gameOn = false;
                    this.score = this.score - this.scoreLevel;
                    break;
                }
            }

            // Level complete
            if (this.gameOn && this.LineToTheEnd == 0) {
                this.gameOn = false;
                this.nextLevel++;
            }

            this.LinePush++;
            this.line.splice(0)
           

          } else {
            this.line.push(getRandomInt(1, 5))
          }
      },


      // On timer and start generation new line
      start(){
        
        this.level = this.nextLevel;
        this.scoreLevel = 0
        this.cubes = []
        this.gameOn = true
        this.LinePush = 0

        // Create fields
        for (let x = 0; x < this.Xmax; x++) {
            this.cubes.push([])
            for (var y = 0; y < this.Ymax; y++) {
                if (y < this.Ystart) this.cubes[x].push(getRandomInt(1, 5))
            }
        }


        // Generation new line and push to array
        var Timer = setInterval(() => {
            if (!this.gameOn) { clearInterval(Timer); return; }
            this.pushLine()
            // Stop generation new line when array is full
            for (let i = 0; i < this.Xmax; i++) {
                if (this.cubes[i].length > this.Ymax) { 
                    this.gameOn = false; 
                    console.log('Stop timer: ' + ' i: ' + i + ' ' +  this.cubes[i].length)
                }
            }
        }, this.speed)   
        
      },


      // Delete element into array
      cubeClick(x, y, value){     
        if (this.gameOn == false) { return; }  
        this.cubesDelete(x, y, value)
      },

      cubesDelete(xStart, yStart, value){
          
          // временный массив с координатами помеченных кубиков
          let DelCubesCount = 0;

            let oneCubeDel = (xStart, yStart, value, newValue) => {
            let nextArrLength = 0
            let currentArrLength = 0
            let yNext = yStart + (nextArrLength - currentArrLength);

                //console.log('CurrElem: ' + xStart + ':' + yNext);
                if (yStart < (this.Ymax-1) && this.cubes[xStart][yStart+1] == value) {
                    this.cubes[xStart].splice(yStart+1, 1, newValue)
                    DelCubesCount++;
                    oneCubeDel(xStart, yStart+1, value, newValue)
                }

                if (yStart > 0 && this.cubes[xStart][yStart-1] == value) {
                    this.cubes[xStart].splice(yStart-1, 1, newValue)
                    DelCubesCount++;
                    oneCubeDel(xStart, yStart-1, value, newValue)
                }

                if (xStart < (this.Xmax-1)) {
                    nextArrLength = this.cubes[xStart+1].length
                    currentArrLength = this.cubes[xStart].length
                    yNext = yStart + (nextArrLength - currentArrLength);

                    if (xStart < (this.Xmax-1) && yNext >= 0 && yNext < this.Ymax && this.cubes[xStart+1][yNext] == value) {
                        this.cubes[xStart+1].splice(yNext, 1, newValue)
                        DelCubesCount++;
                        oneCubeDel(xStart+1, yNext, value, newValue);
                    }
                }

                if (xStart > 0) {
                    nextArrLength = this.cubes[xStart-1].length
                    currentArrLength = this.cubes[xStart].length
                    yNext = yStart + (nextArrLength - currentArrLength);

                    if (xStart > 0 && yNext >= 0 && yNext < this.Ymax && this.cubes[xStart-1][yNext] == value) {
                        this.cubes[xStart-1].splice(yNext, 1, newValue)
                        DelCubesCount++;
                        oneCubeDel(xStart-1, yNext, value, newValue);
                    }
                }
                

            }

            oneCubeDel(xStart, yStart, value, (value*100))

            setTimeout(() => {

                if (DelCubesCount >= 3) {

                    this.scoreLevel = this.scoreLevel + DelCubesCount * DelCubesCount;
                    this.score = this.score + DelCubesCount * DelCubesCount;
                    
                    this.playSound('delete')

                    // delete all cubes >= 100
                    for (let i = 0; i < this.Xmax; i++) {
                        for (let x = 0; x < this.cubes.length; x++) {
                            for (let y = 0; y < this.cubes[x].length; y++) {
                                if (this.cubes[x][y] >= 100) {
                                    this.cubes[x].splice(y, 1);
                                }
                            }
                        }
                    }

                    // if column is empty then merge column
                    for (let i = 0; i < 5; i++) {
                        for (let x = 0; x < (this.Xmax-1); x++) {
                            if (this.cubes[x].length === 0) {
                                this.cubes[x].push(...this.cubes[x+1])
                                this.cubes[x+1].splice(0, this.Xmax);
                            }
                        }
                    }


                } else {
                    this.playSound('miss')
                    oneCubeDel(xStart, yStart, (value*100), value)
                }
                DelCubesCount = 0;

            }, 80);
      },

      playSound(soundName){
        
        let soundPath = '';

        const sound = [
            {soundName: 'delete', soundPath: '/audio/del.wav'},
            {soundName: 'miss', soundPath: '/audio/miss.wav'},
            {soundName: 'attention', soundPath: '/audio/attention.wav'}
        ]

        sound.forEach(element => {
            if (element.soundName == soundName) { 
                soundPath = element.soundPath;
            }
        })

        // if settings sound not null
        if (soundPath != '' && window.HTMLAudioElement) {
            var audio = new Audio();
            audio.src = soundPath;
            audio.autoplay = false;
            audio.volume = 0.3;
            audio.playbackRate = 1;
            audio.play();
        }
      }


  }
}

</script>








<style lang="scss" rel="stylesheet/scss">

$size-cube: 40px;
$Xmax: 10;
$Ymax: 10;

#cubes-wrap,
#line-wrap {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    flex-direction: row;
    outline: 10px solid #FFF;
    margin: 15px auto;
    box-shadow: 0px 0px 20px #000;
}

#cubes-wrap {
   /* height: $Ymax * $size-cube;
    width: $Xmax * $size-cube; */
    background: #EFEFEF url('../img/cubes-bg-2.png') no-repeat;
    background-size: cover;
    

}

#line-wrap {
  /*  height: $size-cube;
    width: $Xmax * $size-cube; */
    background-color: #ABC;
    margin-top: 10px;
}

.cubes-col {
    display: flex;
    flex-direction: column;
    align-content: flex-end;
    justify-content: flex-end;
}

.cubes, 
#line-wrap > div {
	padding: 1px;
	color: #FFF;
    background-color: transparent;
	font-size: 9px;
	cursor: pointer;
	height: $size-cube;
	width: $size-cube;
    box-shadow: 1px 1px 1px #777;
    position: relative;
    border: 1px solid transparent;
}

.cubes::before,
#line-wrap > div::before {
	content: "";
	position: absolute;
	height: $size-cube - 2px;
	width: $size-cube - 2px;
	z-index: 9;
	top: 1px;
	left: 1px;
	border: 1px solid #EEE;
}

.cubes:hover {
    filter:contrast(200%);
    -webkit-filter:contrast(200%);
}

.delete { display: none; }
.blue::before { background-color: rgb(50, 50, 150);  }
.red::before { background-color: rgb(160, 20, 20); }
.green::before { background-color: rgb(50, 150, 50);  }
.yellow::before { background-color: rgb(180, 180, 30);  }
.opacity {
    opacity: .5;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
}

.tgCubes-row-enter-active, 
.tgCubes-row-leave-active {
  height: $size-cube;
  transition: .06s linear;
}

.tgCubes-row-enter, .tgCubes-row-leave-to {
  height: 0;
  transition: .06s linear;
}

.game-board {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0 auto 30px;
    width: 450px;
}

.game-board__item {
    width: 150px;
}

.game-board__item__value {
    font-size: 24px;
    font-weight: bold;
    color: #555;
    text-align: center;
    background-color: #FFF;
    border-radius: 50px;
    border: 5px solid #0A0;
    margin: 0 10px 10px;
}

.game-board__item__caption {
    font-weight: bold;
}

</style>