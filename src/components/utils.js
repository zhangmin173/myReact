const utils = {
  isLogin() {
    console.log('isLogin')
  },
  isAuth() {
    console.log('isAuth')
  },
  getUrlParameter(name,path = window.location.href) {
    const result = decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(path) || [undefined, ''])[1].replace(/\+/g, '%20')) || null;
    return result ? result.split('/')[0] : '';
  }
}
export default utils