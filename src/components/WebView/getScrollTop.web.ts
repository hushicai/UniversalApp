/* global parent */
export default function getScrollTop() {
  // 部分浏览器表现比较正常，例如chrome，是iframe内部在滚动
  // 可以直接通过iframe中的window.scrollY拿到滚动距离
  if (window.scrollY) {
    return window.scrollY;
  }
  // 部分浏览器表现异常，例如ios safari，是iframe的父元素在滚动，window.scrollY拿不到滚动距离
  // 需要通过iframe的父元素拿到滚动距离
  // @ts-ignore
  const iframe = parent.document.getElementById(window.__iframe_id);
  const node = iframe && iframe.parentNode;
  // @ts-ignore
  return node && node.scrollTop;
}
