<template>
    <div>
        <div id="cubes-wrap">
            <div v-for="(cubeRow, x) in cubes" v-bind:key="cubeRow.id" class="cubes-col">
                <div 
                    v-for="(cube, y) in cubeRow" 
                    v-bind:key="cube.id"
                    v-bind:class="{cubes, delete: cube==0, red: cube==1, blue: cube==2, green: cube==3, yellow: cube==4}"
                    v-on:click="cubeClick(x,y,cube)"
                    v-html="x+':'+y"
                >   
                </div>
            </div>
        </div>

        <div id="line-wrap">
            <div 
                v-for="cube in line" 
                v-bind:key="cube.id"
                v-bind:class="{red: cube==1, blue: cube==2, green: cube==3, yellow: cube==4}"
                v-html="cube"
            >
            </div>
        </div>

        <br>

        <button v-on:click.prevent="startLine" class="btn btn-outline-success">Начать</button> 
        &nbsp;
        <button v-on:click.prevent="stopLine" class="btn btn-outline-success">Остановить</button>


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
      aCubes[i].push(0);
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
        line: [],
        genLine: false
    }
  },
  methods: {




      // add new line to main array and clear line
      pushLine(){
          if (this.line.length >= Xmax) {

            for (var i = 0; i < Xmax; i++) {
                //this.cubes[i].splice(x, 1, 0);
                //this.cubes[i].splice(0,1) // улаояеи пепвый элемент i массива
                this.cubes[i].push(this.line[i])
            }
            
            //this.cubes.push([...this.line])
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
                if (this.cubes[i].length >= Ymax) { this.genLine = false; }
            }
            if (!this.genLine) { clearInterval(Timer) }
        }, 100)   
        
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

      cubesDelete(xStart,yStart, value){           

            let cubeDel = (xStart, yStart, value, newValue) => {

                console.log('VAL: ' + xStart + ' : ' + yStart);

                this.cubes[xStart].splice(yStart, 1, newValue);

                if (yStart < (Ymax-1) && this.cubes[xStart][yStart+1] == value) {
                    this.cubes[xStart].splice(yStart+1, 1, newValue);
                    cubeDel(xStart, yStart+1, value, newValue);
                }

                if (yStart > 0 && this.cubes[xStart][yStart-1] == value) {
                    this.cubes[xStart].splice(yStart-1, 1, newValue);
                    cubeDel(xStart, yStart-1, value, newValue);
                }

                if (xStart < (Xmax-1) && this.cubes[xStart+1][yStart] == value) {
                    this.cubes[xStart].splice(yStart, 1, newValue);
                    cubeDel(xStart+1, yStart, value, newValue);
                }

                if (xStart > 0 && this.cubes[xStart-1][yStart] == value) {
                    this.cubes[xStart-1].splice(yStart, 1, newValue);
                    cubeDel(xStart-1, yStart, value, newValue);
                }                

            }

            cubeDel(xStart, yStart, value, (value*100));


            //cubeDel(xStart, yStart, (value*100), 0);

            
          
          return;
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
    height: 400px;
    width: 400px;
    background-color: #EFEFEF;
}

#line-wrap {
    height: 40px;
    width: 400px;
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

.cubes:hover {
    opacity: .6;
}

.delete { display: none; }
.blue { background-color: rgb(52, 52, 161);  }
.red { background-color: rgb(160, 19, 19);  }
.green { background-color: rgb(52, 133, 52);  }
.yellow { background-color: rgb(184, 184, 33);  }


</style>