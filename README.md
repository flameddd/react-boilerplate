### this example is froked from [react-boilerplate/react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)

# 淺談 react 優化([Avoid Reconciliation](https://reactjs.org/docs/optimizing-performance.html#avoid-reconciliation)) 和 [reselect](https://github.com/reactjs/reselect)。

 - 攻略點　： 無效 render (wasted render)。
 - 發生原因： react 運作原理 ＋ javascript 語言特性。
 - 解決方法： 變數 memorize 起來，使得 prevProps === this.props // true ，就不會 trigger render function 了。 
 - 適合對象： react 開發新手．  

### 定義 wasted render ： 
 - nextPorps 跟 this.props or nextStates 跟 this.state 明明是一樣的，卻還是執行了 render function ．
javascript 是 call by value 還是 call by ref ？
reac.Component 跟 react.PureComponent 有什麼差別？
在
