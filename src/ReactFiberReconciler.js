import { createFiber } from './ReactFiber';
import { isArray, isStringOrNumber, updateNode } from './utils';

//处理原生标签
export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type);
    updateNode(wip.stateNode,wip.props)
  }
  reconcileChildren(wip, wip.props.children);
}



export function updateFunctionComponent(wip) {
  const {type ,props} = wip

  const children = type(props)
  reconcileChildren(wip,children)
}


export function updateClassComponent(wip) {
  const {type ,props} = wip
  const instance = new type(props)
  const children = instance.render()
  reconcileChildren(wip,children)
}


export function updateFragmentComponent() {}
export function updateHostTextComponent() {}

//协调（核心是diff）
function reconcileChildren(wip, children) {
  if (isStringOrNumber(children)) {
    return;
  }
  const newChildren = isArray(children) ? children : [children];
  let perviousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    if (newChild == null) {
      continue;
    }
    const newFiber = createFiber(newChild, wip);

    //判断头节点，如何判断头节点
    if (perviousNewFiber === null) {
      wip.child = newFiber;
    }else{
      perviousNewFiber.sibling = newFiber
    }

    perviousNewFiber = newFiber;
  }
}
