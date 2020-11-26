import Link from './components/link'
import View from './components/view'

export let _Vue = null

export default Vue => {
  _Vue = Vue
  _Vue.mixin({
    beforeCreate () {
      // 判断当前的 this 是否是根Vue实例，只有根vue实例才会有router这个属性，因为new Vue的时候有传入
      if (this.$options.router) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        // 给vue实例增加一个响应式的属性 _route
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else { 
        // 是让每个组件可以拿到router那个对象
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
    }
  })

  // 注册全局组件
  _Vue.component(Link.name, Link)
  _Vue.component(View.name, View)

  //拓展一个get方法，方便子组件拿到
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
}
