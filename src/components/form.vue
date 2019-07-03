
<template>
    <div id="task-wrapper" class="container">
        <form
            v-on:submit.prevent="addTask"
        >
            <h3>{{ caption }}</h3>

            <div class="row">
              <div class="col">
                <label for="new-task">Добавить задачу</label>
              </div>
              <div class="col">
                <input
                    v-model="newTaskText"
                    id="new-task"
                    placeholder="Например, покормить кота"
                    class="form-control"
                >
              </div>
              <div class="col">
                <button type="submit" class="btn btn-outline-success">Добавить</button>
              </div>
            </div>

        </form>

        <br>
        <br>

        <ul class="list-group">
            <li
                is="taskItem"
                v-for="(task, index) in tasks"
                v-bind:key="task.id"
                v-bind:title="task.title"
                v-on:remove="tasks.splice(index, 1)"
            ></li>
        </ul>


    </div>

</template>



<script>

import taskItem from './task-item.vue'

export default {
  name: "mForm",
  components: {taskItem},
  props: {
    caption: String
  },
  data() {
    return {
        newTaskText: '',
        tasks: [
            {
                id: 1,
                title: 'Помыть посуду'
            },
            {
                id: 2,
                title: 'Вынести мусор'
            },
            {
                id: 3,
                title: 'Подстричь газон'
            }
        ],
        nextTaskId: 4
    }
  },
  methods: {
    addTask: function () {
      this.tasks.push({
        id: this.nextTaskId++,
        title: this.newTaskText
      })
      this.newTaskText = ''
    }
  }
};
</script>