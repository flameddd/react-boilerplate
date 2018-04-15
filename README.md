## this example is froked from [react-boilerplate/react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)

# 淺談 react 優化([Avoid Reconciliation](https://reactjs.org/docs/optimizing-performance.html#avoid-reconciliation)) 和 [reselect](https://github.com/reactjs/reselect)。

 - 攻略點　： wasted render、not recomputed unless changed。
 - 發生原因： react (and react-redux) 運作原理 ＋ javascript 語言特性。
 - 解決方法： 變數 memorize 起來。 
 - 適合對象： react 開發新手且正在實際開發。  
 - 講者　　： Jacky。  
 - 預計時間： 1 小時大概...  

## 執行教材範例
```
git clone https://github.com/flameddd/react-boilerplate.git
npm install // 不知道是這個 boilerplate 問題，還是我桌機 yarn 版本問題， yarn install 會失敗。
npm start
visit http://localhost:3000/
```
 - 範例的使用方式幾乎都是 1. focusOn ***input*** 2. onKey 'enter'。  
![img](app/images/ex.png)

## 複習 react lifecycle ：
 - <a href="http://dbertella.github.io/react-lifecycle-svg/" target="_blank">react lifecycle</a>
 - 參考：範例1  
 - 上圖這次只關注一個要點，就是只要被 setProps or setState ，就會觸發一連串的 life cycle method。
   1. componentWillReceiveProps(nextProps)
   2. shouldComponentUpdate(nextProps, nextState)
   3. componentWillUpdate(nextProps, nextState)
   4. render()
   5. componentDidUpdate(prevProps, prevState)

## 定義 wasted render ： 
 - 參考：範例1-1  
 - nextPorps 跟 this.props (or nextStates 跟 this.state) 是一樣的，還是執行 render function 得到上一次一樣的結果。
 
## shouldComponentUpdate(nextProps, nextState) ： 
  - 參考：範例2  
  - 參考：範例2-1  
  - life cycly method 中有個 function 為 ***shouldComponentUpdate*** ，是用來控制是否要執行 render function ，可利用此 method 避免 wasted render 。
```javascript
 shouldComponentUpdate(nextProps) {
   return this.props.username !== nextProps.username
 }
``` 

## JS call by value? call by reference (不深入討論 call by sharing)
 - 參考：範例2-1  
 - call by value 是呼叫變數時，得到的是 ***值*** 。
 - call by reference 是呼叫變數時，得到的是 ***記憶體位置***。
 - Javascript 有 call by value、也有 call by reference
  
| type | call by value | call by refs |
| :------:| :------: | :------: |
| Boolean | Ｏ |  |
| String | Ｏ |  |
| Number | Ｏ |  |
| null | Ｏ |  |
| undefined | Ｏ |  |
| Array |  | Ｏ |
| Object |  | Ｏ |
| Function |  | Ｏ |
  
  
 - ***重點在於，JS 的 「===」、「!==」 比較 values 跟 references 時的差異***
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

 - 上面的 table 忘了就算了！！ 需要的時候，用 browser console 自己測一下。
 ```javascript
 let str1 = 'a';
 let str2 = str1;
 str2 = 'b';
 console.log(str1, str2); // a b   <== str1 沒有被 update 、 call by val
 let obj1 = {};
 let obj2 = obj1;
 obj2.a = 'test';
 console.log(obj1); // {a: "test"} <== obj1 被 update 、 call by ref
 ```

