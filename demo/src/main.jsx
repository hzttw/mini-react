import { ReactDOM ,Component} from './which-react';
import './index.css';

function FunctionComponent(props) {
  return (
    <div className="border">
      <p>{props.name}</p>
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}

const jsx = (
  <div className="border">
    <h1>react</h1>
    <a href="https://github.com/bubucuo/mini-react">mini react</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" />
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(jsx);
