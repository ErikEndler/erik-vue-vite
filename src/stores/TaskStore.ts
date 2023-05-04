import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => {
    return {
      // for initially empty lists
      taskList: [{ id: 1, title: 'task 1', isFav: true }] as Task[],
      // for data that is not yet loaded
      task: null as Task | null
    }
  }
})

interface Task {
  id: number
  title: string
  isFav: boolean
}
