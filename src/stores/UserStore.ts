import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      // for initially empty lists
      userList: [] as UserInfo[],
      // for data that is not yet loaded
      user: null as UserInfo | null
    }
  }
})

interface UserInfo {
  nome: string
  email: string
  senha: string
  senhaConfirme: string
}
