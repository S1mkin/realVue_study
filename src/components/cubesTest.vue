<template>
    <div>
        <div id="cubesWrap">
            <div v-for="(cubeRow, y) in cubes" v-bind:key="cubeRow.id">
                <div 
                    v-for="(cube, x) in cubeRow" 
                    v-bind:key="cube.id"
                    v-bind:class="{red: cube==1, blue: cube==2, green: cube==3, yellow: cube==4}"
                    v-on:click="cubeClick(x,y)"
                >
                    {{cube}}-{{x}}/{{y}}
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
    </div>
</template>

<script>

var aCubes = []
var Xmax = 15
var Ymax = 13

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

for (var i = 0; i < Ymax; i++) {
   aCubes[i] = [];
   for (var j = 0; j < Xmax; j++) {
      aCubes[i].push(getRandomInt(0, 5));
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
            this.lineCubes.push(getRandomInt(0, 5))
          }
      },

      generateLine: function(){

            


        var Timer = setInterval(() => {
            this.addCubeOnLine()
        }, 500)
        
        
      },

      cubeClick: function(x,y){
          this.cubes[y].splice(x, 1, 0); // delete cube
      }
  }
}

</script>


<style>
#cubesWrap > div > div,
#cubes-line-wrap > div {
    height: 40px;
    width: 40px;
    font-size: 10px;
    border: 1px solid #FFF;
    display: inline-block;
    color: #FFF;
}

#cubesWrap > div { line-height: 1em; }

.blue { background-color: rgb(52, 52, 161);  }
.red { background-color: rgb(160, 19, 19);  }
.green { background-color: rgb(52, 133, 52);  }
.yellow { background-color: rgb(184, 184, 33);  }


</style>