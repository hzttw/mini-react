let currentlyRenderingFiber = null

let workInProgressHook = null
export function renderWithHooks(wip) {
	currentlyRenderingFiber = wip
	currentlyRenderingFiber.memorizedState = null
	workInProgressHook = null
}

function updateWorkInProgressHook() {
	let hook
	const current = currentlyRenderingFiber.alternnate
	if (current) {
		//组件更新
	} else {
		//组件初次渲染
		hook = {
			memorizedState: null,
			next: null
		}
		if (workInPorogressHook) {
			workInProgressHook = workInProgressHook.next = hook
		} else {
			// hook0
			workInProgressHook = currentlyRenderingFiber.memorizedState = hook
		}
	}
	return hook
}
export function useReducer(reducer, initalState) {
	const hook = updateWorkInProgressHook()
	if (!currentlyRenderingFiber.alternnate) {
		//初次渲染
		hook.memorizedState = initalState
	}
	const dispatch = () => {
		console.log('log');
	}
	return [hook, memorizedState, dispatch]
}