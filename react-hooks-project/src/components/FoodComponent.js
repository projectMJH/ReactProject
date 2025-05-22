/*
    Hooks
    
    1. 변수
       지역변수 : let, const
       props : 속성값으로 전송받는 값 => 불변 (정적 상태값)
       state : 컴포넌트가 가질 수 있는 동적 상태값 (이벤트 마다 값 변경)
       -----> HTML의 데이터값을 변경
       => useState(10) => HTML에 적용
       const a=useState(10);
       s=100
       => data() {
          return {
            a:10,
            b:{},
            c:[]
          }
       },
       method: {
          aaa(){
          }
       }
     2. 16이전 => 클래스형 컴포넌트 => 변수값 관리가 어렵다
        16이후 => 함수형 컴포넌트 => 변수값 쉽게 관리 => Hooks
                 Hooks => useXxx
                 = useState
     3. useState 형식
        const [a, setA]=useState(10)
        [] useState([1,2,3,4,5,6...])
                    ---------------- 초기값
        {} useState({})
        논리형 useState(true)
        문자형 useState('값')
        -------------------------------
            
        a=100 (X) => setA(100) => 리로딩 => 함수를 다시 호출

        => 데이터 관리 (변수)
           ---------------- 상태 관리 프로그램
           
        => 변수 / 데이터형
           -------------
              |
             연산자 => 프로그램 제어(제어문) => 모아서 관리
                                            배열 / 클래스 / 함수
                                            -----------------
                                            | 순차적으로 호출
                                              ----------- 알고리즘
                                              | 로직

        => C/C++ => C# => Java => Python

 */
function FoodComponent() {

}

export default FoodComponent;