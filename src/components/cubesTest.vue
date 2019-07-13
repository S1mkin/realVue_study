<template>
    <div>
        <h3>Score: {{score}}</h3>
        
        <div class="cubes-fields-wrap">

            <div id="cubes-wrap-clone" class="hidden"></div>

            <div id="cubes-wrap">
                    
                <div 
                    v-for="(cubeRow, x) in cubes" 
                    :key="x" 
                    class="cubes-col"
                >
                    <transition-group name="tgCubes">
                    <div 
                        class="cubes"
                        v-for="(cube, y) in cubeRow" 
                        :key="y"
                        :class="{delete: cube==0, red: cube==1, blue: cube==2, green: cube==3, yellow: cube==4}"
                        v-on:click="cubeClick(x,y,cube)"

                    >   
                    </div>
                    </transition-group>

                </div>
                
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

        <button v-on:click="startLine" class="btn btn-outline-success">Начать</button> 
        &nbsp;
        <button v-on:click.prevent="stopLine" class="btn btn-outline-success">Остановить</button>


    </div>
</template>



<script>
const Xmax = 16
const Ymax = 14

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default {
  name: "cubes",
  
  data() {
    return {
        cubes: [],
        line: [],
        score: 0,
        speed: 200,
        genLine: false
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
                    this.genLine = false;
                }
            }
            this.line.splice(0)
          } else {
            this.line.push(getRandomInt(1, 5))
          }
      },


      // On timer and start generation new line
      startLine(){
        
        this.genLine = true;

        // Generation new line and push to array
        var Timer = setInterval(() => { 
            this.pushLine()
            // Stop generation new line when array is full
            for (let i = 0; i < Xmax; i++) {
                if (this.cubes[i].length > Ymax) { 
                    this.genLine = false; 
                    console.log('Stop timer: ' + ' i: ' + i + ' ' +  this.cubes[i].length)
                }
            }
            if (!this.genLine) { clearInterval(Timer) }
        }, this.speed)   
        
      },


      // Off generation new line
      stopLine(){
           this.genLine = false;
      },


      // Delete element into array
      cubeClick(x, y, value){     

        //this.cubes[y].splice(x, 1);

        this.cubesDelete(x, y, value)

        for (let i = 0; i < (Xmax-1); i++) {
            // if array is empty then delete and push new in the end
            if (this.cubes[i].length == 0) {
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

            //document.getElementById('cubes-wrap-clone').innerHTML = document.getElementById('cubes-wrap').innerHTML;
            //document.getElementById('cubes-wrap-clone').classList.remove("hidden")

            setTimeout(() => {

                if (DelCubesCount >= 3) {

                    this.score = this.score + DelCubesCount;

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

                //document.getElementById('cubes-wrap-clone').classList.add("hidden")

            }, 300);
      }


  }
}

</script>








<style>

#cubes-wrap,
#cubes-wrap-clone,
#line-wrap {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    flex-direction: row;
    margin: 0 auto;
}

.cubes-fields-wrap {
    position: relative;
}

#cubes-wrap-clone {
    position: absolute;
    z-index: 9;
    top: 0;
    left: 235px;
}

.hidden { display: none !important; }

#cubes-wrap,
#cubes-wrap-clone {
    height: 560px;
    width: 640px;
    background-color: #EFEFEF;
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

.cubes,
#line-wrap > div {
    border: 1px solid #FFF;
    padding: 10px;
    color: #FFF;
    font-size: 11px;
    cursor: pointer;
    height:40px;
    width: 40px;

    opacity: 1;
    transition: .4s linear;
}



.delete { display: none; }
.blue { background-color: rgb(52, 52, 161); }
.red { background-color: rgb(160, 19, 19); }
.green { background-color: rgb(52, 133, 52);  }
.yellow { background-color: rgb(184, 184, 33);  }



.tgCubes-enter-active, .tgCubes-leave-active {
  opacity: 1;
}
.tgCubes-enter, .tgCubes-leave-to {
  opacity: 0;
}

.tgCubes-list-move {
  transition: all 0;
}

</style>