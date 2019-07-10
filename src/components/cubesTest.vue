<template>
    <div>
        <div id="cubes-wrap">
            <div v-for="(cubeRow, x) in cubes" v-bind:key="cubeRow.id" class="cubes-col">
                <div 
                    v-for="(cube, y) in cubeRow" 
                    v-bind:key="cube.id"
                    v-bind:class="{cubes, red: cube==1, blue: cube==2, green: cube==3, yellow: cube==4}"
                    v-on:click="cubeClick(y,x)"
                    v-show="cube"
                >
                    {{x}}/{{y}}
                </div>
            </div>
        </div>

        <div id="cubes-line-wrap">
            <div 
                v-for="lCube in lineCubes" 
                v-bind:key="lCube.id"
                v-bind:class="{red: lCube==1, blue: lCube==2, green: lCube==3, yellow: lCube==4}"
            >
                {{lCube}}
            </div>
        </div>

        <br>

        <button v-on:click.prevent="generateLine">Начать</button>


        <div id="cubes-wrap">
            <div class="cubes-col">
                <div class="cubes">1.1</div>
                <div class="cubes">1.2</div>
                <div class="cubes">1.3</div>
                <div class="cubes">1.4</div>
                <div class="cubes">1.5</div>
            </div>
            <div class="cubes-col">
                <div class="cubes">2.1</div>
                <div class="cubes">2.2</div>
                <div class="cubes">2.3</div>
                <div class="cubes">2.4</div>
                <div class="cubes">2.5</div>
            </div>
            <div class="cubes-col">
                <div class="cubes">3.1</div>
                <div class="cubes">3.2</div>
                <div class="cubes">3.3</div>
                <div class="cubes">3.4</div>
                <div class="cubes">3.5</div>
            </div>
            <div class="cubes-col">
                <div class="cubes">4.1</div>
                <div class="cubes">4.2</div>
                <div class="cubes">4.3</div>
                <div class="cubes">4.4</div>
                <div class="cubes">4.5</div>
            </div>
            <div class="cubes-col">
                <div class="cubes">5.1</div>
                <div class="cubes" style="display: none;">5.2</div>
                <div class="cubes">5.3</div>
                <div class="cubes">5.4</div>
                <div class="cubes">5.5</div>
            </div>
            <div class="cubes-col">
                <div class="cubes">6.1</div>
                <div class="cubes">6.2</div>
                <div class="cubes">6.3</div>
                <div class="cubes">6.4</div>
                <div class="cubes">6.5</div>
            </div>
        </div>

    </div>
</template>

<script>
import { clearInterval } from 'timers';

var aCubes = []
const Xmax = 9
const Ymax = 9

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

for (var i = 0; i < Ymax; i++) {
   aCubes[i] = [];
   for (var j = 0; j < Xmax; j++) {
      aCubes[i].push(getRandomInt(1, 5));
  }
}

export default {
  name: "cubes",
  data() {
    return {
        cubes: [],
        lineCubes: [] 
    }
  },
  methods: {

      addCubeOnLine: function(){
          if (this.lineCubes.length >= Xmax) {
              this.cubes.push([...this.lineCubes])
              this.lineCubes.splice(0)
          } else {
            this.lineCubes.push(getRandomInt(1, 5))
          }
      },

      generateLine: function(){
        
        var Timer = setInterval(() => {
            if (this.cubes.length >= Ymax) {
                clearInterval(Timer)
            }
            this.addCubeOnLine()
        }, 300)
        
        
      },

      cubeClick: function(x,y){
          this.cubes[y].splice(x, 1, 0); // delete cube
      }
  }
}

</script>


<style>

#cubes-wrap,
#cubes-line-wrap {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    flex-direction: row;
}

.cubes-col {
    background-color: #EEE;
    display: flex;
    flex-direction: column;
    align-content: flex-end;
    justify-content: flex-end;
}

.cubes,
#cubes-line-wrap > div {
    border: 1px solid #FFF;
    padding: 10px;
    color: #FFF;
    font-size: 11px;
}


.blue { background-color: rgb(52, 52, 161);  }
.red { background-color: rgb(160, 19, 19);  }
.green { background-color: rgb(52, 133, 52);  }
.yellow { background-color: rgb(184, 184, 33);  }


</style>