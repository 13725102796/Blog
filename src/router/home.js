const Home = () => import('@/page/home/home')
const Store = () => import('@/page/home/store/store')
const Classify = () => import('@/page/home/store/classify')
const Near = () => import('@/page/home/store/near')
const Sort = () => import('@/page/home/store/sort')
const Select = () => import('@/page/home/store/select')
export default [
  {
    path: '*',
    name: 'Home',
    component: Home
  },{
    path: '/Store',
    name: 'Store',
    component: Store,
    children: [
      {
        name: 'Classify',
        path: 'Classify',
        component: Classify
      },{
        name: 'Near',
        path: 'Near',
        component: Near
      },{
        name: 'Sort',
        path: 'Sort',
        component: Sort
      },{
        name: 'Select',
        path: 'Select',
        component: Select
      }
    ]
  }
]