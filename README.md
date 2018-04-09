### this example is froked from [react-boilerplate/react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)

# 淺談 react 優化([Avoid Reconciliation](https://reactjs.org/docs/optimizing-performance.html#avoid-reconciliation)) 和 [reselect](https://github.com/reactjs/reselect)。

 - 攻略點　： wasted render。
 - 發生原因： react (and react-redux) 運作原理 ＋ javascript 語言特性。
 - 解決方法： 變數 memorize 起來，使得 prevProps === this.props // true ，就不會 trigger render function 了。 
 - 適合對象： react 開發新手。  
 - 講者　　： Jacky。  
 - 預計時間： 希望 1 小時幹掉。

### 執行教材範例
```
git clone https://github.com/flameddd/react-boilerplate.git
npm install
npm start
visit http://localhost:3000/
```
 - 範例的測試方式幾乎都是 1. focusOn ***input*** 2. onKey 'enter'。  
![img](app/images/ex.png)

### 複習 react lifecycle ：
 - <a href="http://dbertella.github.io/react-lifecycle-svg/" target="_blank">react lifecycle</a>
 - 上圖這次只關注一個要點，就是只要被 setProps or setState ，就會觸發一連串的 life cycle method。
   1. componentWillReceiveProps(nextProps)
   2. shouldComponentUpdate(nextProps, nextState)
   3. componentWillUpdate(nextProps, nextState)
   4. render()
   5. componentDidUpdate(prevProps, prevState)

### 定義 wasted render ： 
 - nextPorps 跟 this.props or nextStates 跟 this.state 是一樣的，還是執行 render function 得到上一次一樣的結果。
 
### shouldComponentUpdate(nextProps, nextState) ： 
 - life cycly method 中有個 function 為 ***shouldComponentUpdate*** ，是用來控制是否要執行 render function ，可利用此 method 避免 wasted render 。
```javascript
 shouldComponentUpdate(nextProps) {
   return this.props.username !== nextProps.username
 }
``` 

### JS call by value? call by reference (不深入討論 call by sharing)
 - call by value 是呼叫變數時，得到的是***值***。
 - call by reference 是呼叫變數時，得到的是***記憶體位置***。
 - Javascript 有 call by value、也有 call by reference
  
| type | call by value | call by refs |
| :------:| :------: | :------: |
| Boolean | Ｏ |  |
| null | Ｏ |  |
| undefined | Ｏ |  |
| String | Ｏ |  |
| Number | Ｏ |  |
| Array |  | Ｏ |
| Object |  | Ｏ |
| Function |  | Ｏ |
  
  
 - ***重點在於，JS 的 「===」 比較 values 跟 references 時的差異***
 - 上面的 table 忘了就算了！！ 需要的時候，用 browser console 自己測一下。
 ```javascript
 const testStr1 = '';
 const testStr2 = '';
 console.log(testStr1 === testStr2) // true 比較 val 是否相同
 const testObj1 = {};
 const testObj2 = {};
 const testObj3 = testObj1;
 console.log(testObj1 === testObj2) // false 比較 ref 是否相同
 console.log(testObj1 === testObj3) // true
 const testArr1 = [];
 const testArr2 = [];
 const testArr3 = testArr1;
 console.log(testArr1 === testArr2) // false 比較 ref 是否相同
 console.log(testArr1 === testArr3) // true
 ```

### reselect 
 1. 建立 [createselector](https://github.com/reactjs/reselect#createselectorinputselectors--inputselectors-resultfunc)
 2. 串接 reselect 有多種方法，但都只是***語法熟悉***的問題，以下列出幾種方法供參考
 ```javascript
 // 直接使用
 const getExperiments = createSelector(
  ({ experimentsFromProps }) => experimentsFromProps,
  ({ experimentsFromState }) => experimentsFromState,
  (experimentsFromProps, experimentsFromState) => ({
    ...experimentsFromProps,
    ...experimentsFromState,
  }),
);
...
render() {
  ...
  const finalExperiments = getExperiments({
    experimentsFromProps: experiments,
    experimentsFromState: this.state.experiments,
  });
  return (
    <WrappedComponent
      {...otherProps}
      experiments={finalExperiments}
    />
  );
}

 ```



### 實戰、如果明天我就要玩 reselect ，那該怎麼下手？：
 1. 安裝任一個 react 監控套件。
 ```javascript
 // 找你自己常用 or 順眼的套件就好，這套只是參考
npm install --save-dev react-global-render-visualizer
 ```
 2. 找個目標來監控。
  - 有 props + state 數量 > 10 左右
  - render function 有大量運算 (for loop 去產生 component 之類的)
  ```javascript
  // 1. import visualizeRender 進來
  import { visualizeRender } from 'react-global-render-visualizer';

  // 2-1. 可以 @decorator 的方式放在 class 宣告的上一行
  @visualizeRender() 
  class Container extends Component {
    componentDidMount() {
    ...

  // 2-2. 或者在 compose 加入
  const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
  　...,
    visualizeRender(),
  );

  export default enhance(Container);

  // 2-3. 直接包
  export default connect(mapStateToProps, mapDispatchProps)(visualizeRender()(Container))
  ```

 3. update 符合預期嗎？
  - 操作看看該 components ， render function 執行的時機符合預期嗎？（這邊用了 預期 這個字眼，代表你應該對該 component 的行為有基本的了解）。  

 4. 沒事最好，但如果有某幾個 props or state 一直重複 trigger render function ：
  - 千萬先別急著想 reselect 。
  - 先去理解 ***此 component*** 的行為是什麼？拿這些 props, state 用來做什麼？
  - 跟 ***該 props or state*** 存的資料格式是？用來做什麼的
  

