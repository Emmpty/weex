export function getEntryUrl (name) {
  // 判断当前的环境，适配web端
  if (weex.config.env.platform === 'Web') {
    console.log('111111111', './' + name + '.html')
    return './' + name + '.html'
  } else {
    let arr = weex.config.bundleUrl.split('/')
    arr.pop()
    arr.push(name + '.js')
    console.log('2222222222220', arr.join('/'))
    return arr.join('/')
  }
}
