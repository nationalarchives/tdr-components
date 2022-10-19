import { NestedNavigation } from './nested-navigation/nested-navigation'
window.onload = () => {
  const tree: HTMLUListElement | null = document.querySelector('[role=tree]')
  if (tree != null) {
    const nestedNavigation = new NestedNavigation(tree)
    nestedNavigation.initialiseFormListeners()
  }
}
