import sinon from 'sinon'
import * as nextRouter from 'next/router'

export const mockUseRouter = (path) => (t) => {
  t.context.router = {
    pathname: path,
    route: path,
    asPath: path,
    initialProps: {},
    pageLoader: sinon.fake(),
    App: sinon.fake(),
    Component: sinon.fake(),
    replace: sinon.fake(),
    push: sinon.fake(),
    back: sinon.fake()
  }
  sinon.replace(nextRouter, 'useRouter', () => t.context.router)
}

// test.afterEach.always(t => t.context.mockServer.reset())
export default mockUseRouter
