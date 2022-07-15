export const phone = [
  {
    required: true,
    message: '请填写手机号'
    // trigger: 'blur'
  },
  {
    pattern: /^1[3|5|7|8]\d{9}$/,
    message: '请填写正确的手机号'
    // trigger: 'onblur'
  }
]
export const code = [
  {
    required: true,
    message: '请填写验证码'
    // trigger: 'onblur'
  },
  {
    pattern: /^\d{6}$/,
    message: '请填写正确的验证码'
    // trigger: 'blur'
  }
]
