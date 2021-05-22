// 常用縮寫
// => 不是語法糖，會影響運作
// fn: function(){
//   return this.myName
// }
// 改成
// fn: ()=>{
//   return this.myName
// }
// 會出問題

obj = {
  myName: '物件',
  fn() {
    return this.myName;
  }
};
console.log(obj.fn());

{
  let a = 0;
  var b = 0;
}
console.log(b);

const myName = '小明';
const person = {
  myName
};
console.log(person);

// 陣列合併
const groupA = ['test1', 'test2'];
const groupB = ['test3', 'test4'];
const groupAll1 = groupA.concat(groupB);
const groupAll2 = [...groupA, ...groupB];
console.log(groupAll1);
console.log(groupAll2);

const methods = {
  fn1() {
    console.log(1);
  },
  fn2() {
    console.log(2);
  }
};
// 合併物件內函數
const method2 = {
  ...methods,
  fn3() {
    console.log(3);
  }
};
console.log(method2);

// 解構
const people = {
  casper: {
    name: 'casper',
    like: '鍋燒',
    price: 95
  },
  vic: {
    name: 'vic',
    like: '鍋燒',
    price: 95
  },
};
const { vic } = people;
console.log(vic);
// 避免物件 joyce 不存在
const {
  casper,
  joyce = {
    name: '喬伊斯'
  }
} = people;
console.log(joyce);

// 正確縮寫 function 方法
const obj3 = {
  myName: '物件',
  // 錯誤寫法
  // fn: () => {
  //   return this.myName;
  // }
  fn() {
    return this.myName;
  }
};
console.log(obj3.fn());
const methods2 = {
  getName() {
    return this.name;
  },
  goWork() {
    return `${this.name} 去上班`;
  }
};
const person2 = {
  ...methods2,
  name: 'Vic'
};
console.log(person2.goWork());

const methods3 = {
  getName() {
    return this.name;
  },
  goWork() {
    return `${this.name} 去上班`;
  },
};

const { goWork } = methods3;
console.log(goWork());


const test = `${myName}去吃飯`;
console.log(test);

function sum(a, b) {
  return a + b;
}
// 樣板特殊用法，直接把表達式或函式寫在 `${裡}`
console.log(`3+4的總和為 ${sum(3, 4)}`);

console.log(`${sum(3, 2) > 7 ? '超過7' : '低於7'}`);

// forEach
const people4 = [
  {
    name: 'vic',
    like: '鍋燒',
    price: 80
  }, {
    name: 'qoo',
    like: '意麵',
    price: 95
  },
];

let sum2 = 0;
people4.forEach((item, index) => {
  sum2 += item.price;
});
console.log(sum2);

// 加入新的屬性
people4.forEach(item => {
  item.text = `${item.name} 喜歡${item.like}，單價為${item.price}`;
});
console.log(people4);

people5 = [];
people4.forEach(item => {
  if (item.price > 90) {
    people5.push(item);
  }
});
console.log(people5);

// map
const map = people4.map(item =>
  `${item.name} 喜歡${item.like}，單價為${item.price}`
);
console.log(map);

// ***** 箭頭函式自帶 return ，但要把 {} return 拿掉 *****

// map forEach 為 ES5 語法

// 使用縮寫時 => 後不會接 {} ， 若看到 ({})  {}是物件
// filter
const filter = people4.filter(item =>
  // return 判斷式
  item.price > 90
);
console.log(filter);

// 注意這裡是回傳物件
const map2 = people4.map(item => ({
  name: `${item.name} 喜歡${item.like}，單價為${item.price}`
}));

console.log(map2);

const array = [100, 200, 300, 400, 500];
// 產生新的陣列
const newArray = [];
array.forEach(item => newArray.push({ price: item }));
console.log(newArray);

const newArray2 = [...array];
console.log(newArray2);

let newArray3 = [];
array.forEach(item=> {
  if(item >= 400) newArray3.push(item)
})
console.log(newArray3)

// <script type="module">
// import {...} from './xxx.js';
// import { 具名 } from './xxx.js'
// import { createApp } from 'vue esm browser 網址'
// </script>

// export default {
// f1:function(){},
// f2:function(){}
// }

// export 變數 = 123

// export function (){
// }
