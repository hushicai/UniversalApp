/* global parent */
export default function getClientHeight() {
  // @ts-ignore
  const iframe = parent.document.getElementById(window.__iframe_id);
  const node = iframe && iframe.parentNode;
  // @ts-ignore
  return node && node.clientHeight;
}
