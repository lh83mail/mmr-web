export const TABLE_VIEW = {
  title: 'A Worker Page 777',
  children: [
  {
    type: 'card',
    title: '这里是Card主标题f',
    subTitle: '这里是card的副标题f',
    toolbars: [
      {
        position: 'bottom',
        children: [
          { type: 'button', text: 'LIKE' },
          { type: 'button', text: 'SHARE' },
        ]
      },
      {
        position: 'top',
        children: [
          { type: 'button', text: 'LIKE' },
          { type: 'button', text: 'SHARE' },
        ]
      }
    ],
    children: [
      {
        type: 'table',
        columns: [
          {name:"position", text: "序号"},
          {name:"name", text: "Name"},
          {name:"weight", text: "Weight"},
          {name:"symbol", text: "Symbol"},
        ]
      }
    ],
    footer: {}
  }
]};
