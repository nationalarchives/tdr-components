import { NestedNavigation } from './nested-navigation/nested-navigation'
window.onload = () => {
  const treeItems: NodeListOf<HTMLUListElement> = document.querySelectorAll('[role=tree]')
  const tree: HTMLUListElement | null = document.querySelector("[role=tree]");
  const treeItemList: HTMLUListElement[] = []
  if (tree != null) {
    treeItems.forEach(item => treeItemList.push(item))
    const nestedNavigation = new NestedNavigation(tree, treeItemList)
    nestedNavigation.initialiseFormListeners()
  }
}
