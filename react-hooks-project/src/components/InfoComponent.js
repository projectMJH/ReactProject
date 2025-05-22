import {Component,Fragment} from "react";
/*
    데이터를 관리 => 데이터 유지 => useState
 */
class InfoComponent extends Component {
  constructor(props) {
    super(props);
    // data(){}
    this.state:{
      vo:{},
      data:[]
    }
  }
  componentDidMount() {
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
  }
  componentWillUnmount() {
  }
}

export default InfoComponent;
