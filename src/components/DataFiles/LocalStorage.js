export class LocalStorage {
    setItem(key, value) {
      localStorage.setItem(key, value)
    }
  
    getItem(key) {
      let getData = localStorage.getItem(key)
      return getData
    }
  
    removeItem(key) {
      localStorage.removeItem(key)
    }
  
    clearStorage() {
      localStorage.clear()
    }
  }