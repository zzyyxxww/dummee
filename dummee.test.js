const test = require('ava')
const dummee = require('.')

test('dummee should work normally', (t) => {
  let n = 0
  const fn = () => {
    n = 1
    return 5
  }
  const stub = dummee(fn)
  t.deepEqual(stub.calls, [])
  t.is(stub(1, null, 3), 5)
  t.deepEqual(stub.calls, [{ args: [1, null, 3] }])
  t.is(n, 1)
  t.deepEqual(stub.calls, [{ args: [1, null, 3] }])
})

test('dummee should be able to change the cb of the stub', (t) => {
  const stub = dummee(() => 3)
  t.is(stub(), 3)
  stub.cb = dummee(() => 'yo my man')
  t.is(stub(), 'yo my man')
})

test('stubIfTest should work correctly', (t) => {
  const cb = () => 'doggie'
  const stub = dummee.stubIfTest(cb)
  t.deepEqual(stub.cb, cb)
  process.env.NODE_ENV = 'hell'
  t.deepEqual(dummee.stubIfTest(cb).cb, undefined)
})