## 使用 reselect
 - 使用 reselect 的 createselector 解決範例 2-1 的問題  
 - 參考：範例2-2、範例2-3  
 - 我直接講解 document 而這邊不多做任何文字說明，是希望未來大家直接去看 [reselect createselector document](https://github.com/reactjs/reselect#createselectorinputselectors--inputselectors-resultfunc) ，因為今天講完，你們忘掉的機率很高。
 - input selector 的 return 沒變(!== false)，就回傳上一次的結果，否則重算新的結果。
 - input selector 的 return 有變(!== true)，就回傳重新計算的結果(resultFuction return)。
 - syntex：最後一個參數是 resultFunc，其他前面的都是 inputSelectors

```javascript
const mySelector = createSelector(
  state => state.values.value1,
  state => state.values.value2,
  (value1, value2) => value1 + value2
)

// 上面的範例可以理解成下面的

const mySelector = createSelector(
  function(state) {
    return state.order1.total;
  },
  function(state) {
    return state.order2.total;
  },
  function(state) {
    return state.order3.total;
  },
  function(func1_returnVal, func2_returnVal, func3_returnVal) {
    // order1.total + order2.total + order3.total
    return func1_returnVal + func2_returnVal + func3_returnVal;
  }
)

// 用 ES6 語法，我們可以寫成簡化點

const mySelector = createSelector(
  state => state.order1.total,
  state => state.order2.total,
  state => state.order3.total,
  (func1_returnVal, func2_returnVal, func3_returnVal) => (func1_returnVal + func2_returnVal + func3_returnVal);
)
```

 1. 事先定義好 createselector。  
 2. 使用時呼叫它。  
 ```javascript
 const selector = createSelector(
  (state) => state.username, // "flameddd"
  (parameter1) => ({
      name: parameter1
  }));
  ...
  const ChildProps = selector(this.state);
 ```
 - [Airbnb 文章範例 review](https://medium.com/airbnb-engineering/recent-web-performance-fixes-on-airbnb-listing-pages-6cd8d93df6f4)
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

# 第１次 Q&A

## ~~redux~~ react-redux ***！！！***
 - ![redux](https://www.thitiblog.com/wp-content/uploads/2018/02/1_4Sq2I0T30xUmdywMzb60WQ-960x599.png)
 - 其實最關鍵的是 [react-redux](https://github.com/reactjs/react-redux) 的 [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)的運作方式。
 - redux-react subscription 的對象是 store (redux 就那唯一一顆 store 而已)
 ![img](app/images/slackReduxStates.png)
 - 參考：範例3(addPrefix)  
 - react-redux 執行流程
   1. 只要 store 被改變。
   2. 全部有 connect 的 containers 執行 connect function
      (假如 redux store 裡面有 變數1、變數2、變數3 ... 變數10、共10個變數。  
      有 3 個 (已mount的)containers 分別 connect ({1,2,3}) ({4,5,6}) 跟 ({7,8,9})，當
      變數10 被 update  
      3 個 containers 的各自 connect 都會執行。)  
   3. (全部的) connect 裡面會去重新產生 mapStateToProps
   ```javascript
    const mapStateToProps = state => ({
      visibleToDos1: getVisibleTodos(state.get('todos1')),
      visibleToDos2: getVisibleTodos(state.get('todos2')),
      visibleToDos3: getVisibleTodos(state.get('todos3')),
    })
    export default connect(mapStateToProps, null)(Conatiner1)

    const mapStateToProps = state => ({
      visibleToDos4: getVisibleTodos(state.get('todos4')),
      visibleToDos5: getVisibleTodos(state.get('todos5')),
      visibleToDos6: getVisibleTodos(state.get('todos6')),
    })
    export default connect(mapStateToProps, null)(Conatiner2)

    const mapStateToProps = state => ({
      visibleToDos7: getVisibleTodos(state.get('todos7')),
      visibleToDos8: getVisibleTodos(state.get('todos8')),
      visibleToDos9: getVisibleTodos(state.get('todos9')),
    })
    export default connect(mapStateToProps, null)(Conatiner3)
   ```
   4. 得到新的 mapStateToProps 後，再來去做 ***淺比較(shallow equality comparisons)*** 來判斷(connectAdvanced)要不要(shouldComponentUpdate)執行render function (render children) 

## redux 架構下 reselect 有優化什麼？
  1. stste.get('xxx') 的執行。
  2. addPrefix 的計算。
  3. wasted render

## reselect and mapStateToProps
 - 只是熟悉語法的問題，以下供參考
 - 兩種寫法都可以
```javascript
// 1.某些 props 沒用 reslect 就這樣寫
  const mapStateToProps = state => ({
    repos: selectRepos(state),
    username: state.getIn(['home', 'username']),
  });

// 2.全部用 reselect、mapStateToProps 的 state, ownProps 會被傳進去
  const mapStateToProps = createStructuredSelector({
    repos: selectRepos,
    username: selectUsername,
  })
```

### 檔案結構參考
 - 參考 [react-boilerplate/react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)
 - 拆一隻 selectors.js 獨立檔案。
![img](app/images/filesStructure.png)


 ### reselect 優點
 - Selectors can compute derived data, allowing Redux to store the minimal possible state.
 - Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
 - Selectors are composable. They can be used as input to other selectors.
 - tl;tr ： 避免 wasted render、減少計算、提供組合性、可減少 state(redux) 使用。

# 第２次 Q&A

## 實戰思維：如果明天我就要玩 reselect ，那該怎麼下手？：
 1. 安裝任一個 react 監控套件。
 ```javascript
 // 找你自己常用 or 順眼的套件就好，這套只是參考
npm install --save-dev react-global-render-visualizer
 ```
 2. 找個目標來監控。
  - 有 props + state 數量 > 10 左右 (10這數字也是我亂抓的，你覺得大就好)
  - render function 有大量運算 (for loop 去產生 component 之類的)
  - 你覺得慢的 component (肉眼觀察UI行為會卡的)  
  - container 在很上層的位置  
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
 - 千萬千萬千萬先別急著想 reselect 。
 - 先去理解 ***此 component*** 的行為是什麼？拿這些 props, state 用來做什麼？
 - 跟 ***該 props or state*** 存的資料格式是？用來做什麼的？
 - 有沒有機會調整 component (自己、上層)結構 or props, state 的取值？(props, state 的資料結構比較難下手，要改資料結構幾乎等於是重構了。)
 - 好好了解trigger ***此 component*** render function 的是什麼變數  

 5. 可以抽出來的計算
 - ***此 component*** 的 render function 有沒有運算可以抽出來在 reselect 做掉？
 - mapStateToProps 裡的計算。
 - render function 裡的計算。
  
 6. 別忘了可組合的特性，活用的話可以很強大。
 - state(redux) 的規劃一定不可能完美 fit 每個 container、components 使用情境，隨著新需求的加入，一定有不同的 state 加入。最後會變成 mapStateToProps 傳入好幾個 state ，然後才在 render function 做判斷。
 ```javascript
const mapStateToProps = (state, ownProps) => ({
  lineChart: state.get('line'),
  barChart: state.get('bar'),
  pieChart: state.get('pie'),
});

...
render () {
  const { lineChart, barChart, pieChart } = this.props;
  if (lineChart.loading || barChart.loading || pieChart.loading) {
    return <div>loading</div>
  }
  return <div>Charts</div>
}

const selectLineChart = state => state.get('line');
const selectBarChart = state => state.get('bar');
const selectPieChart = state => state.get('pie');

// ====================================

const loadingSelector = createSelector(
  selectLineChart,
  selectBarChart,
  selectPieChart,
  (line, bar, pie) => line.loading || bar.loading || pie.loading
);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state)
});

...
render () {
  const { loading } = this.props;
  if (loading) {
    return <div>loading</div>
  }
  return <div>Charts</div>
}

 ```


# final Q&A, 祝週末愉快～

# 推薦閱讀
  就算「你」沒法真的實踐這些優化（時間、實務等考量)，但也能學到很多 react 的優化思維。
 - [React Performance Fixes on Airbnb Listing Pages](https://medium.com/airbnb-engineering/recent-web-performance-fixes-on-airbnb-listing-pages-6cd8d93df6f4)
 - [Performance optimisations for React applications](https://medium.com/@alexandereardon/performance-optimisations-for-react-applications-b453c597b191)
 - [Performance optimisations for React applications: Round 2](https://medium.com/@alexandereardon/performance-optimisations-for-react-applications-round-2-2042e5c9af97)
 - [Dragging React performance forward](https://medium.com/@alexandereardon/dragging-react-performance-forward-688b30d40a33)

  

