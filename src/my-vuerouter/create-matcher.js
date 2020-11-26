import createRouteMap from './create-route-map'
import createRoute from './utils/route'

export default function createMatcher (routes) {
  // createRouteMap 解析路由表
  // pathMap -->   { 路由地址：record对象(path, component, parent) }
  const { pathList, pathMap } = createRouteMap(routes)
  // console.log(pathList)
  // console.log(pathMap)
  function match (path) {
    const record = pathMap[path]
    // if (record) {
    return createRoute(record, path)
    // }
    // return createRoute(null, path)
  }

  // console.log(match('/abcs'))

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap)
  }

  return {
    match,
    addRoutes
  }
}
