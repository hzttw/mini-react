import { ClassComponent, Fragment, FunctionComponent, HostComponent, HostText } from './ReactWorkTags';
import { isFn, isStr, isUndefined, Placement } from './utils';

export function createFiber(vnode, returnFiber) {
  const fiber = {
    type: vnode.type,
    key: vnode.key,
    //属性
    props: vnode.props,
    //不同类型的组件stateNode也不同
    //原生标签 dom节点
    //class 实例
    //function null
    stateNode: null,
    //第一个子fiber
    chlid: null,
    //下一个兄弟节点
    sibling: null,
    //父节点
    return: returnFiber,
    //标记当前组建是做什么事的
    flags: Placement,
    //节点在当前层级下的位置
    index: null,
    //old fiber 
    alternate: null,
    //存的是头hook hook0 针对的是函数组件
    memorizedState: null
  };
  const { type } = vnode;
  if (isStr(type)) {
    fiber.tag = HostComponent;
  } else if (isFn(type)) {
    //type 是function时有两种情况
    //函数组件及类组件
    // fiber.tag = FunctionComponent;
    fiber.tag = type.prototype.isReactComponent ? ClassComponent : FunctionComponent;
  } else if (isUndefined(type)) {
    fiber.tag = HostText;
    fiber.props = { children: vnode };
  } else {
    fiber.tag = Fragment
  }

  return fiber;
}
