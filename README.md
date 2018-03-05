### this example is froked from [react-boilerplate/react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)

# 淺談 react 優化(waste render) 和 [reselect](https://github.com/reactjs/reselect)。

 - 攻略點　： 無效 render(waste render)。
 - 發生原因： react 運作原理 ＋ javascript 語言特性 引發此問題。
 - 解決方法： 變數 memorize 起來，使得 prevProps === this.props // true ，就不會 trigger render function 了。 
 - 適合對象： react 開發新手．  
