export default function wrapIntoHtml(content: string) {
  return `<html><head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
  <style>
   html,body{height: 100%;width:100%;}
   body{font-size: 14px; color: #444;}
  </style></head><body>${content}
  </body></html>`;
}
