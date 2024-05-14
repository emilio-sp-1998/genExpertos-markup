let GLOBAL
if (process.env.NODE_ENV === 'production') {
  GLOBAL = {
    server : 'https://cerebro.markup.ec/genExpertosMarkup',
    api : ''
  }
}else{
  GLOBAL = {
    api:'',
    server: 'http://localhost:10000/genExpertosMarkup'
  }
}

export default GLOBAL