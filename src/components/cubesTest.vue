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

        <button v-on:click.prevent="generateLine" class="btn btn-outline-success">Начать</button>


    </div>
</template>

<script>


var aCubes = []
const Xmax = 10
const Ymax = 10

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
        cubes: [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        lineCubes: [] 
    }
  },
  methods: {

      addCubeOnLine: function(){
          if (this.lineCubes.length >= Xmax) {

            for (var i = 0; i < Xmax; i++) {
               //console.log('i: ' + i + ' cube:' + cube);
                //this.cubes[i].splice(x, 1, 0);

                this.cubes[i].push(this.lineCubes[i])
            }


            
            //this.cubes.push([...this.lineCubes])
            this.lineCubes.splice(0)
          } else {
            this.lineCubes.push(getRandomInt(1, 5))
          }
      },

      generateLine: function(){
  
        var Timer = setInterval(() => {
            
            this.addCubeOnLine()

            for (var i = 0; i < Xmax; i++) {
                if (this.cubes[i].length >= Ymax) {
                    console.log('Timer stop')
                    clearInterval(Timer)
                }
            }
            
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

#cubes-wrap {
    height: 400px;
    width: 400px;
    background-color: #EEE;
}

#cubes-line-wrap {
    height: 40px;
    width: 400px;
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
    cursor: pointer;
    height:40px;
    width: 40px;
}

.cubes:hover {
    border: 1px solid #000;
}

.blue { background-color: rgb(52, 52, 161);  }
.red { background-color: rgb(160, 19, 19);  }
.green { background-color: rgb(52, 133, 52);  }
.yellow { background-color: rgb(184, 184, 33);  }


</style>