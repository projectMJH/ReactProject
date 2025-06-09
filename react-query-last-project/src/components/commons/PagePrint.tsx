import {FC, JSX} from 'react';
import {PagePrintProps} from "../../types";

const PagePrint:FC<PagePrintProps> = ({data,setCurpage}) => {

  const {curpage,totalpage,startPage,endPage}=data;

  // 페이지 작업
  let pageArr: JSX.Element[]=[]
  // 이벤트 함수 => 익명의 함수
  // setXxx() => retry (재호출)

  const prev=()=> setCurpage(startPage-1)
  const next=()=> setCurpage(endPage+1)
  const pageChange=(page:number)=>setCurpage(page)

  if(startPage>1)
  {
    pageArr.push(
      <li className={"page-item"}>
        <a className={"page-link nav-link"} onClick={prev}>&lt;</a>
      </li>
    )
  }
  for(let i:number=startPage; i<=endPage;i++){
    pageArr.push(
      <li className={i===curpage?"active page-item":"page-item"} >
        <a className={"page-link nav-link"} onClick={()=>pageChange(i)}>{i}</a>
      </li>
    )
  }
  if(endPage<totalpage)
  {
    pageArr.push(
      <li className={"page-item"}>
        <a className={"page-link nav-link"} onClick={next}>&gt;</a>
      </li>
    )
  }

  return (
    <ul className={"pagination"}>
      {pageArr}
    </ul>
  )
}
export default PagePrint;