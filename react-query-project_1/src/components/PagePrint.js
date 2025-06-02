
function PagePrint({data,setCurpage}) {
  let totalpage=data.totalpage;
  let startPage=data.startPage;
  let endPage=data.endPage;

  // refectch
  const prev=()=>{
    setCurpage(startPage-1);
  }
  const next=()=>{
    setCurpage(endPage+1);
  }
  const pageChange=(page)=>{
    setCurpage(page);
  }

  let pageArr=[];
  if(startPage>1)
  {
    pageArr.push(<li><a className={"nav-link"} onClick={prev}>&lt;</a></li>)
  }
  for(let i=startPage;i<=endPage;i++){
    if(i===data.curpage)
    {
      pageArr.push(<li className={"active"} key={i} ><a href={"#"} className={"nav-link"} onClick={()=>pageChange(i)}>{i}</a></li>)
    }
    else
    {
      pageArr.push(<li key={i} ><a href={"#"} className={"nav-link"} onClick={()=>pageChange(i)}>{i}</a></li>)
    }
  }
  if(endPage<totalpage)
  {
    pageArr.push(<li><a className={"nav-link"} onClick={next}>&gt;</a></li>)
  }

  return (
    <ul className={"pagination"}>
      {pageArr}
    </ul>
  )
}
export default PagePrint;