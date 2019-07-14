<template>
    <div>
        <h3>Score: <animateNumber :number="score"/></h3>

            <div id="cubes-wrap">
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
                    >   
                    </div>
                    </transition-group>

                </div>

            </div>



        <div id="line-wrap">
            <div 
                v-for="cube in line" 
                :key="cube.id"
                :class="{red: cube==1, blue: cube==2, green: cube==3, yellow: cube==4}"
                v-html="cube"
            >
            </div>
        </div>

        <br>

        <button 
            v-show="!gameOn"
            v-on:click="start" 
            class="btn btn-outline-success"
            v-html="'Let\'s go'"
        >
        </button> 



    </div>
</template>



<script>

import animateNumber from './animateNumber.vue'
import { setTimeout } from 'timers';

const Xmax = 16
const Ymax = 14

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
        score: 0,
        speed: 200,
        gameOn: false
    }
  },

    // set start position for 
  created() {
    for (let x = 0; x < Xmax; x++) {
        this.cubes.push([])
        for (var y = 0; y < Ymax; y++) {
            if (y < 8) this.cubes[x].push(getRandomInt(1, 5))
        }
    }
  },

  methods: {
      // add new line to main array and clear line
      pushLine(){
          if (this.line.length >= Xmax) {
            for (let x = 0; x < Xmax; x++) {
                if (this.cubes[x].length < Ymax ) {
                    this.cubes[x].push(this.line[x])
                } else {
                    this.gameOn = false;
                }
            }
            this.line.splice(0)
          } else {
            this.line.push(getRandomInt(1, 5))
          }
      },


      // On timer and start generation new line
      start(){
        
        this.gameOn = true;

        // Generation new line and push to array
        var Timer = setInterval(() => { 
            this.pushLine()
            // Stop generation new line when array is full
            for (let i = 0; i < Xmax; i++) {
                if (this.cubes[i].length > Ymax) { 
                    this.gameOn = false; 
                    console.log('Stop timer: ' + ' i: ' + i + ' ' +  this.cubes[i].length)
                }
            }
            if (!this.gameOn) { clearInterval(Timer) }
        }, this.speed)   
        
      },


      // Off generation new line
      stopLine(){
           this.gameOn = false;
      },


      // Delete element into array
      cubeClick(x, y, value){     

        if (this.gameOn == false) { return; }  

        //this.cubes[y].splice(x, 1);

        this.cubesDelete(x, y, value)

        for (let i = 0; i < (Xmax-1); i++) {
            // if array is empty then delete and push new in the end
            if (this.cubes[i].length === 0) {
                this.cubes[i].push(...this.cubes[i+1])
                this.cubes[i+1].splice(0, Xmax);
            }
        }
      },

      cubesDelete(xStart, yStart, value){
          
          // временный массив с координатами помеченных кубиков
          let DelCubesCount = 0;

            let oneCubeDel = (xStart, yStart, value, newValue) => {
            let nextArrLength = 0
            let currentArrLength = 0
            let yNext = yStart + (nextArrLength - currentArrLength);

                //console.log('CurrElem: ' + xStart + ':' + yNext);
                if (yStart < (Ymax-1) && this.cubes[xStart][yStart+1] == value) {
                    this.cubes[xStart].splice(yStart+1, 1, newValue)
                    DelCubesCount++;
                    oneCubeDel(xStart, yStart+1, value, newValue)
                }

                if (yStart > 0 && this.cubes[xStart][yStart-1] == value) {
                    this.cubes[xStart].splice(yStart-1, 1, newValue)
                    DelCubesCount++;
                    oneCubeDel(xStart, yStart-1, value, newValue)
                }

                if (xStart < (Xmax-1)) {
                    nextArrLength = this.cubes[xStart+1].length
                    currentArrLength = this.cubes[xStart].length
                    yNext = yStart + (nextArrLength - currentArrLength);

                    if (xStart < (Xmax-1) && yNext >= 0 && yNext < Ymax && this.cubes[xStart+1][yNext] == value) {
                        this.cubes[xStart+1].splice(yNext, 1, newValue)
                        DelCubesCount++;
                        oneCubeDel(xStart+1, yNext, value, newValue);
                    }
                }

                if (xStart > 0) {
                    nextArrLength = this.cubes[xStart-1].length
                    currentArrLength = this.cubes[xStart].length
                    yNext = yStart + (nextArrLength - currentArrLength);

                    if (xStart > 0 && yNext >= 0 && yNext < Ymax && this.cubes[xStart-1][yNext] == value) {
                        this.cubes[xStart-1].splice(yNext, 1, newValue)
                        DelCubesCount++;
                        oneCubeDel(xStart-1, yNext, value, newValue);
                    }
                }
                

            }

            oneCubeDel(xStart, yStart, value, (value*100))

            setTimeout(() => {

                if (DelCubesCount >= 3) {

                    this.score = this.score + DelCubesCount * DelCubesCount;

                    for (let i = 0; i < Xmax; i++ ) {
                        for (let x = 0; x < this.cubes.length; x++) {
                            for (let y = 0; y < this.cubes[x].length; y++) {
                                if (this.cubes[x][y] >= 100) {
                                    this.cubes[x].splice(y, 1);
                                }
                            }
                        }
                    }
                } else {
                    oneCubeDel(xStart, yStart, (value*100), value)
                }
                DelCubesCount = 0;

            }, 100);
      }


  }
}

</script>








<style>

#cubes-wrap,
#line-wrap {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    flex-direction: row;
    margin: 0 auto;
}

#cubes-wrap {
    height: 560px;
    width: 640px;
    background: #EFEFEF url('../img/cubes-bg-2.png') no-repeat;
    background-size: cover;
    box-shadow: 0px 0px 4px #777;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
}

#line-wrap {
    height: 40px;
    width: 640px;
    background-color: #ABC;
    margin-top: 10px;
}

.cubes-col {
    display: flex;
    flex-direction: column;
    align-content: flex-end;
    justify-content: flex-end;
}

.cubes, #line-wrap > div {
	border: 1px solid #EEE;
	padding: 10px;
	color: #FFF;
	font-size: 9px;
	cursor: pointer;
	height: 39px;
	width: 38px;
	margin: 1px;
    box-shadow: 1px 1px 2px #555;
}

.cubes:hover {
    opacity: .8;
}

.delete { display: none; }
.blue { background-color: rgb(50, 50, 150);  }
.red { background-color: rgb(160, 20, 20); }
.green { background-color: rgb(50, 150, 50);  }
.yellow { background-color: rgb(180, 180, 30);  }
.opacity { opacity: .5; }

.tgCubes-row-enter-active, .tgCubes-row-leave-active {
  height: 40px;
  transition: .1s linear;
}
.tgCubes-row-enter, .tgCubes-row-leave-to {
  height: 0;
  transition: .1s linear;
}

.tgCubes-col-enter-active, .tgCubes-col-leave-active {
  width: 40px;
  transition: .1s linear;
}
.tgCubes-col-enter, .tgCubes-col-leave-to {
  width: 0;
  transition: .1s linear;
}


</style>