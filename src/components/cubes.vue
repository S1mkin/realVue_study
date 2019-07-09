<template>
    <div>
        <div class="fiels-wrap">
            <div
                v-for="cube in fieldCubes"
                v-bind:key="cube.id"
                v-bind:class="{empty: cube.val==0, red: cube.val==1, green: cube.val==2, blue: cube.val==3}"
            >
                
            </div>
        </div>

        <div class="fiels-wrap">
            <div
                v-for="cube in lineCubes"
                v-bind:key="cube.id"
                v-bind:class="{empty: cube.val==0, red: cube.val==1, green: cube.val==2, blue: cube.val==3}"
            >
                
            </div>
        </div> 

        <button v-on:click.prevent="generatorLine">Сгенерировать строку</button>

    </div>

    

</template>

<script>
import { setTimeout } from 'timers';

var fCubes = [];
var lCubes = [];
var x = 0;
var y = 0;
var randomVal = 0;
var counter = 0;

/*
for (x = 0; x < 9; x++) {
    for (y = 0; y < 9; y++) {
        randomVal = Math.floor(Math.random() * (4 - 0)) + 0;
        fCubes.push({'x':x, 'y':y, 'val':randomVal });
    }  
}
*/
setInterval(() => {
    counter++;
    randomVal = Math.floor(Math.random() * (4 - 0)) + 0;
    lCubes.push({'x':0, 'y':0, 'val':randomVal });
    if (counter > 8) {
        fCubes.push(lCubes[1]);
        lCubes = [];
        lCubes.length = 0;
        counter = 0;
    }
}, 300)


export default {
    name: 'cubes',
    data() {
        return {
            fieldCubes: fCubes,
            lineCubes: lCubes
        }
    },
    methods: {
        generatorLine: function(){
            setInterval(() => {
                this.lineCubes.push({'x':0, 'y':0, 'val':2 });
            }, 1000)
        }
    }
}




</script>

<style>

    .fiels-wrap {
        height: 270px;
        width: 270px;
        margin: 0 auto;
    }

    .fiels-wrap > div {
        height: 30px;
        width: 30px;
        border: 1px solid #EEE;
        float: left;
    }

    .red {
        background-color: red;
    }

    .blue {
        background-color: blue;
    }

    .green {
        background-color: green;
    }

</style>
