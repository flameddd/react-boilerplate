### this example is froked from [react-boilerplate/react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)

# 淺談 react 優化([Avoid Reconciliation](https://reactjs.org/docs/optimizing-performance.html#avoid-reconciliation)) 和 [reselect](https://github.com/reactjs/reselect)。

 - 攻略點　： 無效 render (wasted render)。
 - 發生原因： react (and react-redux) 運作原理 ＋ javascript 語言特性。
 - 解決方法： 變數 memorize 起來，使得 prevProps === this.props // true ，就不會 trigger render function 了。 
 - 適合對象： react 開發新手。  
 - 講者　　： Jacky。  


### 複習 react lifecycle ：
[react lifecycle](https://github.com/dbertella/react-lifecycle-svg)  
<a href="http://dbertella.github.io/react-lifecycle-svg/" target="_blank">react lifecycle</a>

### 定義 wasted render ： 
 - nextPorps 跟 this.props or nextStates 跟 this.state 明明是一樣的，執行 render function 。
 
### shouldComponentUpdate(nextProps, nextState) ： 
javascript 是 call by value 還是 call by ref ？
reac.Component 跟 react.PureComponent 有什麼差別？
在
